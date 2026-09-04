/**
 * D1 schema — the applications table from docs/IMPLEMENTATION_PLAN.md §4,
 * mapping directly to the brief's Data Model. One record per submission;
 * no applicant accounts.
 */
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const applications = sqliteTable("applications", {
  id: text("id").primaryKey(),
  businessName: text("business_name").notNull(),
  businessType: text("business_type").notNull(),
  yearsOperating: text("years_operating").notNull(),
  currentWebsiteUrl: text("current_website_url"),
  instagramHandle: text("instagram_handle"),
  facebookHandle: text("facebook_handle"),
  activityLevel: text("activity_level"),
  googleProfileUrl: text("google_profile_url"),
  googleReviewCount: integer("google_review_count"),
  servicesDescription: text("services_description").notNull(),
  biggestChallenge: text("biggest_challenge").notNull(),
  contentReadiness: text("content_readiness").notNull(),
  credentials: text("credentials"),
  contactName: text("contact_name").notNull(),
  contactEmail: text("contact_email").notNull(),
  contactPhone: text("contact_phone").notNull(),
  consentTerms: integer("consent_terms", { mode: "boolean" }).notNull(),
  consentFeedback: integer("consent_feedback", { mode: "boolean" }).notNull(),
  status: text("status").notNull().default("new"),
  internalScore: integer("internal_score"),
  internalNotes: text("internal_notes"),
  reviewer: text("reviewer"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(datetime('now'))`),
});

export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;
