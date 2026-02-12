import app from "./app";
import { prisma } from "./lib/prisma";
const PORT = process.env.PORT || 5000;
async function main() {
    try {
        await prisma.$connect();
        console.log("Connected to database successfully");
        app.listen(PORT, () => {
            console.log(`Servr id running on port ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
        await prisma.$disconnect();
        process.exit(1);
    }
}
main();
