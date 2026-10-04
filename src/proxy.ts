import { NextResponse, type NextRequest } from "next/server";

/** Any path that is not a page: rewriting here renders the branded 404 with a 404 status. */
const NOT_FOUND_PATH = "/_invalid-url";

/**
 * Normalises odd page URLs before routing. Only runs for paths that contain `%` or an
 * upper-case letter (see `config.matcher`), so normal page requests skip it entirely.
 *
 * - Paths Next's router cannot decode (`/%`, `/%E0%A4`, or `%25`, which it decodes twice)
 *   would otherwise crash routing with a bare "Internal Server Error". They get the branded
 *   404 page instead (broken escapes via one redirect to their escaped form).
 * - Upper-case paths (`/Ayurveda`) redirect to the lower-case canonical URL instead of
 *   depending on whether the host's filesystem happens to be case-insensitive.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let decoded: string;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    // Broken escapes (`/%`, `/%E0%A4`) fail in Next's route matcher even after a rewrite, so
    // redirect to the same path with every `%` escaped. That URL is well-formed and lands on
    // the 404 below.
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/%/g, "%25");
    return NextResponse.redirect(url, 308);
  }
  if (decoded.includes("%")) {
    return NextResponse.rewrite(new URL(NOT_FOUND_PATH, request.url));
  }

  // Lower-case the letters but leave percent-escapes (`%2F`, `%E0`) exactly as sent.
  const lower = pathname.replace(/%[0-9a-f]{2}|[A-Z]+/gi, (part) =>
    part.startsWith("%") ? part : part.toLowerCase(),
  );
  if (lower !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = lower;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Page paths (no `_next/`, `api/` or file extension) containing `%` or an upper-case letter.
  matcher: ["/((?!_next/|api/)[^.]*[A-Z%][^.]*)"],
};
