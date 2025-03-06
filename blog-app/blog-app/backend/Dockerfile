FROM golang:1.21-alpine

# Install development tools
RUN apk add --no-cache git

# Set working directory for development
WORKDIR /src

# Copy go.mod and go.sum for dependency management
COPY go.mod go.sum ./

# Download dependencies
RUN go mod tidy

# The source code will be mounted from host in development mode
# No need to COPY . . in development mode

# Expose API port
EXPOSE 8080

# Run the application in development mode
CMD ["go", "run", "./cmd/api"]