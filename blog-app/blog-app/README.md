# Blog Application

A full-stack blog platform built with Go, Next.js, MySQL, and Docker. This application features user authentication, post management with WYSIWYG editing, and static site generation capabilities.

## Table of Contents

- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Development Environment](#development-environment)
- [Project Structure](#project-structure)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Static Site Generation](#static-site-generation)
- [Database Access](#database-access)
- [Troubleshooting](#troubleshooting)
- [Cross-Platform Compatibility](#cross-platform-compatibility)

## Architecture

The application uses a modern stack with the following components:

- **Backend**: Go with Gorilla Mux for routing
- **Frontend**: Next.js with React and TypeScript
- **Database**: MySQL
- **Containerization**: Docker & Docker Compose
- **Styling**: Tailwind CSS
- **Authentication**: JWT (JSON Web Tokens)

## Prerequisites

Ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/) (v20.10.0+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0.0+)
- [Git](https://git-scm.com/downloads) (optional, for cloning)

## Getting Started

### Clone the Repository

```bash
git clone <repository-url>
cd blog-app
```

## Development Environment

Start containers:

```bash
docker-compose up -d
```

Access application:

- Frontend: [http://localhost:3001](http://localhost:3001)
- Backend API: [http://localhost:8080/api](http://localhost:8080/api)
- MySQL Database: `localhost:3306`

Default test credentials:

- Admin: `admin@example.com` / `password`
- User: `user1@example.com` / `password`

> **Note:** If default credentials fail, register a new user.

## Static Site Generation

Ensure application is running, then generate static site:

```bash
docker-compose run static-generator
```

Access at [http://localhost:8090](http://localhost:8090).

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

- Registration/Login
- JWT Authentication
- User management (admin only)

### Post Management

- CRUD posts
- Rich text editing
- Author-based permissions

### Frontend

- Responsive Tailwind CSS design
- Dynamic Next.js routing
- React Context state management

### Backend

- Go-based RESTful API
- JWT middleware protection
- MySQL database
- Static site generation

## API Endpoints

### Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`

### Users

- `GET /api/users` *(auth required)*
- `DELETE /api/users/{id}` *(auth required)*

### Posts

- `GET /api/posts` *(auth required)*
- `POST /api/posts` *(auth required)*
- `GET /api/posts/{id}` *(auth required)*
- `PUT /api/posts/{id}` *(auth required, author only)*
- `DELETE /api/posts/{id}` *(auth required, author only)*

## Database Access

Connect via any MySQL client:

- **Host:** `localhost`
- **Port:** `3306`
- **User:** `root`
- **Password:** `password`
- **Database:** `blogapp`

## Troubleshooting

### Container Issues

```bash
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mysql

docker-compose restart backend
docker-compose restart frontend
```

### Database Issues

Check database status:

```bash
docker-compose ps

docker exec -it blog-mysql mysql -u root -ppassword -e "USE blogapp; SHOW TABLES;"
```

### Frontend Issues

If Tailwind CSS fails:

```bash
docker-compose exec frontend sh -c "npx tailwindcss -i ./styles/globals.css -o ./styles/output.css"
docker-compose restart frontend
```

### Port Conflicts

Check port usage:

**Linux/macOS**

```bash
sudo lsof -i :3001
sudo lsof -i :8080
sudo lsof -i :3306
```

**Windows**

```bash
netstat -ano | findstr :3001
netstat -ano | findstr :8080
netstat -ano | findstr :3306
```

Adjust ports in `docker-compose.yml` as needed.

## Cross-Platform Compatibility

Tested on:

- Ubuntu 20.04 LTS
- macOS Monterey (12.0+)
- Windows 11 with WSL2

For platform-specific issues, consult troubleshooting or open an issue.
