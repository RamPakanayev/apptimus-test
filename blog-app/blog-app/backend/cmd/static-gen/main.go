// backend/cmd/static-gen/main.go
package main

import (
	"database/sql"
	"encoding/json"
	"flag"
	"fmt"
	"html/template"
	"log"
	"os"
	"path/filepath"
	"time"

	_ "github.com/go-sql-driver/mysql"

	"blog-app/internal/database"
	"blog-app/internal/models"
)

type StaticPost struct {
	ID        int       `json:"id"`
	Title     string    `json:"title"`
	Content   template.HTML `json:"content"`
	Author    string    `json:"author"`
	CreatedAt time.Time `json:"created_at"`
}

type StaticPageData struct {
	Posts    []StaticPost `json:"posts"`
	PostsMap map[int]StaticPost `json:"postsMap"`
}

func main() {
	// Define command line flags
	outputDir := flag.String("output", "static", "Output directory for static site")
	flag.Parse()

	log.Printf("Generating static site in %s...", *outputDir)

	// Connect to the database
	db, err := database.NewConnection()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	// Get all posts
	posts, err := getAllPosts(db)
	if err != nil {
		log.Fatalf("Failed to get posts: %v", err)
	}

	// Create the output directory if it doesn't exist
	err = os.MkdirAll(*outputDir, 0755)
	if err != nil {
		log.Fatalf("Failed to create output directory: %v", err)
	}

	// Create data directory
	dataDir := filepath.Join(*outputDir, "data")
	err = os.MkdirAll(dataDir, 0755)
	if err != nil {
		log.Fatalf("Failed to create data directory: %v", err)
	}

	// Convert to static posts
	var staticPosts []StaticPost
	postsMap := make(map[int]StaticPost)
	
	for _, post := range posts {
		staticPost := StaticPost{
			ID:        post.ID,
			Title:     post.Title,
			Content:   template.HTML(post.Content),
			Author:    post.Author,
			CreatedAt: post.CreatedAt,
		}
		staticPosts = append(staticPosts, staticPost)
		postsMap[post.ID] = staticPost
	}

	// Create the page data
	pageData := StaticPageData{
		Posts:    staticPosts,
		PostsMap: postsMap,
	}

	// Write posts JSON
	postsJSON, err := json.MarshalIndent(pageData, "", "  ")
	if err != nil {
		log.Fatalf("Failed to marshal posts JSON: %v", err)
	}

	err = os.WriteFile(filepath.Join(dataDir, "posts.json"), postsJSON, 0644)
	if err != nil {
		log.Fatalf("Failed to write posts JSON: %v", err)
	}

	// Write individual post JSON files
	for _, post := range staticPosts {
		postJSON, err := json.MarshalIndent(post, "", "  ")
		if err != nil {
			log.Fatalf("Failed to marshal post JSON: %v", err)
		}

		err = os.WriteFile(filepath.Join(dataDir, fmt.Sprintf("post-%d.json", post.ID)), postJSON, 0644)
		if err != nil {
			log.Fatalf("Failed to write post JSON: %v", err)
		}
	}

	log.Printf("Static site generation complete! Generated %d posts.", len(staticPosts))
}

func getAllPosts(db *sql.DB) ([]*models.Post, error) {
	rows, err := db.Query(`
		SELECT p.id, p.title, p.content, p.author_id, u.username, p.created_at, p.updated_at 
		FROM posts p 
		JOIN users u ON p.author_id = u.id 
		ORDER BY p.created_at DESC`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []*models.Post
	for rows.Next() {
		var post models.Post
		if err := rows.Scan(
			&post.ID, &post.Title, &post.Content, &post.AuthorID, &post.Author, &post.CreatedAt, &post.UpdatedAt,
		); err != nil {
			return nil, err
		}
		posts = append(posts, &post)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return posts, nil
}