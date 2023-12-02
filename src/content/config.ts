// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

const uuidSchema = z.string().refine(value => uuidRegex.test(value), {
  message: "Invalid UUID",
});

const blogsCollection = defineCollection({
  type: 'content', 
  schema: z.object({
    id: z.string(),
    author: z.string(),
    title: z.string(),
    tags: z.array(z.string()),
    image: z.string(),
    authorImage: z.string().optional()
  }),
});

const eventsCollection = defineCollection({
  type: 'content', 
  schema: z.object({
    id: z.string(),
    tags: z.array(z.string()),
    link: z.string(),
    about: z.string(),
    date: z.string(),
    time: z.string(),
    where: z.string(),
    image: z.string(),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  'blogs': blogsCollection,
  'events': eventsCollection,
};
