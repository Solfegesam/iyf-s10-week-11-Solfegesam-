import express from "express";

import {
  getComments,
  createComment,
  deleteComment
} from "../controllers/commentsController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/:postId/comments",
  getComments
);

router.post(
  "/:postId/comments",
  protect,
  createComment
);

router.delete(
  "/:postId/comments/:commentId",
  protect,
  deleteComment
);

export default router;