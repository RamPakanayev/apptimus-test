# Blog Application

A full-stack blog platform built with Go, Next.js, MySQL, and Docker. This application features user authentication, post management with WYSIWYG editing, and static site generation capabilities.

## Table of Contents

- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Static Site Generation](#static-site-generation)
- [Database Access](#database-access)
- [Troubleshooting](#troubleshooting)
- [Cross-Platform Compatibility](#cross-platform-compatibility)

## Architecture

- **Backend**: Go with Gorilla Mux
- **Frontend**: Next.js with React and TypeScript
- **Database**: MySQL
- **Containerization**: Docker & Docker Compose
- **Styling**: Tailwind CSS
- **Authentication**: JWT

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (v20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0+)
- [Git](https://git-scm.com/downloads) (optional)

## Getting Started

### Clone the Repository

```bash
git clone <repository-url>
cd blog-app
```

### Development Environment

Start the containers:

```bash
docker-compose up -d
```

Access the application:

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:8080/api
- **MySQL Database**: localhost:3306

**Default credentials:**

- Admin: `admin@example.com` / `password`
- User: `user1@example.com` / `password`

### Production Environment

Start containers in production:

```bash
docker-compose -f docker-compose.prod.yml up -d
```

Generate static site (optional):

```bash
docker-compose -f docker-compose.prod.yml run static-generator
```

Access the application:

- **Frontend**: http://localhost:3000
- **Static Site**: http://localhost:8090
- **Backend API**: http://localhost:8080/api

## Project Structure

```
blog-app/
├── backend/
│   ├── cmd/
│   │   ├── api/
│   │   └── static-gen/
│   ├── internal/
│   │   ├── auth/
│   │   ├── handlers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── database/
│   ├── Dockerfile
│   └── Dockerfile.prod
├── frontend/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── public/
│   ├── styles/
│   ├── Dockerfile
│   └── Dockerfile.prod
├── mysql/
│   └── init.sql
├── nginx/
│   ├── nginx.conf
│   └── Dockerfile
├── docker-compose.yml
├── docker-compose.prod.yml
└── README.md
```

## Features

### User Management
- Registration and login
- JWT-based authentication
- Admin user management

### Post Management
- CRUD operations
- Rich text editing
- Author-specific permissions

### Frontend
- Responsive design (Tailwind CSS)
- Dynamic routing (Next.js)
- React Context for state management

### Backend
- RESTful Go API
- JWT middleware
- MySQL with relational schema
- Static site generation

## API Endpoints

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`

### Users
- `GET /api/users`
- `DELETE /api/users/{id}`

### Posts
- `GET /api/posts`
- `POST /api/posts`
- `GET /api/posts/{id}`
- `PUT /api/posts/{id}`
- `DELETE /api/posts/{id}`

## Static Site Generation

Generate static site:

```bash
docker-compose -f docker-compose.prod.yml run static-generator
```

Static site accessible at: `http://localhost:8090`

## Database Access

MySQL Database credentials:

- Host: `localhost`
- Port: `3306`
- Username: `root`
- Password: `password`
- Database: `blogapp`

## Troubleshooting

### Container Startup Issues

```bash
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mysql
```

Restart containers:

```bash
docker-compose restart backend frontend
```

### Database Connection Issues

Check database health:

```bash
docker-compose ps
```

Verify database tables:

```bash
docker exec -it blog-mysql mysql -u root -ppassword -e "USE blogapp; SHOW TABLES;"
```

### Frontend Styling Issues

Rebuild Tailwind CSS:

```bash
docker-compose exec frontend sh -c "npx tailwindcss -i ./styles/globals.css -o ./styles/output.css"
docker-compose restart frontend
```

### Port Conflicts

Check ports:

```bash
# Linux/macOS
sudo lsof -i :3001
sudo lsof -i :8080
sudo lsof -i :3306

# Windows
netstat -ano | findstr :3001
netstat -ano | findstr :8080
netstat -ano | findstr :3306
```

Modify ports in `docker-compose.yml` as needed.

## Cross-Platform Compatibility

Tested platforms:
- Ubuntu 20.04 LTS
- macOS Monterey (12.0+)
- Windows 11 (WSL2)

Refer to troubleshooting for specific platform issues.
