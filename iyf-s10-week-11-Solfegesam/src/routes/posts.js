import express from "express";

import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost
} from "../controllers/postsController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/")
  .get(getAllPosts)
  .post(protect, createPost);

router
  .route("/:id")
  .get(getPostById)
  .put(protect, updatePost)
  .delete(protect, deletePost);

router.put(
  "/:id/like",
  protect,
  likePost
);

export default router;