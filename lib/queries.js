const prisma = require("./prisma");

// AUTH
async function getUserByUsername(username) {
  return await prisma.user.findUnique({ where: { username } });
}

// POSTS
async function getPosts() {
  return await prisma.post.findMany({
    where: { published: true },
    include: { comments: true },
    orderBy: { id: "desc" },
  });
}

async function postPost(post) {
  return await prisma.post.create({
    data: {
      title: post.title,
      content: post.content,
      image: post.image,
      userId: post.userId,
    },
  });
}

async function getPostById(id) {
  return await prisma.post.findUnique({
    where: { id: Number(id) },
    include: { comments: true },
  });
}

async function updatePost(postId, title, content, published) {
  const post = await getPostById(Number(postId));
  if (!post) throw new Error("Post not found");

  return await prisma.post.update({
    where: { id: Number(postId) },
    data: {
      title: title ?? post.title,
      content: content ?? post.content,
      published: published ?? post.published,
    },
  });
}

async function deletePost(postId) {
  const post = await getPostById(Number(postId));
  if (!post) throw new Error("Post not found");
  return await prisma.post.delete({ where: { id: Number(postId) } });
}

// COMMENTS
async function getComments(postId) {
  return await prisma.comment.findMany({ where: { postId: Number(postId) } });
}

async function createComment(postId, username, content) {
  return await prisma.comment.create({
    data: {
      postId,
      username,
      content,
    },
  });
}

async function deleteComment(commentId) {
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment) throw new Error("Comment not found");
  return await prisma.comment.delete({ where: { id: commentId } });
}

module.exports = {
  getUserByUsername,
  getPosts,
  postPost,
  updatePost,
  deletePost,
  getPostById,
  getComments,
  createComment,
  deleteComment,
};
