-- CreateEnum
CREATE TYPE "public"."USER_TYPE" AS ENUM ('Employer', 'JobSeeker');

-- CreateEnum
CREATE TYPE "public"."EXPERIENCE" AS ENUM ('Junior', 'Intermediate', 'Senior', 'Lead', 'Principal');

-- CreateEnum
CREATE TYPE "public"."JOB_MODE" AS ENUM ('Onsite', 'Remote', 'Hybrid');

-- CreateEnum
CREATE TYPE "public"."JOB_TYPE" AS ENUM ('Contract', 'FullTime', 'PartTime', 'Volunteer', 'Internship');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "public"."accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "jobs_slug_key" ON "public"."jobs"("slug");

-- AddForeignKey
ALTER TABLE "public"."accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."jobs" ADD CONSTRAINT "jobs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
