import { defineCollection, z } from 'astro:content';

const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    category: z.enum(['Full-Stack', '3D / Graphics', 'AI / Systems', 'Mobile']),
    featured: z.boolean().default(false),
    date: z.string(),
    role: z.string(),
    liveUrl: z.string().optional(),
    githubUrl: z.string().optional(),
    hologramColor: z.string().default('#00f0ff'),
    coordinates: z.object({
      x: z.number(),
      y: z.number(),
      z: z.number(),
    }).optional(),
  }),
});

export const collections = {
  'case-studies': caseStudies,
};
