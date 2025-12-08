-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('PENDING_SETUP', 'READY', 'SETUP_FAILED');

-- CreateEnum
CREATE TYPE "TriggerType" AS ENUM ('AUTO_INITIAL', 'AUTO_SCHEDULE', 'MANUAL', 'WEBHOOK');

-- CreateEnum
CREATE TYPE "RunStatus" AS ENUM ('PASSED', 'FAILED', 'ERROR');

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "repoUrl" TEXT NOT NULL,
    "defaultBranch" TEXT NOT NULL DEFAULT 'main',
    "stack" TEXT,
    "testCommand" TEXT,
    "localPath" TEXT,
    "status" "ProjectStatus" NOT NULL DEFAULT 'PENDING_SETUP',
    "lastRunId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestRun" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "triggerType" "TriggerType" NOT NULL,
    "ciRunId" TEXT,
    "branch" TEXT NOT NULL,
    "status" "RunStatus" NOT NULL,
    "coverage" DOUBLE PRECISION,
    "testsPassed" INTEGER,
    "testsFailed" INTEGER,
    "rawOutput" TEXT,
    "summary" TEXT,
    "suggestions" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TestRun_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestRun" ADD CONSTRAINT "TestRun_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
