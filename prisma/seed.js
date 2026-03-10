const bcrypt = require("bcrypt");
const prisma = require("../lib/prisma");

async function main() {
  // 1: Create user (admin)
  const existingUser = await prisma.user.findUnique({
    where: { username: "admin" },
  });

  if (existingUser) {
    console.log("Author already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("admin", 10);

  await prisma.user.create({
    data: {
      firstName: "Amina",
      lastName: "Assouane",
      username: "admin",
      email: "admin@admin.com",
      passwordHash: hashedPassword,
    },
  });

  console.log("Author created");

  // 2: Create posts
  const posts = await prisma.post.createMany({
    data: [
      {
        title: "My First Blog Post",
        content: "Welcome to my blog!",
        published: true,
        authorId: user.id,
      },
      {
        title: "Learning Full Stack Development",
        content: "Building APIs with Node and Prisma.",
        published: true,
        authorId: user.id,
      },
      {
        title: "Draft Post",
        content: "This one is not published yet.",
        published: false,
        authorId: user.id,
      },
    ],
  });

  console.log("Posts created");

  // 3: Create comments
  await prisma.comment.createMany({
    data: [
      {
        username: "Jess",
        content: "Great post!",
        postId: 1,
      },
      {
        username: "dragonDev",
        content: "Very helpful article.",
        postId: 1,
      },
    ],
  });

  console.log("Comments created");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
