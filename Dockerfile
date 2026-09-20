FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Install sharp dependencies
RUN apk add --no-cache \
    g++ \
    make \
    python3 \
    libc6-compat

# Use npm 10, which is compatible with Node 20
RUN npm install -g npm@10

RUN npm install --legacy-peer-deps

COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
