import { initTRPC } from '@trpc/server';
import { blogService } from '../lib/blog.service';
import { z } from 'zod';

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  getHello: publicProcedure.query(async () => {
    return { message: 'Hello World!' };
  }),
  updateBlog: publicProcedure
    .input(
      z.object({
        id: z.string(),
        blogData: z.object({
          likes: z.number().optional(),
          comment: z
            .object({
              content: z.string(),
              userName: z.string(),
            })
            .optional(),
        }),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const { id, blogData } = input;
      const blog = await blogService.createOrUpdateBlog(id, blogData);
      return blog;
    }),
});
export type AppRouter = typeof appRouter;
