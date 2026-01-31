import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // process.env.DATABASE_URL! (bang operator) use korle undefined error ashbe na
    url: process.env.DATABASE_URL!,
  },
});
