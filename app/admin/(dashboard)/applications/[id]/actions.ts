"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { isApplicationStatus, updateApplicationReview } from "@/lib/db/queries";

export async function saveReview(id: string, formData: FormData) {
  const status = String(formData.get("status") ?? "");
  if (!isApplicationStatus(status)) {
    throw new Error(`Invalid status: ${status}`);
  }

  const scoreRaw = String(formData.get("internal_score") ?? "").trim();
  const internalScore = scoreRaw === "" ? null : Number(scoreRaw);
  if (internalScore !== null && (!Number.isFinite(internalScore) || internalScore < 0)) {
    throw new Error("Score must be a non-negative number");
  }

  const notesRaw = String(formData.get("internal_notes") ?? "").trim();
  const internalNotes = notesRaw === "" ? null : notesRaw;

  const reviewerRaw = String(formData.get("reviewer") ?? "").trim();
  // Falls back to the Basic Auth username middleware.ts forwards as
  // x-admin-user when the field is left blank, so reviewer attribution
  // doesn't rely on someone remembering to type their own name in.
  const requestHeaders = await headers();
  const adminUser = requestHeaders.get("x-admin-user");
  const reviewer = reviewerRaw !== "" ? reviewerRaw : adminUser;

  await updateApplicationReview(id, { status, internalScore, internalNotes, reviewer });

  revalidatePath("/admin/applications");
  revalidatePath(`/admin/applications/${id}`);
}
