# Development Dockerfile for backend
FROM golang:1.21-alpine

# Set working directory
WORKDIR /app

# Install dependencies
RUN apk add --no-cache git

# Copy go.mod and go.sum files
COPY go.mod go.sum ./

# Pre-download dependencies
RUN go mod tidy

# Copy the source code
COPY . .

# Build the application with explicit path
RUN go build -o /app/api ./cmd/api

# Expose the port
EXPOSE 8080

# Run the application with absolute path
CMD ["/app/api"]