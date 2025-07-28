FROM node:18-alpine AS builder

# Set working directory inside the container
WORKDIR /app

COPY package*.json ./

# Install dependencies with legacy peer deps fix
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Production Image
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app /app
EXPOSE 3000

CMD ["npm", "run","serve"]