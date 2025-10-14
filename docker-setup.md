# Docker Container Setup - Simplified Documentation

This guide explains how to set up and run the Recode Hive website using Docker.

## Prerequisites

- Install [Docker](https://docs.docker.com/engine/install/).
- (Optional) Install Docker Compose for easier multi-container management.

## Steps

### 1. Build and Run with Docker Compose (Recommended)

Using Docker Compose simplifies the setup process. Run the following command in the project root directory:

```bash
docker-compose up --build
```

This command will:
- Build the Docker image.
- Start the container.
- Map port `3000` from the container to your local machine.

Visit [http://localhost:3000](http://localhost:3000) to view the site.

### 2. Manual Setup with Docker (Optional)

If you prefer not to use Docker Compose, follow these steps:

#### a. Build the Docker Image
```bash
docker build -t recodehive-app .
```

#### b. Run the Docker Container
```bash
docker run -p 3000:3000 recodehive-app
```

Visit [http://localhost:3000](http://localhost:3000) to view the site.

## Notes

- Ensure the `Dockerfile` and `docker-compose.yml` are correctly configured.
- The application is set to bind to `0.0.0.0` for external access.
- Use `docker logs <container_id>` to debug any issues.

For more details, refer to the official Docker documentation.

