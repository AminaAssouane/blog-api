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

module.exports = { getPosts, postPost };
