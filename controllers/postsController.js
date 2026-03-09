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

async function getComments(req, res) {}

async function postComment(req, res) {}

async function deleteComment(req, res) {}

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
