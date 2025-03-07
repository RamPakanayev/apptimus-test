# nginx/Dockerfile
FROM nginx:alpine

# Copy NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static website files (will be mounted in production)
WORKDIR /usr/share/nginx/html

# Expose ports
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]