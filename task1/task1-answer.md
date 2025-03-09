# Website Content Management System Plan

## Overview

This document outlines the plan for managing content across our four websites.

## Websites Managed

- [topbarsinbarceolna.com](#)
- [topbarsinspain.com](#)
- [toprestaurantsinparis.com](#)
- [topmarketsinbatyam.com](#)

Each website can have multiple pages (e.g., `topbarsinbarceolna.com/irish`, `topbarsinbarceolna.com/traditional`).

Each page will contain multiple items, with each item having the following fields:

- **Title**
- **Subtitle**
- **Image**

## Proposed Screens

### 1. Dashboard/Home Screen
- Overview and quick access to websites.

### 2. Website Management Screen
- Add, edit, delete websites.

### 3. Pages Management Screen (Per Website)
- Add, edit, delete pages for each website.

### 4. Items Management Screen (Per Page)
- Add, edit, delete items with fields (Title, Subtitle, Image).

### 5. User Management Screen
- Manage users (add, edit, delete).
- Assign permissions per user per website.

## Missing Parts and Solutions

### 1. Content Field Enhancements
- Add optional fields:
  - **Description**
  - **SEO Title**
  - **SEO Description**
  - **Publish Date**
  - **External URL**

### 2. Media Handling
- Implement proper image upload, storage, cropping, resizing, and optimization.

### 3. URL Management
- Slug generation and editing for friendly URLs.

### 4. Audit Logs and Versioning
- Track content changes.
- Provide audit logs and version rollback capability.

## User Permissions and Security

- Secure login/logout.
- Roles:
  - **Admin**
  - **Editor**
  - **Viewer**
- Assignable permissions per user and per website (view, edit, delete).
- User profile management (password and details).

## Next Steps

- Confirm additional fields or specific requirements.
- Decide on the technical stack (front-end and back-end technologies).
- Choose data storage solution (Relational or NoSQL database).

---

**Best Regards, Ram Pakanayev**  

