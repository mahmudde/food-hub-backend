/*
  Warnings:

  - A unique constraint covering the columns `[address_id]` on the table `provider_profile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "provider_profile" ADD COLUMN     "address_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "provider_profile_address_id_key" ON "provider_profile"("address_id");

-- AddForeignKey
ALTER TABLE "provider_profile" ADD CONSTRAINT "provider_profile_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
