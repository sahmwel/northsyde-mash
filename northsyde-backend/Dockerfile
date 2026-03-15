FROM node:18-slim

# Install OpenSSL and other dependencies (already present in slim image, but ensure)
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 5000

CMD ["node", "src/server.js"]