# Blog Application

## Overview
This is a full-stack blog application built using **Go (backend)** and **Next.js (frontend)** with **MySQL (database)** and **NGINX (reverse proxy)**. The project is fully containerized using **Docker** and orchestrated with **Docker Compose**.

## Project Structure
```
blog-app/
│   README.md
│   docker-compose.yml
│   docker-compose.prod.yml
│
├── blog-app/
    ├── backend/
    │   ├── cmd/
    │   │   ├── api/
    │   │   │   └── main.go
    │   │   ├── static-gen/
    │   │       └── main.go
    │   ├── internal/
    │   │   ├── auth/auth.go
    │   │   ├── database/database.go
    │   │   ├── handlers/
    │   │   │   ├── auth_handlers.go
    │   │   │   ├── health.go
    │   │   │   ├── post_handlers.go
    │   │   │   ├── user_handlers.go
    │   │   ├── middleware/auth.go
    │   │   ├── models/
    │   │       ├── post.go
    │   │       ├── user.go
    │   ├── Dockerfile
    │   ├── Dockerfile.prod
    │   ├── go.mod
    │   ├── go.sum
    │
    ├── frontend/
    │   ├── components/
    │   │   ├── Layout.tsx
    │   │   ├── Navbar.tsx
    │   │   ├── PostEditor.tsx
    │   ├── context/
    │   │   ├── AuthContext.tsx
    │   ├── pages/
    │   │   ├── posts/[id]/edit.tsx
    │   │   ├── posts/[id].tsx
    │   │   ├── posts/index.tsx
    │   │   ├── posts/new.tsx
    │   │   ├── index.tsx
    │   │   ├── login.tsx
    │   │   ├── register.tsx
    │   ├── public/
    │   ├── styles/
    │   ├── Dockerfile
    │   ├── Dockerfile.prod
    │   ├── package.json
    │   ├── tsconfig.json
    │
    ├── mysql/
    │   ├── init.sql
    │
    ├── nginx/
    │   ├── conf.d/
    │   ├── nginx.conf
    │   ├── Dockerfile
```

## Prerequisites
- **Docker** & **Docker Compose** installed
- **Node.js (v20+ recommended)** for frontend development
- **Go (v1.21+ recommended)** for backend development

## Environment Variables
Create a `.env` file for the backend:
```env
DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=blogapp
JWT_SECRET=your-secret-key
PORT=8080
```

Create a `.env.local` file for the frontend:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## Running the Project
### 1. Clone the Repository
```sh
git clone https://github.com/your-repo/blog-app.git
cd blog-app/blog-app
```

### 2. Start Services with Docker
```sh
docker-compose up --build
```
This will start the **backend**, **frontend**, **MySQL**, and **NGINX** services.

### 3. Load Sample Data
To load the initial database schema and sample data:
```sh
docker exec -it blog-mysql mysql -u root -ppassword blogapp < mysql/init.sql
```

### 4. Access the Application
- **Frontend**: `http://localhost:3001`
- **API**: `http://localhost:8080/api`
- **NGINX**: `http://localhost`

## Development Mode
To run services without Docker:

### **Backend**
```sh
cd backend
export $(cat .env | xargs)
go run cmd/api/main.go
```

### **Frontend**
```sh
cd frontend
npm install
npm run dev
```

## Production Deployment
```sh
docker-compose -f docker-compose.prod.yml up --build -d
```
This starts the app in detached mode with **production-ready settings**.

## API Endpoints
### **Authentication**
- `POST /api/auth/login` - Login a user
- `POST /api/auth/register` - Register a new user

### **Posts**
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get a single post
- `POST /api/posts` - Create a post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post

## Troubleshooting
### **Check Logs**
```sh
docker logs blog-backend
```

### **Check Running Containers**
```sh
docker ps
```

### **Restart Services**
```sh
docker-compose restart
```

## Running on Different OS
### **MacOS & Linux**
```sh
sudo docker-compose up --build
```

### **Windows (WSL2 Recommended)**
```sh
docker-compose up --build
```

If issues arise with MySQL, increase the **WSL2 memory limit** in `~/.wslconfig`:
```ini
[wsl2]
memory=4GB
```

## License
MIT License
