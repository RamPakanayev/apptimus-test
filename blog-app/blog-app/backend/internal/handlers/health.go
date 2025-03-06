// backend/internal/handlers/health.go
package handlers

import (
    "encoding/json"
    "net/http"
    "time"
)

// HealthResponse represents the response for health check
type HealthResponse struct {
    Status    string    `json:"status"`
    Timestamp time.Time `json:"timestamp"`
}

// HealthCheck handles health check requests
func HealthCheck(w http.ResponseWriter, r *http.Request) {
    response := HealthResponse{
        Status:    "healthy",
        Timestamp: time.Now(),
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(response)
}