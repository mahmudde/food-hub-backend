import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function seedAdmin() {
  try {
    console.log("🚀 Admin Seeding Started....");

    const adminData = {
      name: "Super Admin",
      email: "admin@foodhub.com",
      password: "admin1234",
      role: UserRole.ADMIN,
    };

    console.log("🔍 Checking if Admin exists...");

    const existingUser = await prisma.user.findUnique({
      where: { email: adminData.email },
    });

    if (existingUser) {
      console.log("Admin already exists! Skipping...");
      return;
    }

    console.log("Sending request to Better Auth Sign-up API...");

    // Better Auth-এর ডিফল্ট ইমেইল সাইন-আপ এন্ডপয়েন্ট
    const response = await fetch(
      "http://localhost:5000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: adminData.name,
          email: adminData.email,
          password: adminData.password,
        }),
      },
    );

    const result = await response.json();

    if (response.ok) {
      console.log(" Admin created in Better Auth!");

      await prisma.user.update({
        where: { email: adminData.email },
        data: {
          role: adminData.role,
          emailVerified: true,
        },
      });

      console.log("🛡️ Admin Role & Verification status updated!");
      console.log("🎉 SUCCESS: Admin account is ready to use.");
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
