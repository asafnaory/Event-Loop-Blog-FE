// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

const blogsCollection = defineCollection({
  type: 'content', 
  schema:({ image }) => z.object({
    id: z.string(),
    author: z.string(),
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
    image: image().refine((img) => img),
    authorImage: image().refine((img) => img),
   }),
});

const eventsCollection = defineCollection({
  type: 'content', 
  schema:({ image }) => z.object({
    id: z.string(),
    tags: z.array(z.string()),
    link: z.string(),
    about: z.string(),
    date: z.string(),
    time: z.string(),
    where: z.string(),
    image: image().optional().refine((img) => img),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  'blogs': blogsCollection,
  'events': eventsCollection,
};
