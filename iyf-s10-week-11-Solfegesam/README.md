# CommunityHub Backend API

A Node.js + Express + MongoDB backend with JWT authentication, user management, posts, and comments.

---

## Features

- User registration & login
- JWT authentication
- Protected routes
- Create, read, update, delete posts
- Like posts
- Add & delete comments
- Ownership-based authorization
- MongoDB persistence
- Mongoose relationships (User ↔ Post ↔ Comment)

---

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- dotenv
- cors

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd iyf-s10-week-11-<your-username>
2. Install Dependencies
npm install
3. Create .env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
4. Run Server
npm run dev
API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
GET	/api/auth/me	Get logged-in user
Posts
Method	Endpoint	Description
GET	/api/posts	Get all posts
GET	/api/posts/:id	Get single post
POST	/api/posts	Create post
PUT	/api/posts/:id	Update post (owner only)
DELETE	/api/posts/:id	Delete post (owner only)
PUT	/api/posts/:id/like	Like post
Comments
Method	Endpoint	Description
GET	/api/posts/:postId/comments	Get comments
POST	/api/posts/:postId/comments	Add comment
DELETE	/api/posts/:postId/comments/:commentId	Delete comment
Authentication

All protected routes require:

Authorization: Bearer <token>
Project Structure
src/
  config/
  controllers/
  middleware/
  models/
  routes/
  utils/
Author

Samuel Barasa