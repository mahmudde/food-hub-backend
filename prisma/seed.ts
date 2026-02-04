import "dotenv/config";
import { prisma } from "../src/lib/prisma";
import { UserRole } from "@prisma/client";

async function seedAdmin() {
  try {
    console.log("Admin Seeding Started....");

    const adminData = {
      name: "Super Admin",
      email: "admin@foodhub.com",
      password: "Admin@12345",
      role: UserRole.ADMIN,
    };

    console.log(" Checking if Admin exists...");

    const existingUser = await prisma.user.findUnique({
      where: { email: adminData.email },
    });

    if (existingUser) {
      console.log("Admin already exists! Skipping...");
      return;
    }

    console.log("Sending request to Better Auth Sign-up API...");

    const response = await fetch("http://localhost:5000/api/v1/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: adminData.name,
        email: adminData.email,
        password: adminData.password,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Sign-up failed: ${errorText}`);
    }

    const result = await response.json();

    if (response.ok) {
      console.log(" Admin created in Better Auth!");

      console.log(" Admin created in Better Auth!");

      await prisma.user.update({
        where: { email: adminData.email },
        data: {
          role: adminData.role,
          emailVerified: true,
        },
      });

      console.log(" Admin Role & Verification status updated!");
      console.log(" SUCCESS: Admin account is ready to use.");
    } else {
      console.error(" Sign-up failed:", result);
    }
  } catch (error) {
    console.error(" Seeding error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();
