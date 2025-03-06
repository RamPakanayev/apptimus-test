FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies with legacy peer deps flag to resolve React version conflicts
RUN npm install --legacy-peer-deps

# Copy the source code
# (In development mode, this will be overridden by volume mount)
COPY . .

# Set environment variables
ENV NODE_ENV=development
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Expose the port
EXPOSE 3000

# Run the development server
# Turbopack doesn't support --hostname flag, use environment variables instead
CMD ["sh", "-c", "echo 'Starting Next.js server on 0.0.0.0:3000' && npm run dev"]