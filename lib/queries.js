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

async function updatePost(id) {
  const post = await findPostById(id);
}

async function deletePost(postId) {
  return await prisma.post.delete({ where: { id: Number(postId) } });
}

module.exports = { getPosts, postPost, updatePost, deletePost };
