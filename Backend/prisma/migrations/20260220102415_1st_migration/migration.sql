-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Transgender');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Unlisted', 'Public', 'Private');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "channelName" TEXT,
    "bannerUrl" TEXT,
    "profilePicture" TEXT,
    "description" TEXT,
    "subscriberCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Uploads" (
    "uploadId" TEXT NOT NULL,
    "vedioUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "Type" NOT NULL,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "views" INTEGER NOT NULL DEFAULT 0,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Uploads_pkey" PRIMARY KEY ("uploadId")
);

-- AddForeignKey
ALTER TABLE "Uploads" ADD CONSTRAINT "Uploads_uploadId_fkey" FOREIGN KEY ("uploadId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
