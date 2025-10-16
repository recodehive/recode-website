# Docker Container Setup - Beginner-Friendly Guide

This guide explains how to set up and run the Recode Hive website using Docker in the simplest way possible.

## Prerequisites

- Install [Docker](https://docs.docker.com/engine/install/).
- Install Docker Compose (usually included with Docker Desktop).

## Steps

### 1. Start the Application with Docker Compose

The easiest way to run the application is by using Docker Compose. Simply run the following command in the project root directory:

```bash
docker-compose up --build
```

This command will:
- Build the Docker image.
- Start the container.
- Map port `3000` from the container to your local machine.

Once the setup is complete, visit [http://localhost:3000](http://localhost:3000) to view the site.

### 2. Stop the Application

To stop the application, press `Ctrl+C` in the terminal where the application is running. Then, remove the containers with:

```bash
docker-compose down
```

### 3. Debugging Tips

- **View Logs:** If you encounter issues, check the container logs:
  ```bash
  docker-compose logs
  ```
- **Rebuild the Image:** If you make changes to the code, rebuild the image:
  ```bash
  docker-compose up --build
  ```
- **Access the Container Shell:** To debug inside the container:
  ```bash
  docker exec -it <container_name> sh
  ```

### Notes

- The `docker-compose.yml` file is pre-configured for development.
- The application is set to bind to `0.0.0.0` for external access.
- File changes on your local machine will automatically reflect in the container (hot-reloading enabled).

For more details, refer to the official Docker documentation.

