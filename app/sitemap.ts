import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/config";

/**
 * Only the two public marketing pages — /apply and /admin/* are
 * excluded/noindexed per §8, not part of the indexable site.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/programme-terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
