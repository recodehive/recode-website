FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

# No need to run 'npm run build' for development-mode Docker
EXPOSE 3000

CMD [ "npm", "run", "dev" ]
