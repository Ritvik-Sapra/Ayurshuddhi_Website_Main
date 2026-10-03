import "server-only";
import type { FormResult } from "@/shared/schemas/result";

export function json(body: FormResult, status = 200): Response {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}
