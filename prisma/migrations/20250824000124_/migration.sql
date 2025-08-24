-- CreateEnum
CREATE TYPE "public"."USER_TYPE" AS ENUM ('Employer', 'JobSeeker');

-- CreateEnum
CREATE TYPE "public"."EXPERIENCE" AS ENUM ('Junior', 'Intermediate', 'Senior', 'Lead', 'Principal');

-- CreateEnum
CREATE TYPE "public"."JOB_MODE" AS ENUM ('Onsite', 'Remote', 'Hybrid');

-- CreateEnum
CREATE TYPE "public"."JOB_TYPE" AS ENUM ('Contract', 'FullTime', 'PartTime');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "profile_picture" TEXT,
    "email" TEXT,
    "user_type" "public"."USER_TYPE" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email_verified" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."jobs" (
    "id" TEXT NOT NULL,
    "job_title" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "company_logo" TEXT,
    "company_info" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "salary" INTEGER,
    "job_description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "skills" TEXT,
    "benefits" TEXT,
    "location" TEXT,
    "experience_level" "public"."EXPERIENCE",
    "job_type" "public"."JOB_TYPE",
    "job_mode" "public"."JOB_MODE",
    "mode_of_submission" TEXT,
    "user_id" TEXT NOT NULL,
    "no_of_hires" INTEGER,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "jobs_slug_key" ON "public"."jobs"("slug");

-- AddForeignKey
ALTER TABLE "public"."jobs" ADD CONSTRAINT "jobs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
