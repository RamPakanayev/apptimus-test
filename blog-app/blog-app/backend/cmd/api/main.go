// backend/cmd/api/main.go
package main

import (
    "fmt"
    "net/http"
    "log"
)

func main() {
    // Add a simple health check route
    http.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        w.Write([]byte(`{"status":"healthy"}`))
    })
    
    // Print startup message
    fmt.Println("Server starting on port 8080...")
    
    // Start the server
    if err := http.ListenAndServe(":8080", nil); err != nil {
        log.Fatalf("Server failed to start: %v", err)
    }
}