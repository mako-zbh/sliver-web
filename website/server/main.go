package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
)

var (
	lhost      = flag.String("lhost", "", "interface to listen on")
	lport      = flag.Int("lport", 443, "port to listen on")
	websiteDir = flag.String("website", "./static", "static website directory")
)

func main() {
	flag.Parse()

	go func() {
		sigCh := make(chan os.Signal, 1)
		signal.Notify(sigCh, syscall.SIGINT, syscall.SIGTERM)
		<-sigCh
		log.Println("shutting down...")
		os.Exit(0)
	}()

	router := http.NewServeMux()
	router.HandleFunc("/api/health", healthHandler)
	router.HandleFunc("/api/sessions", sessionsHandler)
	router.Handle("/", http.FileServer(http.Dir(*websiteDir)))

	if *lhost != "" {
		addr := fmt.Sprintf("%s:%d", *lhost, *lport)
		log.Printf("Starting web server on %s", addr)
		if err := http.ListenAndServe(addr, router); err != nil {
			log.Fatalf("Web server failed: %v", err)
		}
	}
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"status":"ok"}`))
}

func sessionsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`[]`))
}
