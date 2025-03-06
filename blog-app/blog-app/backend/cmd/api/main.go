// backend/cmd/api/main.go
package main

import (
    "fmt"
    "net/http"
)

func main() {
    http.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        w.Write([]byte(`{"status":"healthy"}`))
    })

    fmt.Println("Server starting on port 8080...")
    if err := http.ListenAndServe(":8080", nil); err != nil {
        fmt.Printf("Server error: %v\n", err)
    }
}