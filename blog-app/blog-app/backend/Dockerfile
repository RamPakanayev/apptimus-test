# backend/Dockerfile
FROM golang:1.21-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
RUN apk add --no-cache git

# Copy go.mod and go.sum files
COPY go.mod ./
COPY go.sum ./

# Download dependencies
RUN go mod download
RUN go mod tidy

# Copy the source code
COPY . .

# Build the application with explicit output path
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o /app/api ./cmd/api
# List directories to debug
RUN ls -la /app/

# Create a minimal image for running the application
FROM alpine:latest

# Set working directory
WORKDIR /app

# Copy the binary from the builder stage with explicit paths
COPY --from=builder /app/api /app/api
# List directories to debug
RUN ls -la /app/
# Make sure the binary is executable
RUN chmod +x /app/api

# Expose the port
EXPOSE 8080

# Run the application with absolute path
CMD ["/app/api"]