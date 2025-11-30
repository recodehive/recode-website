---
id: docker-commands
title: Essential Docker Commands
sidebar_label: Docker Commands
sidebar_position: 3
tags:
  [
    docker,
    commands,
    cli,
    docker-run,
    docker-build
  ]
description: Master essential Docker commands for container and image management. Complete guide to Docker CLI with practical examples and best practices.
---

# Essential Docker Commands

Master the Docker command-line interface (CLI) to effectively manage containers, images, networks, and volumes.

## Container Management Commands

### Running Containers

**Basic Run Command**
```bash
# Run a container
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]

# Examples
docker run hello-world
docker run -it ubuntu bash
docker run -d nginx
docker run -p 8080:80 nginx
```

**Common Run Options**
```bash
# Run in detached mode (background)
docker run -d nginx

# Interactive mode with terminal
docker run -it ubuntu bash

# Port mapping (host:container)
docker run -p 8080:80 nginx

# Environment variables
docker run -e NODE_ENV=production node-app

# Volume mounting
docker run -v /host/path:/container/path nginx

# Name your container
docker run --name my-nginx nginx

# Remove container after exit
docker run --rm ubuntu echo "Hello World"

# Restart policy
docker run --restart unless-stopped nginx
```

### Container Lifecycle

**Start, Stop, Restart**
```bash
# Start a stopped container
docker start container-name

# Stop a running container
docker stop container-name

# Restart a container
docker restart container-name

# Pause/unpause a container
docker pause container-name
docker unpause container-name

# Kill a container (force stop)
docker kill container-name
```

**Container Information**
```bash
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Show container details
docker inspect container-name

# View container logs
docker logs container-name
docker logs -f container-name  # Follow logs

# Show running processes in container
docker top container-name

# Display resource usage statistics
docker stats container-name
```

### Executing Commands in Containers

```bash
# Execute command in running container
docker exec container-name command

# Interactive shell in running container
docker exec -it container-name bash
docker exec -it container-name sh

# Execute as specific user
docker exec -u root -it container-name bash

# Execute with environment variables
docker exec -e VAR=value container-name command
```

### Container Cleanup

```bash
# Remove a container
docker rm container-name

# Remove running container (force)
docker rm -f container-name

# Remove multiple containers
docker rm container1 container2

# Remove all stopped containers
docker container prune

# Remove all containers (dangerous!)
docker rm -f $(docker ps -aq)
```

---

## Image Management Commands

### Building Images

**Build from Dockerfile**
```bash
# Build image from current directory
docker build .

# Build with tag
docker build -t my-app:1.0 .

# Build with custom Dockerfile
docker build -f Dockerfile.prod -t my-app:prod .

# Build with build arguments
docker build --build-arg VERSION=1.0 -t my-app .

# Build without cache
docker build --no-cache -t my-app .
```

### Image Operations

**Pulling and Pushing**
```bash
# Pull image from registry
docker pull nginx
docker pull nginx:1.21-alpine

# Push image to registry
docker push my-registry.com/my-app:1.0

# Tag an image
docker tag my-app:1.0 my-registry.com/my-app:1.0
```

**Image Information**
```bash
# List images
docker images
docker image ls

# Show image details
docker inspect image-name

# Show image history (layers)
docker history image-name

# Show image size and usage
docker system df
```

### Image Cleanup

```bash
# Remove an image
docker rmi image-name

# Remove multiple images
docker rmi image1 image2

# Remove unused images
docker image prune

# Remove all unused images (including tagged)
docker image prune -a

# Remove images by filter
docker image prune --filter "until=24h"
```

---

## Network Management

### Network Operations

```bash
# List networks
docker network ls

# Create a network
docker network create my-network
docker network create --driver bridge my-bridge

# Connect container to network
docker network connect my-network container-name

# Disconnect container from network
docker network disconnect my-network container-name

# Inspect network
docker network inspect my-network

# Remove network
docker network rm my-network

# Remove unused networks
docker network prune
```

### Network Types

```bash
# Bridge network (default)
docker network create --driver bridge my-bridge

# Host network (Linux only)
docker run --network host nginx

# None network (no networking)
docker run --network none alpine

# Custom bridge with subnet
docker network create --driver bridge --subnet=172.20.0.0/16 my-custom-bridge
```

---

## Volume Management

### Volume Operations

```bash
# List volumes
docker volume ls

# Create a volume
docker volume create my-volume

# Inspect volume
docker volume inspect my-volume

# Remove volume
docker volume rm my-volume

# Remove unused volumes
docker volume prune

# Remove all volumes (dangerous!)
docker volume rm $(docker volume ls -q)
```

### Volume Usage

```bash
# Named volume
docker run -v my-volume:/app/data nginx

# Bind mount
docker run -v /host/path:/container/path nginx

# Read-only mount
docker run -v /host/path:/container/path:ro nginx

# Temporary filesystem (tmpfs)
docker run --tmpfs /tmp nginx
```

---

## System Management

### System Information

```bash
# Show Docker system information
docker system info

# Show disk usage
docker system df

# Show detailed disk usage
docker system df -v

# Show Docker version
docker version

# Show events in real-time
docker system events
```

### System Cleanup

```bash
# Remove all unused objects
docker system prune

# Remove all unused objects including volumes
docker system prune --volumes

# Remove all unused objects including unused images
docker system prune -a

# Remove objects older than specified time
docker system prune --filter "until=24h"
```

---

## Docker Compose Commands

### Basic Compose Operations

```bash
# Start services
docker-compose up

# Start in detached mode
docker-compose up -d

# Build and start
docker-compose up --build

# Start specific service
docker-compose up web

# Scale services
docker-compose up --scale web=3

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Stop and remove images
docker-compose down --rmi all
```

### Compose Management

```bash
# View running services
docker-compose ps

# View logs
docker-compose logs
docker-compose logs -f web

# Execute command in service
docker-compose exec web bash

# Run one-off command
docker-compose run web python manage.py migrate

# Restart services
docker-compose restart

# Pull latest images
docker-compose pull
```

---

## Advanced Commands

### Container Inspection

```bash
# Copy files to/from container
docker cp file.txt container:/app/
docker cp container:/app/logs ./

# Export container as tar
docker export container-name > container.tar

# Import tar as image
docker import container.tar my-image:latest

# Save image as tar
docker save my-image:latest > image.tar

# Load image from tar
docker load < image.tar
```

### Resource Management

```bash
# Run with resource limits
docker run -m 512m --cpus="1.5" nginx

# Update container resources
docker update --memory 1g --cpus="2" container-name

# Set restart policy
docker update --restart unless-stopped container-name
```

### Security Commands

```bash
# Run as specific user
docker run -u 1000:1000 nginx

# Run with read-only filesystem
docker run --read-only nginx

# Add/drop capabilities
docker run --cap-add NET_ADMIN nginx
docker run --cap-drop ALL nginx

# Set security options
docker run --security-opt no-new-privileges nginx
```

---

## Command Cheat Sheet

### Most Used Commands

| Command | Description |
|---------|-------------|
| `docker run` | Create and start container |
| `docker ps` | List running containers |
| `docker images` | List images |
| `docker build` | Build image from Dockerfile |
| `docker pull` | Download image |
| `docker push` | Upload image |
| `docker exec` | Execute command in container |
| `docker logs` | View container logs |
| `docker stop` | Stop container |
| `docker rm` | Remove container |
| `docker rmi` | Remove image |

### Quick Cleanup

```bash
# Clean everything
docker system prune -a --volumes

# Clean containers only
docker container prune

# Clean images only
docker image prune -a

# Clean networks only
docker network prune

# Clean volumes only
docker volume prune
```

---

## Best Practices

### Command Tips

1. **Use specific tags** - Avoid `:latest` in production
2. **Name your containers** - Use `--name` for easier management
3. **Use labels** - Add metadata with `--label`
4. **Limit resources** - Set memory and CPU limits
5. **Use health checks** - Monitor container health
6. **Clean up regularly** - Remove unused objects

### Security Tips

```bash
# Don't run as root
docker run -u 1000:1000 my-app

# Use read-only filesystem when possible
docker run --read-only my-app

# Drop unnecessary capabilities
docker run --cap-drop ALL --cap-add NET_BIND_SERVICE my-app

# Use security profiles
docker run --security-opt apparmor:my-profile my-app
```

---

## Troubleshooting Commands

### Debugging Containers

```bash
# Check why container exited
docker ps -a
docker logs container-name

# Inspect container configuration
docker inspect container-name

# Check resource usage
docker stats container-name

# Access container filesystem
docker exec -it container-name sh

# Check network connectivity
docker exec container-name ping google.com
```

### Performance Monitoring

```bash
# Real-time resource usage
docker stats

# Container processes
docker top container-name

# System events
docker system events

# Disk usage breakdown
docker system df -v
```

Ready to master Docker? Practice these commands and move on to learning Dockerfile creation! 🚀