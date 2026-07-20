// src/content/config.ts
import { glob } from "astro/loaders"
import { z } from "astro/zod"
import { defineCollection } from "astro:content"

const askTheLibrarian = defineCollection({
  loader: glob({ base: "./src/collections/atl/", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    author: z.string(),
  }),
})

export const collections = { askTheLibrarian }
