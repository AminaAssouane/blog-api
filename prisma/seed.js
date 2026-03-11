const bcrypt = require("bcrypt");
const prisma = require("../lib/prisma");
const {
  post1Content,
  post2Content,
  post3Content,
  post4Content,
  post5Content,
} = require("./postContents.js");

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
      title: "Welcome to my blog!",
      content: post1Content,
      image:
        "https://res.cloudinary.com/doepihomb/image/upload/v1773244163/blog1_tmdlcc.jpg",
      published: true,
      userId: user.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: "Staying motivated",
      content: post2Content,
      image:
        "https://res.cloudinary.com/doepihomb/image/upload/v1773244163/blog2_drmxih.jpg",
      published: true,
      userId: user.id,
    },
  });

  const post3 = await prisma.post.create({
    data: {
      title: "How writing tests can save time in the long run",
      content: post3Content,
      image:
        "https://res.cloudinary.com/doepihomb/image/upload/v1773244163/blog3_hvjpyz.jpg",
      published: true,
      userId: user.id,
    },
  });

  const post4 = await prisma.post.create({
    data: {
      title: "Understanding async in JavaScript",
      content: post4Content,
      image:
        "https://res.cloudinary.com/doepihomb/image/upload/v1773244163/blog4_drybyc.jpg",
      published: true,
      userId: user.id,
    },
  });

  const post5 = await prisma.post.create({
    data: {
      title: "Building RESTful APIs with Node and Express",
      content: post5Content,
      image:
        "https://res.cloudinary.com/doepihomb/image/upload/v1773244163/blog5_xwaqdi.jpg",
      published: true,
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
