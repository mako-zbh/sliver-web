package grpcweb

import (
	"bytes"
	"encoding/binary"
	"fmt"
	"io"
	"net/http"

	"github.com/golang/protobuf/proto"
	"google.golang.org/grpc"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

type GrpcWebProxy struct {
	backend *grpc.ClientConn
}

func NewGrpcWebProxy(backend *grpc.ClientConn) *GrpcWebProxy {
	return &GrpcWebProxy{
		backend: backend,
	}
}

func (p *GrpcWebProxy) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodOptions {
		p.handleCors(w)
		return
	}

	if !isGrpcWebRequest(r) {
		http.Error(w, "not a gRPC-Web request", http.StatusBadRequest)
		return
	}

	p.handleGrpcWeb(w, r)
}

func (p *GrpcWebProxy) handleCors(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Grpc-Web, X-Grpc-Web")
	w.Header().Set("Access-Control-Max-Age", "86400")
}

func isGrpcWebRequest(r *http.Request) bool {
	return r.Header.Get("Content-Type") == "application/grpc-web" ||
		r.Header.Get("X-Grpc-Web") != ""
}

func (p *GrpcWebProxy) handleGrpcWeb(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "failed to read body", http.StatusBadRequest)
		return
	}

	grpcReq, err := decodeGrpcFrame(body)
	if err != nil {
		http.Error(w, "failed to decode grpc frame", http.StatusBadRequest)
		return
	}

	md := metadataFromHeaders(r.Header)
	ctx := metadata.NewIncomingContext(r.Context(), md)

	var buf bytes.Buffer
	err = p.backend.Invoke(ctx, grpcReq.Method, bytes.NewReader(grpcReq.Data), &buf, grpc.EmptyCallOption{})
	if err != nil {
		st, _ := status.FromError(err)
		resp := &status.Status{}
		proto.Marshaled
		w.WriteHeader(http.StatusOK)
		return
	}

	w.Header().Set("Content-Type", "application/grpc-web+proto")
	w.Header().Set("Grpc-Status", "0")

	encodeGrpcFrame(w, buf.Bytes())
}

type grpcRequest struct {
	Method string
	Data   []byte
}

func decodeGrpcFrame(data []byte) (*grpcRequest, error) {
	if len(data) < 5 {
		return nil, fmt.Errorf("frame too small")
	}

	compressed := data[0] == 1
	length := binary.BigEndian.Uint32(data[1:5])

	if len(data) < 5+int(length) {
		return nil, fmt.Errorf("incomplete frame")
	}

	return &grpcRequest{
		Method: "/",
		Data:   data[5 : 5+length],
	}, nil
}

func encodeGrpcFrame(w http.ResponseWriter, data []byte) error {
	header := make([]byte, 5)
	header[0] = 0
	binary.BigEndian.PutUint32(header[1:5], uint32(len(data)))

	_, err := w.Write(header)
	if err != nil {
		return err
	}
	_, err = w.Write(data)
	return err
}

func metadataFromHeaders(h http.Header) metadata.MD {
	md := metadata.New(nil)
	for key, values := range h {
		for _, v := range values {
			md.Append(key, v)
		}
	}
	return md
}
