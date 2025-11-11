<div align="center">

# 🐳 Introduction to Docker
</div>

Welcome! Docker helps you package and run applications in containers—think of them as lightweight, portable boxes that contain everything your app needs to run.

## What is Docker?

Docker is a platform that lets you build, ship, and run applications inside containers. Instead of worrying about "it works on my machine" problems, Docker ensures your app runs the same way everywhere.

**Simple analogy:** Just like shipping containers standardized global trade, Docker containers standardize software deployment. Your application + its dependencies = one portable package.

## Why Use Docker?

- **Consistency** - Same behavior on your laptop, your teammate's computer, and production servers
- **Fast setup** - New developers can start working in minutes instead of days
- **Isolation** - Each app runs in its own environment without conflicts
- **Efficiency** - Containers are lightweight and start in seconds
- **Portability** - Build once, run anywhere

## Core Concepts

### Image
A blueprint for your application. Contains your code, runtime, libraries, and configuration. Images are built from a **Dockerfile** and never change once created.

### Container
A running instance of an image. Lightweight, isolated, and disposable. You can run multiple containers from the same image.

### Dockerfile
A simple text file with instructions to build an image:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "app.js"]
```

### Registry
A storage service for Docker images. **Docker Hub** is the most popular—like GitHub for Docker images.

### Volume
Persistent storage that survives when containers are deleted. Use for databases, logs, and user files.

### Network
Allows containers to communicate with each other securely.

## Quick Start Workflow

**1. Create a Dockerfile**
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

**2. Build your image**
```bash
docker build -t my-app:1.0 .
```

**3. Run a container**
```bash
docker run -d --name my-app -p 8000:8000 my-app:1.0
```

**4. Check it's running**
```bash
docker ps
docker logs my-app
```

That's it! Your app is now running in a container.

## Essential Commands

```bash
# Build an image
docker build -t myapp:1.0 .

# Run a container
docker run -d --name myapp -p 8080:80 myapp:1.0

# List running containers
docker ps

# View logs
docker logs myapp

# Stop a container
docker stop myapp

# Remove a container
docker rm myapp

# List images
docker images

# Remove an image
docker rmi myapp:1.0
```


## Best Practices

✅ **Use official base images** - `node:18-alpine`, `python:3.11-slim`  
✅ **Use specific tags** - Avoid `:latest` in production  
✅ **Keep images small** - Use Alpine or slim variants  
✅ **Add .dockerignore** - Exclude `node_modules`, `.git`, logs  
✅ **Don't run as root** - Create a non-privileged user  
✅ **Use volumes for data** - Never store important data in containers  
✅ **One process per container** - Keep it simple and focused  


## Next Steps

1. **Install Docker** - Get Docker Desktop (Mac/Windows) or Docker Engine (Linux)
2. **Try the examples** - Build and run the sample Dockerfiles above
3. **Learn Docker Compose** - Manage multi-container apps easily
4. **Explore Docker Hub** - Find pre-built images for databases, web servers, etc.
5. **Read the docs** - https://docs.docker.com/

## Key Takeaways

- **Containers** package your app with everything it needs
- **Images** are blueprints, containers are running instances
- **Dockerfiles** define how to build images
- **Docker Compose** manages multiple containers together
- Docker makes development, testing, and deployment much easier

Ready to containerize your first app? Start with a simple Dockerfile and experiment! 🚀