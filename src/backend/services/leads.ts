import "server-only";

export type Lead = {
  kind: "booking" | "contact";
  receivedAt: string;
  data: Record<string, unknown>;
};

/**
 * TODO(crm): store the lead in Supabase (or another CRM) once SUPABASE_URL and
 * SUPABASE_SERVICE_ROLE_KEY are set. Until then nothing is persisted.
 */
export async function saveLead(lead: Lead): Promise<void> {
  console.info("[lead:stub]", lead.kind, lead.receivedAt);
}
