---
id: docker-compose
title: Docker Compose Basics
sidebar_label: 1. Basics
sidebar_position: 5
tags:
  [
    docker,
    docker-compose,
    multi-container,
    basics
  ]
description: Learn Docker Compose fundamentals - basic structure, service configuration, and simple multi-container applications.
---

# Docker Compose Basics

Docker Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application's services, networks, and volumes.

## What is Docker Compose?

Docker Compose allows you to:

- **Define** multi-container applications in a single file
- **Start** all services with one command
- **Scale** services up or down easily
- **Manage** application lifecycle
- **Share** configurations with your team

---

## Basic docker-compose.yml Structure

Understanding the fundamental structure of Docker Compose files.

### Simple Example

```yaml
version: '3.8'

services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
    
  database:
    image: postgres:13
    environment:
      POSTGRES_PASSWORD: mypassword
```

### Complete Structure

```yaml
version: '3.8'

services:
  # Service definitions
  
networks:
  # Network definitions
  
volumes:
  # Volume definitions

configs:
  # Config definitions (Swarm mode)

secrets:
  # Secret definitions (Swarm mode)
```

---

## Service Configuration

Configure individual services within your Docker Compose application.

### Basic Service Options

```yaml
services:
  web:
    # Use existing image
    image: nginx:alpine
    
    # Build from Dockerfile
    build: .
    
    # Build with context and dockerfile
    build:
      context: .
      dockerfile: Dockerfile.prod
      args:
        - NODE_ENV=production
    
    # Container name
    container_name: my-web-app
    
    # Restart policy
    restart: unless-stopped
    
    # Port mapping
    ports:
      - "8080:80"
      - "443:443"
    
    # Environment variables
    environment:
      - NODE_ENV=production
      - DEBUG=false
    
    # Environment file
    env_file:
      - .env
      - .env.prod
```

### Advanced Service Options

```yaml
services:
  app:
    image: my-app:latest
    
    # Dependencies
    depends_on:
      - database
      - redis
    
    # Health check dependency
    depends_on:
      database:
        condition: service_healthy
    
    # Volume mounts
    volumes:
      - ./src:/app/src
      - app-data:/app/data
      - /host/logs:/app/logs:ro
    
    # Networks
    networks:
      - frontend
      - backend
    
    # Health check
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

---

## Simple Examples

Practical examples to get started with Docker Compose.

### Web Application Stack

```yaml
version: '3.8'

services:
  # Frontend
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:5000
    depends_on:
      - backend

  # Backend API
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgresql://user:password@database:5432/myapp
    depends_on:
      - database

  # Database
  database:
    image: postgres:13-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

### WordPress with MySQL

```yaml
version: '3.8'

services:
  wordpress:
    image: wordpress:latest
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST: mysql:3306
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress_password
      WORDPRESS_DB_NAME: wordpress
    volumes:
      - wordpress-data:/var/www/html
    depends_on:
      - mysql

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress_password
      MYSQL_ROOT_PASSWORD: root_password
    volumes:
      - mysql-data:/var/lib/mysql

volumes:
  wordpress-data:
  mysql-data:
```

---

## Networks and Volumes

Manage container networking and data persistence.

### Basic Networks

```yaml
version: '3.8'

services:
  web:
    image: nginx
    networks:
      - frontend
  
  api:
    image: node:alpine
    networks:
      - frontend
      - backend
  
  database:
    image: postgres
    networks:
      - backend

networks:
  frontend:
  backend:
```

### Basic Volumes

```yaml
version: '3.8'

services:
  database:
    image: postgres:13
    volumes:
      - db-data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    environment:
      POSTGRES_PASSWORD: password

volumes:
  db-data:
```

---

## Environment Variables

Manage configuration through environment variables.

### Using .env Files

**docker-compose.yml**
```yaml
version: '3.8'

services:
  app:
    image: my-app:${TAG:-latest}
    environment:
      - NODE_ENV=${NODE_ENV:-development}
      - DATABASE_URL=${DATABASE_URL}
    env_file:
      - .env
```

**.env file**
```bash
TAG=v1.0.0
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@db:5432/myapp
```

---

## Basic Commands

Essential Docker Compose commands for daily operations.

```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs

# Execute commands
docker-compose exec web bash

# View running services
docker-compose ps

# Scale services
docker-compose up --scale web=3
```

---

## Next Steps

Now that you understand Docker Compose basics:

1. **Practice with Examples** - Try the provided examples in your projects
2. **Learn Advanced Features** - Explore production configurations and scaling
3. **Master Complex Architectures** - Build microservices and multi-environment setups

Ready for advanced topics? Check out [Docker Compose Advanced](./docker-compose-advanced.md) for production-ready configurations!