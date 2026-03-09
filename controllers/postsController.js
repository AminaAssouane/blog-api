const db = require("../lib/queries");

async function getPosts(req, res) {
  try {
    const posts = await db.getPosts();
    res.json(posts);
  } catch (error) {
    console.error("Could not get posts : ", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}

async function postPost(req, res) {
  try {
    const post = await db.postPost(req.body);
    res.status(201).json(post);
  } catch (error) {
    console.error("Could not create post : ", error);
    res.status(500).json({ error: "Failed to create post" });
  }
}

async function putPost(req, res) {
  const { postId } = req.params;
  const { title, content, published } = req.body;
  try {
    const updatedPost = await db.updatePost(postId, title, content, published);
    res.json({ message: "Post updated", post: updatedPost });
  } catch (error) {
    console.error(error);
    res
      .status(error.message === "Post not found" ? 404 : 500)
      .json({ error: error.message });
  }
}

async function deletePost(req, res) {
  const { postId } = req.params;
  try {
    const deleted = await db.deletePost(postId);
    res.json({ message: "Post deleted", post: deleted });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Post not found" });
  }
}

async function getPostById(req, res) {
  const { postId } = req.params;
  try {
    const post = await db.getPostById(postId);
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Post not found" });
  }
}

async function getComments(req, res) {
  const { postId } = req.params;
  try {
    const comments = await db.getComments(postId);
    res.json(comments);
  } catch (error) {
    console.error("Could not get comments : ", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
}

async function postComment(req, res) {
  const { postId } = req.params;
  const { username, content } = req.body;
  try {
    const comment = await db.createComment(Number(postId), username, content);
    res.status(201).json(comment);
  } catch (error) {
    console.error("Could not create comment : ", error);
    res.status(500).json({ error: "Failed to create comment" });
  }
}

async function deleteComment(req, res) {
  const { postId, commentId } = req.params;
  try {
    const deleted = await db.deleteComment(Number(postId), Number(commentId));
    res.json({ message: "Comment deleted", post: deleted });
  } catch (error) {
    console.error("Could not delete comment : ", error);
    res.status(404).json({ error: "Comment not found" });
  }
}

module.exports = {
  getPosts,
  postPost,
  putPost,
  deletePost,
  getPostById,
  getComments,
  postComment,
  deleteComment,
};
