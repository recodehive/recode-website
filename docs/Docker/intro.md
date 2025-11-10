<div align="center">

# Introduction to Docker
</div>

Docker is a platform for building, shipping, and running applications in lightweight, portable containers. Containers package an application and its dependencies together, ensuring consistent behavior across development, CI, and production environments.

## Why use Docker
- Reproducible runtime environments across machines and teams.
- Faster developer workflows (build once, run anywhere).
- Resource-efficient compared to full virtual machines.
- Simplifies dependency management and deployment pipelines.

## Core concepts
- Image: Immutable, read-only snapshot that contains application code, runtime, libraries, and metadata. Built from a Dockerfile.
- Container: A running instance of an image; isolated filesystem, network namespace, and process tree.
- Dockerfile: Declarative text file that defines how to build an image.
- Registry: A service to store and distribute images (Docker Hub, private registries).
- Volume: Persistent storage that lives outside container lifecycle.
- Network: Isolation and connectivity between containers (bridge, host, overlay).
- Tag: Named pointer to an image version (e.g., myapp:1.0, nginx:latest).

## Key components
- Docker Engine: The runtime that builds and runs containers.
- Docker CLI: Command-line interface (docker) to interact with the Engine.
- Docker Compose: Tool to define and run multi-container applications via YAML.
- Docker Desktop: Desktop application for macOS/Windows that bundles Engine, CLI, and tools.
- Registry/Hub: Public or private storage for images.

## Typical workflow
1. Write a Dockerfile that describes the application image.
2. Build the image: `docker build -t myapp:latest .`
3. Run a container: `docker run -d --name myapp -p 8080:80 myapp:latest`
4. Test and iterate locally.
5. Push image to a registry: `docker push myregistry/myapp:latest`
6. Deploy by pulling the image to target hosts or orchestrator.

## Minimal examples

Dockerfile (simple Node.js app):
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
CMD ["node", "server.js"]
```

Run an nginx container:
```bash
docker run -d --name web -p 80:80 nginx:stable
```

docker-compose.yml (web + redis):
```yaml
version: "3.8"
services:
  web:
    build: .
    ports:
      - "8080:80"
    depends_on:
      - redis
  redis:
    image: redis:7-alpine
```
Start: `docker compose up -d`

## Useful commands
- Build: `docker build -t myapp:tag .`
- Run: `docker run -d -p 80:80 --name app myapp:tag`
- List running containers: `docker ps`
- List images: `docker images`
- Exec into container: `docker exec -it app /bin/sh`
- Logs: `docker logs -f app`
- Remove container/image: `docker rm app`, `docker rmi myapp:tag`
- Compose: `docker compose up -d`, `docker compose logs -f`

## Best practices
- Use small base images (alpine, distroless) when possible.
- Follow multi-stage builds to reduce final image size.
- Do not store secrets in images; use environment variables, secrets managers, or Docker Secrets.
- Keep images immutable and versioned with tags.
- Add a .dockerignore file to speed builds and avoid leaking files.
- Run processes as non-root inside containers when feasible.
- Add HEALTHCHECK to images for orchestration health reporting.

## Security considerations
- Scan images for vulnerabilities regularly.
- Minimize installed packages and attack surface.
- Use official or trusted base images.
- Pin image digests or tags for reproducible deployments.
- Limit container capabilities and use user namespaces or seccomp profiles.

## Troubleshooting tips
- If container fails to start: check `docker logs <container>` and `docker inspect <container>`.
- Network issues: inspect networks (`docker network ls`, `docker network inspect`).
- Build issues: add `--progress=plain` and check Dockerfile layers; use `docker build --no-cache` to force rebuild.

## Next steps / learning path
- Install Docker Desktop (Windows/macOS) or Docker Engine (Linux).
- Learn Dockerfile best practices and multi-stage builds.
- Learn Docker Compose for multi-container dev environments.
- Explore orchestration: Kubernetes or Docker Swarm for production-scale deployments.
- Read the official docs: https://docs.docker.com/

This file should serve as a concise reference for getting started with Docker and as a base to link to more detailed guides (Dockerfile patterns, Compose, security hardening, CI/CD integrations).