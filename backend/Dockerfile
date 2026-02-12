# Base image
FROM node:18-alpine

# Install OpenSSL and other dependencies for Prisma
RUN apk add --no-cache openssl libc6-compat

# Working directory
WORKDIR /app

# Install dependencies (only production)
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies including dev for build (needed for nest build)
# Actually, we can install all, build, then prune.
RUN npm install

# Copy source
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the app
RUN npm run build

# Remove dev dependencies
# RUN npm prune --production # Optional, but good for size. 
# NestJS requires some "dev" deps if they are stuck in dependencies? No, usually fine.

# Expose port
EXPOSE 3000

# Start command
CMD ["npm", "run", "start:prod"]
