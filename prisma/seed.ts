import "dotenv/config";
import { prisma } from "../src/lib/prisma";
import { UserRole } from "@prisma/client";

async function mainSeed() {
  try {
    console.log(" Admin Seeding Started....");
    const adminData = {
      name: "Super Admin",
      email: "admin@foodhub.com",
      password: "Admin@12345",
      role: UserRole.ADMIN,
    };

    const existingUser = await prisma.user.findUnique({
      where: { email: adminData.email },
    });

    if (!existingUser) {
      console.log("Creating Admin via Sign-up API...");
      const response = await fetch("http://localhost:5000/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminData),
      });

      if (response.ok) {
        await prisma.user.update({
          where: { email: adminData.email },
          data: { role: adminData.role, emailVerified: true },
        });
        console.log(" Admin account is ready.");
      }
    } else {
      console.log(" Admin already exists! Skipping...");
    }

    console.log("\n Category Seeding Started....");
    const categories = [
      { name: "Biryani", slug: "biryani" },
      { name: "Burgers", slug: "burgers" },
      { name: "Pizza", slug: "pizza" },
      { name: "Main Course", slug: "main-course" },
      { name: "Desserts", slug: "desserts" },
      { name: "Beverages", slug: "beverages" },
      { name: "Chinese", slug: "chinese" },
      { name: "Traditional / Desi", slug: "traditional-desi" },
      { name: "Fast Food", slug: "fast-food" },
    ];

    for (const category of categories) {
      await prisma.category.upsert({
        where: { name: category.name },
        update: {},
        create: {
          name: category.name,
          slug: category.slug,
        },
      });
    }
    console.log("✅ All FoodPanda style categories are ready.");
  } catch (error) {
    console.error(" Seeding error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

mainSeed();
