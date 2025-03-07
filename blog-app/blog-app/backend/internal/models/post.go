// backend/internal/models/post.go
package models

import (
	"database/sql"
	"errors"
	"time"
)

// Post represents a blog post
type Post struct {
	ID        int       `json:"id"`
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	AuthorID  int       `json:"author_id"`
	Author    string    `json:"author"` // Username of the author
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// CreatePost creates a new post in the database
func CreatePost(db *sql.DB, title, content string, authorID int) (*Post, error) {
	// Validate that the author exists
	var exists bool
	err := db.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE id = ?)", authorID).Scan(&exists)
	if err != nil {
		return nil, err
	}
	if !exists {
		return nil, errors.New("author does not exist")
	}

	// Create the post
	now := time.Now()
	result, err := db.Exec(
		"INSERT INTO posts (title, content, author_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
		title, content, authorID, now, now,
	)
	if err != nil {
		return nil, err
	}

	// Get the ID of the new post
	id, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}

	// Get the author's username
	var username string
	err = db.QueryRow("SELECT username FROM users WHERE id = ?", authorID).Scan(&username)
	if err != nil {
		return nil, err
	}

	// Return the new post
	return &Post{
		ID:        int(id),
		Title:     title,
		Content:   content,
		AuthorID:  authorID,
		Author:    username,
		CreatedAt: now,
		UpdatedAt: now,
	}, nil
}

// GetPostByID retrieves a post by ID
func GetPostByID(db *sql.DB, id int) (*Post, error) {
	var post Post
	err := db.QueryRow(`
		SELECT p.id, p.title, p.content, p.author_id, u.username, p.created_at, p.updated_at 
		FROM posts p 
		JOIN users u ON p.author_id = u.id 
		WHERE p.id = ?`,
		id,
	).Scan(
		&post.ID, &post.Title, &post.Content, &post.AuthorID, &post.Author, &post.CreatedAt, &post.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}
	return &post, nil
}

// GetPosts retrieves all posts
func GetPosts(db *sql.DB) ([]*Post, error) {
	rows, err := db.Query(`
		SELECT p.id, p.title, p.content, p.author_id, u.username, p.created_at, p.updated_at 
		FROM posts p 
		JOIN users u ON p.author_id = u.id 
		ORDER BY p.created_at DESC`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []*Post
	for rows.Next() {
		var post Post
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

// UpdatePost updates an existing post
func UpdatePost(db *sql.DB, id int, title, content string, userID int) (*Post, error) {
	// Check if the post exists and belongs to the user
	var authorID int
	err := db.QueryRow("SELECT author_id FROM posts WHERE id = ?", id).Scan(&authorID)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, errors.New("post not found")
		}
		return nil, err
	}

	// Only the author can update their own post
	if authorID != userID {
		return nil, errors.New("unauthorized: you can only update your own posts")
	}

	// Update the post
	now := time.Now()
	_, err = db.Exec(
		"UPDATE posts SET title = ?, content = ?, updated_at = ? WHERE id = ?",
		title, content, now, id,
	)
	if err != nil {
		return nil, err
	}

	// Get the updated post
	return GetPostByID(db, id)
}

// DeletePost deletes a post
func DeletePost(db *sql.DB, id, userID int) error {
	// Check if the post exists and belongs to the user
	var authorID int
	err := db.QueryRow("SELECT author_id FROM posts WHERE id = ?", id).Scan(&authorID)
	if err != nil {
		if err == sql.ErrNoRows {
			return errors.New("post not found")
		}
		return err
	}

	// Only the author can delete their own post
	if authorID != userID {
		return errors.New("unauthorized: you can only delete your own posts")
	}

	// Delete the post
	_, err = db.Exec("DELETE FROM posts WHERE id = ?", id)
	if err != nil {
		return err
	}

	return nil
}

// GetPostsByAuthor retrieves all posts by a specific author
func GetPostsByAuthor(db *sql.DB, authorID int) ([]*Post, error) {
	rows, err := db.Query(`
		SELECT p.id, p.title, p.content, p.author_id, u.username, p.created_at, p.updated_at 
		FROM posts p 
		JOIN users u ON p.author_id = u.id 
		WHERE p.author_id = ? 
		ORDER BY p.created_at DESC`,
		authorID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []*Post
	for rows.Next() {
		var post Post
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