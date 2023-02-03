import { defineCollection, z } from "astro:content"

// See: https://docs.astro.build/en/guides/content-collections/
export const collections = {
  posts: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      tags: z.array(z.string()).optional(),
      publishedAt: z.string().transform((s) => new Date(s)),
      updatedAt: z
        .string()
        .optional()
        .transform((s) => (s ? new Date(s) : undefined)),
      heroImage: z.string().optional(),
      heroImageAlt: z.string().optional(),
      readingTime: z.string().optional(),
    }),
  }),
}
