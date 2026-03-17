-- DropForeignKey
ALTER TABLE "Uploads" DROP CONSTRAINT "Uploads_uploadId_fkey";

-- AddForeignKey
ALTER TABLE "Uploads" ADD CONSTRAINT "Uploads_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
