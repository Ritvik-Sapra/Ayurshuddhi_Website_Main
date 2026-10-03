"use client";

import { useState } from "react";
import type { FieldPath, FieldValues, UseFormSetError } from "react-hook-form";
import type { FormResult } from "@/shared/schemas/result";

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
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as FormResult;
      if (result.ok) {
        setStatus("sent");
        return;
      }
      for (const [field, messages] of Object.entries(result.fieldErrors ?? {})) {
        const message = messages?.[0];
        if (message) setError(field as FieldPath<T>, { message });
      }
      setServerError(result.message);
    } catch {
      setServerError("We couldn't send your request. Check your connection and try again.");
    }
  }

  return { status, setStatus, serverError, submit };
}
