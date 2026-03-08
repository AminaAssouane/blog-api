const prisma = require("./prisma");

async function getPosts() {
  return await prisma.post.findMany({
    where: { published: true },
    include: { comments: true },
  });
}

async function postPost(post, userId) {
  return await prisma.post.create({
    data: {
      title: post.title,
      content: post.content,
      userId: userId,
    },
  });
}

module.exports = { getPosts, postPost };
