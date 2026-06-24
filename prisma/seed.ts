import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const db = new PrismaClient();

async function main() {
  try {
    // Delete existing admin user if any
    await db.user.deleteMany({
      where: { email: "admin@example.com" },
    });

    // Create admin user
    const hashedPassword = await hash("admin123", 12);
    
    const adminUser = await db.user.create({
      data: {
        email: "admin@example.com",
        name: "Administrator",
        password: hashedPassword,
      },
    });

    console.log("✅ Admin user created successfully");
    console.log(`📧 Email: ${adminUser.email}`);
    console.log(`🔐 Password: admin123`);
    console.log("\n⚠️  Please change this password after your first login!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

main();
