// backend/cmd/api/main.go
package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gorilla/mux"
	"github.com/rs/cors"

	"blog-app/internal/database"
	"blog-app/internal/handlers"
	"blog-app/internal/middleware"
)

func main() {
	// Configure logging
	log.SetOutput(os.Stdout)
	log.Println("Starting API server...")

	// Initialize database connection
	db, err := database.NewConnection()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	// Initialize router
	router := mux.NewRouter()
	
	// Public routes (no authentication required)
	router.HandleFunc("/api/health", handlers.HealthCheck).Methods("GET")
	router.HandleFunc("/api/auth/register", handlers.RegisterHandler(db)).Methods("POST")
	router.HandleFunc("/api/auth/login", handlers.LoginHandler(db)).Methods("POST")

	// Protected routes (authentication required)
	apiRouter := router.PathPrefix("/api").Subrouter()
	apiRouter.Use(middleware.AuthMiddleware(db))

	// User routes
	apiRouter.HandleFunc("/users", handlers.GetUsersHandler(db)).Methods("GET")
	apiRouter.HandleFunc("/users/{id}", handlers.DeleteUserHandler(db)).Methods("DELETE")

	// Post routes
	apiRouter.HandleFunc("/posts", handlers.GetPostsHandler(db)).Methods("GET")
	apiRouter.HandleFunc("/posts", handlers.CreatePostHandler(db)).Methods("POST")
	apiRouter.HandleFunc("/posts/{id}", handlers.GetPostHandler(db)).Methods("GET")
	apiRouter.HandleFunc("/posts/{id}", handlers.UpdatePostHandler(db)).Methods("PUT")
	apiRouter.HandleFunc("/posts/{id}", handlers.DeletePostHandler(db)).Methods("DELETE")

// Configure CORS
c := cors.New(cors.Options{
	AllowedOrigins:   []string{"*"},  // Allow all origins for development
	AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
	AllowedHeaders:   []string{"Authorization", "Content-Type", "Accept", "Origin"},
	ExposedHeaders:   []string{"Content-Length"},
	AllowCredentials: true,
	MaxAge:           86400, // 24 hours
})
	handler := c.Handler(router)

	// Configure and start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	srv := &http.Server{
		Handler:      handler,
		Addr:         fmt.Sprintf("0.0.0.0:%s", port),
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Start the server in a goroutine
	go func() {
		log.Printf("Server listening on port %s", port)
		if err := srv.ListenAndServe(); err != http.ErrServerClosed {
			log.Fatalf("Server failed to start: %v", err)
		}
	}()

	// Wait for interrupt signal to gracefully shut down the server
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutting down server...")

	// Create a deadline for server shutdown
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Attempt graceful shutdown
	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}

	log.Println("Server exited gracefully")
}