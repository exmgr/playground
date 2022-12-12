.DEFAULT_GOAL := help
DOCKER_COMPOSE_YAML := deploy/docker-compose.yml

# `make help` generates a help message for each target that
# has a comment starting with ##
help:
	@echo "Please use 'make <target>' where <target> is one of the following:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

serve: ## Serve the app with Docker Compose
	docker-compose -f $(DOCKER_COMPOSE_YAML) down
	docker-compose -f $(DOCKER_COMPOSE_YAML) up -d --build --force-recreate  iot_backend
	@echo Backend is ready, serving on: http://localhost:8000/

serve-client: ## Serve the client app with Docker Compose
	docker-compose -f $(DOCKER_COMPOSE_YAML) rm -sv iot_client
	docker-compose -f $(DOCKER_COMPOSE_YAML) up -d --build --force-recreate  iot_client
	@echo client app is ready.

stop: ## Stop the Docker Compose app
	docker-compose -f $(DOCKER_COMPOSE_YAML) down
