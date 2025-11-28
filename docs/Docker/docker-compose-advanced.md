---
id: docker-compose-advanced
title: Docker Compose Advanced
sidebar_label: 2. Advanced
sidebar_position: 6
tags:
  [
    docker,
    docker-compose,
    production,
    microservices,
    scaling
  ]
description: Advanced Docker Compose features for production - microservices, scaling, security, monitoring, and complex multi-environment setups.
---

# Docker Compose Advanced

Master advanced Docker Compose features for production environments, including microservices architecture, scaling, security, and complex configurations.

## Microservices Architecture

Build scalable microservices with Docker Compose for complex distributed applications.

### Complete Microservices Stack

```yaml
version: '3.8'

services:
  # API Gateway
  gateway:
    build: ./gateway
    ports:
      - "8080:8080"
    environment:
      - USER_SERVICE_URL=http://user-service:3001
      - ORDER_SERVICE_URL=http://order-service:3002
      - PRODUCT_SERVICE_URL=http://product-service:3003
    depends_on:
      - user-service
      - order-service
      - product-service
    networks:
      - microservices

  # User Service
  user-service:
    build: ./services/user
    environment:
      - DATABASE_URL=postgresql://user:password@user-db:5432/users
    depends_on:
      user-db:
        condition: service_healthy
    networks:
      - microservices
      - user-network

  # Order Service
  order-service:
    build: ./services/order
    environment:
      - DATABASE_URL=postgresql://user:password@order-db:5432/orders
      - RABBITMQ_URL=amqp://rabbitmq:5672
    depends_on:
      order-db:
        condition: service_healthy
      rabbitmq:
        condition: service_started
    networks:
      - microservices
      - order-network

  # Product Service
  product-service:
    build: ./services/product
    environment:
      - MONGODB_URL=mongodb://product-db:27017/products
    depends_on:
      - product-db
    networks:
      - microservices
      - product-network

  # Databases
  user-db:
    image: postgres:13-alpine
    environment:
      POSTGRES_DB: users
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - user-db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d users"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - user-network

  order-db:
    image: postgres:13-alpine
    environment:
      POSTGRES_DB: orders
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - order-db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d orders"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - order-network

  product-db:
    image: mongo:5
    volumes:
      - product-db-data:/data/db
    networks:
      - product-network

  # Message Queue
  rabbitmq:
    image: rabbitmq:3-management-alpine
    ports:
      - "15672:15672"  # Management UI
    environment:
      RABBITMQ_DEFAULT_USER: admin
      RABBITMQ_DEFAULT_PASS: admin
    volumes:
      - rabbitmq-data:/var/lib/rabbitmq
    networks:
      - microservices

volumes:
  user-db-data:
  order-db-data:
  product-db-data:
  rabbitmq-data:

networks:
  microservices:
    driver: bridge
  user-network:
    driver: bridge
  order-network:
    driver: bridge
  product-network:
    driver: bridge
```

---

## Advanced Networks

Configure complex networking scenarios for production environments.

### Custom Network Configuration

```yaml
version: '3.8'

services:
  frontend:
    image: nginx
    networks:
      - frontend-network
  
  backend:
    image: node:alpine
    networks:
      - frontend-network
      - backend-network
  
  database:
    image: postgres
    networks:
      - backend-network

networks:
  frontend-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
  backend-network:
    driver: bridge
    internal: true  # No external access
```

### External Networks

```yaml
version: '3.8'

services:
  app:
    image: my-app
    networks:
      - existing-network
      - new-network

networks:
  existing-network:
    external: true
  new-network:
    driver: bridge
```

---

## Production Volumes

Manage persistent data storage for production workloads.

### Named and External Volumes

```yaml
version: '3.8'

services:
  database:
    image: postgres
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - backup-volume:/backups
      - ./config:/etc/postgresql/conf.d:ro

volumes:
  postgres-data:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /opt/postgres-data
  backup-volume:
    external: true
```

### Volume Drivers

```yaml
version: '3.8'

services:
  app:
    image: my-app
    volumes:
      - nfs-data:/data

volumes:
  nfs-data:
    driver: local
    driver_opts:
      type: nfs
      o: addr=192.168.1.100,rw
      device: ":/path/to/dir"
```

---

## Resource Management

Control resource allocation and scaling for optimal performance.

### Resource Limits

```yaml
version: '3.8'

services:
  web:
    image: nginx
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
        window: 120s
```

### Scaling Services

```yaml
version: '3.8'

services:
  web:
    image: nginx
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
      restart_policy:
        condition: on-failure
```

---

## Security Configuration

Implement security best practices for production deployments.

### Security Best Practices

```yaml
version: '3.8'

services:
  app:
    image: my-app
    user: "1000:1000"  # Non-root user
    read_only: true     # Read-only filesystem
    tmpfs:
      - /tmp
      - /var/run
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE
    security_opt:
      - no-new-privileges:true
    sysctls:
      - net.core.somaxconn=1024
```

### Secrets Management

```yaml
version: '3.8'

services:
  app:
    image: my-app
    secrets:
      - db_password
      - api_key
    environment:
      - DB_PASSWORD_FILE=/run/secrets/db_password

secrets:
  db_password:
    file: ./secrets/db_password.txt
  api_key:
    external: true
```

---

## Health Checks & Monitoring

Ensure application reliability with comprehensive monitoring.

### Advanced Health Checks

```yaml
version: '3.8'

services:
  web:
    image: nginx
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s
    depends_on:
      database:
        condition: service_healthy

  database:
    image: postgres:13
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s
```

### Monitoring Stack

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    networks:
      - monitoring

  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus
    networks:
      - monitoring

  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana-data:/var/lib/grafana
    networks:
      - monitoring

volumes:
  prometheus-data:
  grafana-data:

networks:
  monitoring:
```

---

## Multi-Environment Setup

Manage different environments with compose file overrides.

### Environment-Specific Files

**docker-compose.yml** (Base Configuration)
```yaml
version: '3.8'

services:
  app:
    build: .
    environment:
      - NODE_ENV=${NODE_ENV}
    volumes:
      - ./src:/app/src
```

**docker-compose.prod.yml** (Production Override)
```yaml
version: '3.8'

services:
  app:
    build:
      target: production
    volumes: []  # Remove dev volumes
    deploy:
      resources:
        limits:
          memory: 1G
        reservations:
          memory: 512M
```

**docker-compose.dev.yml** (Development Override)
```yaml
version: '3.8'

services:
  app:
    build:
      target: development
    volumes:
      - ./src:/app/src
      - /app/node_modules
    ports:
      - "3000:3000"
```

### Usage Commands

```bash
# Development environment
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Production environment
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

# Testing environment
docker-compose -f docker-compose.yml -f docker-compose.test.yml up
```

---

## Advanced Configurations

Leverage advanced Docker Compose features for complex scenarios.

### Custom Build Context

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.prod
      args:
        - NODE_VERSION=18
        - BUILD_DATE=${BUILD_DATE}
      target: production
      cache_from:
        - my-app:cache
```

### Init Containers

```yaml
version: '3.8'

services:
  # Database migration container
  migrate:
    image: my-app:latest
    command: ["python", "manage.py", "migrate"]
    depends_on:
      database:
        condition: service_healthy
    restart: "no"

  # Main application
  app:
    image: my-app:latest
    depends_on:
      - migrate
    ports:
      - "8000:8000"
```

---

## Troubleshooting & Debugging

Debug and resolve common Docker Compose issues.

### Debug Configuration

```yaml
version: '3.8'

services:
  app:
    image: my-app
    environment:
      - DEBUG=true
      - LOG_LEVEL=debug
    volumes:
      - ./logs:/app/logs
    ports:
      - "9229:9229"  # Debug port
```

### Common Issues Solutions

#### Service Discovery Problems
```bash
# Check network configuration
docker-compose config

# Test connectivity
docker-compose exec web ping database
docker-compose exec web nslookup database
```

#### Volume Permission Issues
```yaml
services:
  app:
    image: my-app
    user: "${UID}:${GID}"
    volumes:
      - ./data:/app/data
```

#### Resource Constraints
```yaml
services:
  app:
    image: my-app
    deploy:
      resources:
        limits:
          memory: 2G
        reservations:
          memory: 1G
```

---

## Best Practices

Follow these guidelines for maintainable Docker Compose configurations.

### File Organization

```
project/
├── docker-compose.yml
├── docker-compose.override.yml
├── docker-compose.prod.yml
├── docker-compose.dev.yml
├── .env
├── .env.example
├── services/
│   ├── web/
│   │   └── Dockerfile
│   └── api/
│       └── Dockerfile
├── config/
│   ├── nginx.conf
│   └── prometheus.yml
└── secrets/
    └── .gitkeep
```

### Version Control

```gitignore
# .gitignore
.env
.env.local
docker-compose.override.yml
volumes/
logs/
secrets/*.txt
```

### Production Checklist

- **Image Tags**: Use specific versions instead of `latest`
- **Resource Limits**: Set CPU and memory constraints
- **Health Checks**: Configure service health monitoring
- **Secrets**: Use Docker secrets for sensitive data
- **Security**: Run containers as non-root users
- **Logging**: Enable centralized log collection
- **Monitoring**: Set up application and infrastructure monitoring
- **Backups**: Configure automated backup strategies
- **Networks**: Use external networks and volumes for persistence
- **Testing**: Implement disaster recovery procedures

Ready to deploy production-grade multi-container applications with Docker Compose advanced patterns!