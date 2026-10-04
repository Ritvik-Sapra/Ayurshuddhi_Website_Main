"use client";

import { useState } from "react";
import type { FieldPath, FieldValues, UseFormSetError } from "react-hook-form";
import type { FormResult } from "@/shared/schemas/result";

/** Give up on a request that hasn't answered after this long, so the form never hangs. */
const TIMEOUT_MS = 20_000;

const MESSAGES = {
  failed: "We couldn't send your request. Please try again in a moment.",
  offline: "We couldn't send your request. Check your connection and try again.",
  timeout: "This is taking longer than it should. Please try again.",
};

/**
 * Shared submit logic for the booking and contact forms: POSTs JSON to an API route, maps
 * server-side field errors back onto the form, and tracks the success / error state.
 */
export function useFormSubmit<T extends FieldValues>(
  endpoint: string,
  setError: UseFormSetError<T>,
) {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  async function submit(values: T) {
    setServerError(null);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        signal: controller.signal,
      });
      // A proxy error page or an empty body is not JSON; treat it as a plain failure.
      const result = (await response.json().catch(() => null)) as FormResult | null;
      if (result?.ok) {
        setStatus("sent");
        return;
      }
      for (const [field, messages] of Object.entries(result?.fieldErrors ?? {})) {
        const message = messages?.[0];
        if (message) setError(field as FieldPath<T>, { message });
      }
      setServerError(result?.message || MESSAGES.failed);
    } catch {
      setServerError(controller.signal.aborted ? MESSAGES.timeout : MESSAGES.offline);
    } finally {
      clearTimeout(timer);
    }
  }

  return { status, setStatus, serverError, submit };
}
