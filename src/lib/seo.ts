import type { Metadata } from "next";
import {
  OG_IMAGE_ALT,
  OG_IMAGE_PATH,
  OG_IMAGE_SIZE,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "./site";

const ogImage = {
  url: OG_IMAGE_PATH,
  width: OG_IMAGE_SIZE.width,
  height: OG_IMAGE_SIZE.height,
  alt: OG_IMAGE_ALT,
};

/**
 * Builds a consistent per-page Metadata object: title, description, a
 * self-referencing canonical, and matching Open Graph + Twitter cards.
 *
 * The OG/Twitter image is supplied automatically by the `app/opengraph-image`
 * and `app/twitter-image` file conventions (inherited site-wide), so it is not
 * set here. `metadataBase` is set once in the root layout.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  /** Route path, e.g. "/criss-cafe". Use "/" for the homepage. */
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path === "/" ? "/" : path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      url: absoluteUrl(path),
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE_PATH],
    },
  };
}

export { SITE_NAME, SITE_URL };
