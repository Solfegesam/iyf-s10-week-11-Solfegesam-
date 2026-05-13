import Post from "../models/Post.js";

const getAllPosts = async (req, res) => {
  try {
    const {
      search,
      sort,
      page = 1,
      limit = 10
    } = req.query;

    let query = {};

    if (search) {
      query.$text = {
        $search: search
      };
    }

    let sortOption = {
      createdAt: -1
    };

    if (sort === "oldest") {
      sortOption = {
        createdAt: 1
      };
    }

    if (sort === "popular") {
      sortOption = {
        likes: -1
      };
    }

    const skip =
      (page - 1) * limit;

    const posts = await Post.find(query)
      .populate(
        "author",
        "username email"
      )
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select:
            "username email"
        }
      })
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    const total =
      await Post.countDocuments(query);

    res.json({
      posts,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(
          total / limit
        )
      }
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const getPostById = async (
  req,
  res
) => {
  try {
    const post =
      await Post.findById(
        req.params.id
      )
        .populate(
          "author",
          "username email"
        )
        .populate({
          path: "comments",
          populate: {
            path: "author",
            select:
              "username email"
          }
        });

    if (!post) {
      return res.status(404).json({
        error: "Post not found"
      });
    }

    res.json(post);
  } catch (error) {
    if (
      error.name === "CastError"
    ) {
      return res.status(400).json({
        error: "Invalid post ID"
      });
    }

    res.status(500).json({
      error: error.message
    });
  }
};

const createPost = async (
  req,
  res
) => {
  try {
    const {
      title,
      content,
      tags
    } = req.body;

    const post =
      await Post.create({
        title,
        content,
        tags,
        author: req.user._id
      });

    await post.populate(
      "author",
      "username email"
    );

    res.status(201).json(post);
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

const updatePost = async (
  req,
  res
) => {
  try {
    const post =
      await Post.findById(
        req.params.id
      );

    if (!post) {
      return res.status(404).json({
        error: "Post not found"
      });
    }

    if (
      post.author.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        error:
          "You can only edit your own posts"
      });
    }

    const {
      title,
      content,
      tags,
      published
    } = req.body;

    post.title =
      title || post.title;

    post.content =
      content || post.content;

    post.tags =
      tags || post.tags;

    if (
      published !== undefined
    ) {
      post.published =
        published;
    }

    await post.save();

    await post.populate(
      "author",
      "username email"
    );

    res.json(post);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const deletePost = async (
  req,
  res
) => {
  try {
    const post =
      await Post.findById(
        req.params.id
      );

    if (!post) {
      return res.status(404).json({
        error: "Post not found"
      });
    }

    if (
      post.author.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        error:
          "You can only delete your own posts"
      });
    }

    await post.deleteOne();

    res.json({
      message:
        "Post deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const likePost = async (
  req,
  res
) => {
  try {
    const post =
      await Post.findById(
        req.params.id
      );

    if (!post) {
      return res.status(404).json({
        error: "Post not found"
      });
    }

    await post.like();

    res.json(post);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

export {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost
};