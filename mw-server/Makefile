build: ## Build the project
	@echo "Building the project..."
	go build -o main main.go

start: ## Run the project
	go run main.go

test: ## Run all tests
	go test ./...

db-run: ## Start the database using Docker
	docker-compose -f postgres.docker-compose.yaml up

install: ## Install dependencies
	go mod tidy

swag: ##  Generate swagger specification
	swag init

db-schema: ## Generate db schema
	sqlc generate

help: ## Display help message
	@echo "Available targets:"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' Makefile 
