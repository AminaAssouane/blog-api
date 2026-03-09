const bcrypt = require("bcrypt");
const prisma = require("../lib/prisma");

async function main() {
  const existingUser = await prisma.user.findUnique({
    where: { username: "admin" },
  });

  if (existingUser) {
    console.log("Author already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.create({
    data: {
      firstName: "Amina",
      lastName: "Assouane",
      username: "admin",
      email: "admin@blogapi.com",
      passwordHash: hashedPassword,
    },
  });

  console.log("Author created");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
