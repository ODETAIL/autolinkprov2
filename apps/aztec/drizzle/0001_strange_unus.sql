ALTER TABLE "appointments" RENAME COLUMN "time" TO "startTime";--> statement-breakpoint
ALTER TABLE "appointments" ALTER COLUMN "date" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "endTime" time with time zone NOT NULL;