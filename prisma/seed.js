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

  const user = await prisma.user.create({
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
  const post1 = await prisma.post.create({
    data: {
      title: "My First Blog Post",
      content: "Welcome to my blog!",
      published: true,
      userId: user.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: "Learning Full Stack Development",
      content: "Building APIs with Node and Prisma.",
      published: true,
      userId: user.id,
    },
  });

  const post3 = await prisma.post.create({
    data: {
      title: "Draft Post",
      content: "This one is not published yet.",
      published: false,
      userId: user.id,
    },
  });

  console.log("Posts created");

  // 3: Create comments
  await prisma.comment.createMany({
    data: [
      {
        username: "Jess",
        content: "Great post!",
        postId: post1.id,
      },
      {
        username: "dragonDev",
        content: "Very helpful article.",
        postId: post1.id,
      },
    ],
  });

  console.log("Comments created");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
