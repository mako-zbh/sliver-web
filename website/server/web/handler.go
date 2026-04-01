package web

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	"github.com/Binject/sliver/server/rpc"
)

type Server struct {
	httpServer *http.Server
	rpcServer  *rpc.Server
}

func NewServer(rpcServer *rpc.Server) *Server {
	return &Server{
		rpcServer: rpcServer,
	}
}

func (s *Server) Start(addr string) error {
	router := mux.NewRouter()

	rpcGateway := runtime.NewGatewayServer(
		runtime.WithForwardResponseOption(),
		runtime.WithIncomingHeaderMatcher(func(key string) (string, bool) {
			return key, true
		}),
	)

	conn, err := grpc.NewClient(
		"dns:///"+addr,
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	)
	if err != nil {
		return err
	}

	err = rpcGateway.RegisterServices(conn)
	if err != nil {
		return err
	}

	router.HandleFunc("/api/health", s.healthHandler)
	router.PathPrefix("/api/").Handler(rpcGateway)
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./static")))

	s.httpServer = &http.Server{
		Addr:    addr,
		Handler: router,
	}

	return s.httpServer.ListenAndServe()
}

func (s *Server) healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte(`{"status":"ok"}`))
}

func (s *Server) Stop() error {
	if s.httpServer != nil {
		return s.httpServer.Close()
	}
	return nil
}
