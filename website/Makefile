.PHONY: all frontend frontend-install frontend-dev frontend-build server website help

all: website

website:
	@echo "Sliver WebUI - Use 'make frontend' to build frontend"
	@echo "Server will be integrated with main Sliver server"

frontend:
	cd frontend && npm install && npm run build

frontend-install:
	cd frontend && npm install

frontend-dev:
	cd frontend && npm run dev

frontend-build:
	cd frontend && npm run build

server:
	@echo "Server code ready for integration with Sliver"
	@echo "See website/server/ directory"

help:
	@echo "Sliver WebUI Makefile"
	@echo ""
	@echo "Targets:"
	@echo "  frontend         - Install deps and build frontend"
	@echo "  frontend-install - Install frontend dependencies only"
	@echo "  frontend-dev     - Run frontend development server"
	@echo "  frontend-build   - Build frontend for production"
	@echo "  server           - Show server integration info"
