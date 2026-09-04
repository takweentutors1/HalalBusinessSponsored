import { Badge, type BadgeVariant } from "@/components/ui";
import type { ApplicationStatus } from "@/lib/db/queries";

const VARIANT_BY_STATUS: Record<ApplicationStatus, BadgeVariant> = {
  new: "primary",
  in_review: "warning",
  accepted: "success",
  waitlisted: "warning",
  declined: "error",
  completed: "success",
};

const LABEL_BY_STATUS: Record<ApplicationStatus, string> = {
  new: "New",
  in_review: "In review",
  accepted: "Accepted",
  waitlisted: "Waitlisted",
  declined: "Declined",
  completed: "Completed",
};

export function StatusBadge({ status }: { status: string }) {
  const key = (status in VARIANT_BY_STATUS ? status : "new") as ApplicationStatus;
  return <Badge variant={VARIANT_BY_STATUS[key]}>{LABEL_BY_STATUS[key]}</Badge>;
}
