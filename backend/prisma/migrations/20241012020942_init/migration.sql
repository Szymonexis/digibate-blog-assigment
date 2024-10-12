-- CreateEnum
CREATE TYPE "Length" AS ENUM ('SHORT', 'MEDIUM', 'LONG');

-- CreateEnum
CREATE TYPE "Structure" AS ENUM ('LIST_FORMAT', 'INTERVIEW_STYLE', 'TUTORIAL', 'STORY');

-- CreateTable
CREATE TABLE "BlogPostData" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "length" "Length" NOT NULL,
    "structure" "Structure" NOT NULL,
    "companyDetailsJSON" JSONB NOT NULL,
    "openAIresponse" TEXT,
    "blogPostId" TEXT,

    CONSTRAINT "BlogPostData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL,
    "html" TEXT NOT NULL,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlogPostData_blogPostId_key" ON "BlogPostData"("blogPostId");

-- AddForeignKey
ALTER TABLE "BlogPostData" ADD CONSTRAINT "BlogPostData_blogPostId_fkey" FOREIGN KEY ("blogPostId") REFERENCES "BlogPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;
