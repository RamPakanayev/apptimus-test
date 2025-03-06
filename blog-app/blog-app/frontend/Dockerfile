# Development Dockerfile for frontend
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies with legacy-peer-deps
RUN npm install --legacy-peer-deps

# Copy the source code
COPY . .

# Ensure proper Node environment for development
ENV NODE_ENV=development
ENV PORT=3000

# Expose the port
EXPOSE 3000

# Run the application in development mode
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]