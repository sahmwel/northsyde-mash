FROM node:20-slim

# Install OpenSSL and netcat (for database readiness check)
RUN apt-get update && apt-get install -y openssl netcat-openbsd && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Generate Prisma Client (must happen after copying schema)
RUN npx prisma generate

EXPOSE 5000

CMD ["node", "src/server.js"]