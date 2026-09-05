import { and, desc, eq, inArray, sql } from "drizzle-orm";
import { getDb } from "./client";
import { applications, type Application } from "./schema";

const STATUS_VALUES = [
  "new",
  "in_review",
  "accepted",
  "waitlisted",
  "declined",
  "completed",
] as const;

export type ApplicationStatus = (typeof STATUS_VALUES)[number];

export function isApplicationStatus(value: string): value is ApplicationStatus {
  return (STATUS_VALUES as readonly string[]).includes(value);
}

export { STATUS_VALUES };

/** Newest first, capped at 200 — plenty of headroom for this volume (§10 item 5). */
export async function listApplications(): Promise<Application[]> {
  const db = await getDb();
  return db.select().from(applications).orderBy(desc(applications.createdAt)).limit(200);
}

/**
 * Powers the landing page's live "spots remaining this month" ring —
 * accepted/completed applications submitted in the current calendar month
 * (UTC, matching createdAt's `datetime('now')` default). Uses submission
 * month as a proxy for cohort month; fine given this program's fast
 * review turnaround, not a strict cohort-tracking field.
 */
export async function getAcceptedCountThisMonth(): Promise<number> {
  const db = await getDb();
  const [row] = await db
    .select({ count: sql<number>`count(*)` })
    .from(applications)
    .where(
      and(
        inArray(applications.status, ["accepted", "completed"]),
        sql`strftime('%Y-%m', ${applications.createdAt}) = strftime('%Y-%m', 'now')`,
      ),
    );
  return row?.count ?? 0;
}

export async function getApplicationById(id: string): Promise<Application | undefined> {
  const db = await getDb();
  const [application] = await db
    .select()
    .from(applications)
    .where(eq(applications.id, id))
    .limit(1);
  return application;
}

export interface ReviewUpdate {
  status: ApplicationStatus;
  internalScore: number | null;
  internalNotes: string | null;
  reviewer: string | null;
}

export async function updateApplicationReview(id: string, update: ReviewUpdate): Promise<void> {
  const db = await getDb();
  await db
    .update(applications)
    .set({
      status: update.status,
      internalScore: update.internalScore,
      internalNotes: update.internalNotes,
      reviewer: update.reviewer,
    })
    .where(eq(applications.id, id));
}
