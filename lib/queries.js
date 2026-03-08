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

module.exports = { getPosts, postPost };
