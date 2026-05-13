import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

const getComments = async (
  req,
  res
) => {
  try {
    const comments =
      await Comment.find({
        post: req.params.postId
      })
        .populate(
          "author",
          "username email"
        )
        .sort({
          createdAt: -1
        });

    res.json(comments);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const createComment = async (
  req,
  res
) => {
  try {
    const { content } = req.body;

    const post =
      await Post.findById(
        req.params.postId
      );

    if (!post) {
      return res.status(404).json({
        error: "Post not found"
      });
    }

    const comment =
      await Comment.create({
        content,
        author: req.user._id,
        post: post._id
      });

    post.comments.push(
      comment._id
    );

    await post.save();

    await comment.populate(
      "author",
      "username email"
    );

    res.status(201).json(comment);
  } catch (error) {
    if (
      error.name ===
      "ValidationError"
    ) {
      const messages =
        Object.values(
          error.errors
        ).map(
          (e) => e.message
        );

      return res.status(400).json({
        errors: messages
      });
    }

    res.status(500).json({
      error: error.message
    });
  }
};

const deleteComment = async (
  req,
  res
) => {
  try {
    const comment =
      await Comment.findById(
        req.params.commentId
      );

    if (!comment) {
      return res.status(404).json({
        error:
          "Comment not found"
      });
    }

    if (
      comment.author.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        error:
          "You can only delete your own comments"
      });
    }

    await Post.findByIdAndUpdate(
      comment.post,
      {
        $pull: {
          comments:
            comment._id
        }
      }
    );

    await comment.deleteOne();

    res.json({
      message:
        "Comment deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

export {
  getComments,
  createComment,
  deleteComment
};