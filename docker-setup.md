# Docker Container Setup - Documentation

This is the documentation on how to containerize and run the Recodehive website while using Docker.

## Prerequesites

- [Docker](https://docs.docker.com/engine/install/) installed
- Docker compose installed (Optional)

## Steps

### 1. Create a `Dockerfile` in the root directory

This is a text document that contains all the commands needs to build a Docker image. Basically a
blue print of a docker image.

Key instructions include <br>

- `FROM <base_image>:<tag>` : The first instruction and specifies the base image to build upon.
- `WORKDIR <path>` : Sets the working directory inside the container for subsequent instructions.
- `COPY <source> <destination>` : This instruction copies files or directories from your local
  machine (the build context) into the Docker image.
- `RUN <command>` : Executes commands during the image build process. This is used for installing
  dependencies, updating packages etc.
- `EXPOSE <port>` : Informs docker that the container listens on the specified ports at runtime.

### 2. Build the Docker Image

```bash
docker build -t recodehive-app .
```

This command builds the Docker image using the instructions in the Dockerfile and tags it as
recodehive-app.

### 3. Run the Container

```bash
docker run -p 3000:3000 recodehive-app
```

This runs the container and maps port 3000 from the container to your local machine. <br> Now Visit
http://localhost:3000 to view the site.
