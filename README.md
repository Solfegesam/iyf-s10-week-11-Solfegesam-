<p algn="center"
<img width="1024" height="1536" alt="image" src="https://github.com/user-attachments/assets/7667cf7a-4cea-4584-99c8-9bf932b844c3" />
</p>

CommunityHub API – Week 11 (Database & Authentication)

📌 Overview

CommunityHub API is a backend service built with Node.js, Express, and MongoDB. It provides a RESTful API for managing posts, comments, and users with full authentication and authorization using JWT.

This project demonstrates database integration, secure user authentication, and structured API design.

---

🚀 Features

🔐 Authentication & Authorization

- User registration with validation
- Secure login with JWT
- Password hashing using bcrypt
- Protected routes
- Role-based access control (user/admin)

🗄️ Database (MongoDB + Mongoose)

- Persistent data storage
- Schema validation
- Model relationships:
  - Users ↔ Posts
  - Posts ↔ Comments

📝 Posts

- Create, read, update, delete posts
- Like posts
- Search posts (text index)
- Filter by author
- Pagination & sorting

💬 Comments

- Add comments to posts
- View post comments
- Delete comments

---

🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv

---

📂 Project Structure
```
iyf-s10-week-11-solfegesam/
│
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── postsController.js
│   │   └── commentsController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── Comment.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── posts.js
│   └── app.js
│
├── server.js
├── .env
├── .gitignore
└── README.md
```
---

⚙️ Installation & Setup

1. Clone the Repository

git clone https://github.com/Solfegesam/iyf-s10-week-11-solfegesam.git
cd iyf-s10-week-11-solfegesam

2. Install Dependencies

npm install

3. Configure Environment Variables

Create a ".env" file in the root directory:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
PORT=3000

4. Run the Server

npm run dev

or

node server.js

---

🔗 API Endpoints

Auth Routes

Method| Endpoint| Description
POST| /api/auth/register| Register user
POST| /api/auth/login| Login user
GET| /api/auth/me| Get current user

---

Posts Routes

Method| Endpoint| Description
GET| /api/posts| Get all posts
GET| /api/posts/:id| Get single post
POST| /api/posts| Create post (Protected)
PUT| /api/posts/:id| Update post (Owner only)
DELETE| /api/posts/:id| Delete post (Owner only)
POST| /api/posts/:id/like| Like post

---

Comments Routes

Method| Endpoint| Description
GET| /api/posts/:postId/comments| Get comments
POST| /api/posts/:postId/comments| Add comment
DELETE| /api/posts/:postId/comments/:commentId| Delete comment

---

🔒 Authentication

Protected routes require a Bearer token:

Authorization: Bearer <your_token>

---

📈 Advanced Features Implemented

- Pagination & filtering
- Text search indexing
- Model relationships (populate)
- Custom instance & static methods
- Error handling middleware
- Role-based access control

---

🧪 Testing

You can test endpoints using:

- Postman
- Thunder Client
- Insomnia

---

🚧 Future Improvements

- Refresh tokens for better auth flow
- Rate limiting & security middleware
- Input sanitization
- Logging system (Winston/Morgan)
- Deployment (Render / Railway)

---

👤 Author

Samuel Barasa
GitHub: https://github.com/Solfegesam

---

📜 License

This project is for educational purposes. 
