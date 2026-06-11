/**
 * Renders a JSON-LD structured-data block. Server component — safe to drop into
 * any layout.tsx so the markup lands in the server-rendered HTML (where Google
 * reads it). Render one per schema object.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inject; no user input is interpolated.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
