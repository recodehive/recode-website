# Stage 1: Build the static files
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Install sharp dependencies
RUN apk add --no-cache \
    g++ \
    make \
    python3 \
    libc6-compat

# Update npm to the latest version
RUN npm install -g npm@latest

RUN npm install --legacy-peer-deps

COPY . .

# Build the Docusaurus project
RUN npm run build

# Stage 2: Serve the files using Nginx
FROM nginx:alpine

# Copy the static files from builder stage
# Docusaurus builds to the "build" directory by default
COPY --from=builder /app/build /usr/share/nginx/html

# Expose the application port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
