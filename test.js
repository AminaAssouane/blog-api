// test.js
const prisma = require("./lib/prisma");

async function main() {
  const posts = await prisma.post.findMany({ include: { comments: true } });
  console.log(posts);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
