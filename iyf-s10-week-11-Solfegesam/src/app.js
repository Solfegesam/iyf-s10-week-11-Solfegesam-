import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "CommunityHub API Running"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts", commentRoutes);

// 404 handler (unmatched routes)
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});

// global error handler (final safety net)
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    error: "Server error",
    details: err.message
  });
});

export default app;