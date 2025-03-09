-- mysql/init.sql
-- Database initialization

-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS blogapp;
USE blogapp;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content LONGTEXT NOT NULL,
    author_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    FOREIGN KEY (author_id) REFERENCES users(id)
);

-- Insert sample users (password hashed from "password")
INSERT INTO users (username, email, password, created_at, updated_at)
VALUES 
    ('admin', 'admin@example.com', '$2a$10$JEBsK1Z0k5mO5MqN/Cq1qO8aH1D6WXvhQ4OCkJgO3C7lZ9JzLMKdG', NOW(), NOW()),
    ('user1', 'user1@example.com', '$2a$10$JEBsK1Z0k5mO5MqN/Cq1qO8aH1D6WXvhQ4OCkJgO3C7lZ9JzLMKdG', NOW(), NOW());

-- Insert sample posts
INSERT INTO posts (title, content, author_id, created_at, updated_at)
VALUES 
    ('Welcome to our Blog', '<p>This is the first post on our blog platform. Welcome everyone!</p>', 1, NOW(), NOW()),
    ('Getting Started with Go', '<p>Go is a statically typed, compiled programming language designed at Google.</p><p>It is syntactically similar to C, but with memory safety, garbage collection, structural typing, and CSP-style concurrency.</p>', 1, NOW(), NOW()),
    ('Introduction to Next.js', '<p>Next.js is a React framework that enables several extra features, including server-side rendering and generating static websites.</p>', 2, NOW(), NOW());