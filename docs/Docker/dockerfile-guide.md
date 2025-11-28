---
id: dockerfile-guide
title: Dockerfile Complete Guide
sidebar_label: Dockerfile Guide
sidebar_position: 4
tags:
  [
    docker,
    dockerfile,
    image-building,
    best-practices
  ]
description: Complete guide to writing Dockerfiles. Learn all Dockerfile instructions, best practices, multi-stage builds, and optimization techniques.
---

# Dockerfile Complete Guide

A Dockerfile is a text file containing instructions to build Docker images. Master Dockerfile creation to build efficient, secure, and maintainable container images.

## What is a Dockerfile?

A Dockerfile is a script containing a series of instructions used to build a Docker image automatically. Each instruction creates a new layer in the image.

**Basic Structure:**
```dockerfile
# Comment
INSTRUCTION arguments
```

---

## Dockerfile Instructions

### FROM - Base Image

**Sets the base image for subsequent instructions**

```dockerfile
# Use official image
FROM node:18-alpine

# Use specific version
FROM python:3.11-slim

# Use scratch (empty image)
FROM scratch

# Multi-stage build
FROM node:18-alpine AS builder
```

**Best Practices:**
- Use official images when possible
- Specify exact versions for reproducibility
- Use minimal base images (alpine, slim)

### WORKDIR - Working Directory

**Sets the working directory for subsequent instructions**

```dockerfile
# Set working directory
WORKDIR /app

# Creates directory if it doesn't exist
WORKDIR /app/src

# Use absolute paths
WORKDIR /usr/src/app
```

### COPY vs ADD

**COPY - Copy files/directories**
```dockerfile
# Copy single file
COPY package.json .

# Copy directory
COPY src/ ./src/

# Copy with ownership
COPY --chown=node:node package.json .

# Copy from build stage
COPY --from=builder /app/dist ./dist
```

**ADD - Copy with additional features**
```dockerfile
# Copy and extract tar
ADD app.tar.gz /app/

# Download from URL (not recommended)
ADD https://example.com/file.tar.gz /app/

# Copy files (same as COPY)
ADD package.json .
```

**When to use:**
- **COPY**: For simple file copying (recommended)
- **ADD**: Only when you need auto-extraction or URL download

### RUN - Execute Commands

**Execute commands during image build**

```dockerfile
# Single command
RUN npm install

# Multiple commands (inefficient)
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get clean

# Multiple commands (efficient)
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Using arrays (exec form)
RUN ["npm", "install"]
```

### CMD - Default Command

**Specify default command when container starts**

```dockerfile
# Shell form
CMD npm start

# Exec form (recommended)
CMD ["npm", "start"]

# With parameters
CMD ["node", "server.js"]

# Can be overridden at runtime
# docker run my-app python app.py
```

### ENTRYPOINT - Entry Point

**Configure container as executable**

```dockerfile
# Exec form (recommended)
ENTRYPOINT ["python", "app.py"]

# Shell form
ENTRYPOINT python app.py

# Combined with CMD
ENTRYPOINT ["python"]
CMD ["app.py"]

# Runtime: docker run my-app script.py
# Executes: python script.py
```

**ENTRYPOINT vs CMD:**
- **ENTRYPOINT**: Cannot be overridden, always executes
- **CMD**: Can be overridden by runtime arguments
- **Both**: ENTRYPOINT + CMD for flexible defaults

### ENV - Environment Variables

**Set environment variables**

```dockerfile
# Single variable
ENV NODE_ENV=production

# Multiple variables
ENV NODE_ENV=production \
    PORT=3000 \
    DEBUG=false

# Using in other instructions
ENV APP_HOME=/app
WORKDIR $APP_HOME
```

### ARG - Build Arguments

**Define build-time variables**

```dockerfile
# Define argument
ARG VERSION=1.0
ARG BUILD_DATE

# Use in instructions
FROM node:${VERSION}-alpine
LABEL build-date=${BUILD_DATE}

# Build with arguments
# docker build --build-arg VERSION=2.0 --build-arg BUILD_DATE=$(date) .
```

### EXPOSE - Document Ports

**Document which ports the container listens on**

```dockerfile
# Single port
EXPOSE 3000

# Multiple ports
EXPOSE 3000 8080

# With protocol
EXPOSE 3000/tcp
EXPOSE 53/udp

# Note: EXPOSE doesn't publish ports
# Use -p flag: docker run -p 3000:3000 my-app
```

### VOLUME - Mount Points

**Create mount points for external volumes**

```dockerfile
# Single volume
VOLUME /data

# Multiple volumes
VOLUME ["/data", "/logs"]

# Best practice: Use at runtime instead
# docker run -v my-data:/data my-app
```

### USER - Switch User

**Set user for subsequent instructions**

```dockerfile
# Create user and switch
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001
USER nextjs

# Switch to existing user
USER node

# Use numeric ID
USER 1001:1001
```

### LABEL - Metadata

**Add metadata to image**

```dockerfile
# Single label
LABEL version="1.0"

# Multiple labels
LABEL version="1.0" \
      description="My application" \
      maintainer="developer@example.com"

# Standard labels
LABEL org.opencontainers.image.title="My App"
LABEL org.opencontainers.image.version="1.0.0"
```

---

## Multi-Stage Builds

**Build efficient images by using multiple FROM statements**

### Basic Multi-Stage Example

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Production stage
FROM node:18-alpine AS production
WORKDIR /app
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001
COPY --from=builder /app/node_modules ./node_modules
COPY . .
USER nextjs
EXPOSE 3000
CMD ["npm", "start"]
```

### Advanced Multi-Stage Example

```dockerfile
# Base stage with common dependencies
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./

# Development dependencies
FROM base AS dev-deps
RUN npm ci

# Production dependencies
FROM base AS prod-deps
RUN npm ci --only=production

# Build stage
FROM dev-deps AS build
COPY . .
RUN npm run build

# Test stage
FROM dev-deps AS test
COPY . .
RUN npm test

# Production stage
FROM node:18-alpine AS production
WORKDIR /app
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
USER nextjs
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

### Build Specific Stage

```bash
# Build only test stage
docker build --target test -t my-app:test .

# Build production stage
docker build --target production -t my-app:prod .
```

---

## Best Practices

### Image Size Optimization

**1. Use Minimal Base Images**
```dockerfile
# Good: Alpine-based images
FROM node:18-alpine
FROM python:3.11-alpine

# Better: Distroless images
FROM gcr.io/distroless/nodejs18-debian11

# Best: Scratch for static binaries
FROM scratch
```

**2. Minimize Layers**
```dockerfile
# Bad: Multiple RUN instructions
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get clean

# Good: Single RUN instruction
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
```

**3. Use .dockerignore**
```dockerignore
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.nyc_output
coverage
.nyc_output
```

### Security Best Practices

**1. Don't Run as Root**
```dockerfile
# Create non-root user
RUN addgroup -g 1001 -S appgroup && \
    adduser -S appuser -u 1001 -G appgroup

# Switch to non-root user
USER appuser
```

**2. Use Specific Versions**
```dockerfile
# Bad: Latest tag
FROM node:latest

# Good: Specific version
FROM node:18.17.0-alpine
```

**3. Minimize Attack Surface**
```dockerfile
# Remove package managers
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    apt-get purge -y --auto-remove apt-get && \
    rm -rf /var/lib/apt/lists/*
```

### Performance Optimization

**1. Order Instructions by Change Frequency**
```dockerfile
# Dependencies change less frequently
COPY package*.json ./
RUN npm ci --only=production

# Source code changes more frequently
COPY . .
```

**2. Use Build Cache Effectively**
```dockerfile
# Cache npm dependencies
COPY package*.json ./
RUN npm ci

# Copy source code after dependencies
COPY . .
RUN npm run build
```

**3. Leverage Multi-Stage Builds**
```dockerfile
# Build stage with dev dependencies
FROM node:18-alpine AS builder
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage with only runtime dependencies
FROM node:18-alpine AS production
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
```

---

## Real-World Examples

### Node.js Application

```dockerfile
# Multi-stage build for Node.js app
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./

# Install dependencies
FROM base AS deps
RUN npm ci --only=production && npm cache clean --force

# Build application
FROM base AS build
RUN npm ci
COPY . .
RUN npm run build

# Production image
FROM node:18-alpine AS production
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy dependencies and built application
COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nextjs:nodejs /app/dist ./dist
COPY --chown=nextjs:nodejs package*.json ./

# Switch to non-root user
USER nextjs

# Expose port and add health check
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start application
CMD ["node", "dist/server.js"]
```

### Python Flask Application

```dockerfile
# Use Python slim image
FROM python:3.11-slim AS base

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        build-essential \
        curl && \
    rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN useradd --create-home --shell /bin/bash app

# Set working directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY --chown=app:app . .

# Switch to non-root user
USER app

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/health || exit 1

# Start application
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "app:app"]
```

### Go Application

```dockerfile
# Build stage
FROM golang:1.21-alpine AS builder

# Install git (required for go modules)
RUN apk add --no-cache git

# Set working directory
WORKDIR /app

# Copy go mod files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Build binary
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Production stage
FROM scratch

# Copy CA certificates for HTTPS
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

# Copy binary
COPY --from=builder /app/main /main

# Expose port
EXPOSE 8080

# Run binary
ENTRYPOINT ["/main"]
```

---

## Advanced Dockerfile Features

### Health Checks

```dockerfile
# Basic health check
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Custom health check script
COPY healthcheck.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/healthcheck.sh
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD /usr/local/bin/healthcheck.sh

# Disable inherited health check
HEALTHCHECK NONE
```

### Build Arguments and Environment Variables

```dockerfile
# Build arguments
ARG NODE_VERSION=18
ARG APP_VERSION=1.0.0

FROM node:${NODE_VERSION}-alpine

# Environment variables
ENV NODE_ENV=production \
    APP_VERSION=${APP_VERSION} \
    PORT=3000

# Use in labels
LABEL version=${APP_VERSION}
```

### Conditional Instructions

```dockerfile
# Using shell conditions
RUN if [ "$NODE_ENV" = "development" ]; then \
      npm install; \
    else \
      npm ci --only=production; \
    fi

# Using build arguments
ARG INSTALL_DEV=false
RUN if [ "$INSTALL_DEV" = "true" ]; then \
      apt-get install -y development-tools; \
    fi
```

---

## Dockerfile Linting and Validation

### Using Hadolint

```bash
# Install hadolint
brew install hadolint

# Lint Dockerfile
hadolint Dockerfile

# Ignore specific rules
hadolint --ignore DL3008 --ignore DL3009 Dockerfile
```

### Common Dockerfile Issues

1. **DL3008**: Pin versions in apt-get install
2. **DL3009**: Delete apt-get lists after installing
3. **DL3015**: Avoid additional packages by specifying --no-install-recommends
4. **DL4006**: Set SHELL option -o pipefail before RUN with a pipe

---

## Testing Dockerfiles

### Build and Test

```bash
# Build image
docker build -t my-app:test .

# Test image
docker run --rm my-app:test

# Test with different build args
docker build --build-arg NODE_ENV=development -t my-app:dev .

# Test specific stage
docker build --target test -t my-app:test .
```

### Image Analysis

```bash
# Analyze image layers
docker history my-app:latest

# Check image size
docker images my-app

# Inspect image configuration
docker inspect my-app:latest

# Scan for vulnerabilities
docker scout cves my-app:latest
```

---

## Troubleshooting Dockerfile Issues

### Common Problems

**Build Context Too Large**
```bash
# Use .dockerignore
echo "node_modules" >> .dockerignore
echo ".git" >> .dockerignore

# Check build context size
docker build --no-cache .
```

**Layer Caching Issues**
```bash
# Disable cache
docker build --no-cache .

# Clear build cache
docker builder prune
```

**Permission Issues**
```dockerfile
# Fix ownership
COPY --chown=user:group files /app/

# Set permissions
RUN chmod +x /app/script.sh
```

Ready to build efficient Docker images? Start with simple Dockerfiles and gradually implement advanced techniques! 🚀