/** Shape returned by every form endpoint, read by the client forms. */
export type FormResult =
  { ok: true } | { ok: false; message: string; fieldErrors?: Record<string, string[] | undefined> };
