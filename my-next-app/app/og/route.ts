import { renderOgImage } from "@/src/lib/og";

// Serves the shared 1200×630 Open Graph / Twitter card image at /og.
// force-static: generated once at build and cached, not re-rendered per request.
export const dynamic = "force-static";

export function GET() {
  return renderOgImage();
}
