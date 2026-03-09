const prisma = require("./prisma");

async function getPosts() {
  return await prisma.post.findMany({
    where: { published: true },
    include: { comments: true },
  });
}

async function postPost(post) {
  return await prisma.post.create({
    data: {
      title: post.title,
      content: post.content,
      userId: post.userId,
    },
  });
}

async function findPostById(id) {
  return await prisma.post.findUnique({
    where: { id },
    include: { comments: true },
  });
}

async function updatePost(postId, title, content, published) {
  const post = await findPostById(Number(postId));
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
  const post = findPostById(Number(postId));
  if (!post) throw new Error("Post not found");
  return await prisma.post.delete({ where: { id: Number(postId) } });
}

module.exports = { getPosts, postPost, updatePost, deletePost };
