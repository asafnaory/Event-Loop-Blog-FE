import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import type { APIRoute } from 'astro';
import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { initTRPC } from '@trpc/server';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { MutationProcedure } from '@trpc/server/unstable-core-do-not-import';

const t = initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;
function createContext({ req, resHeaders }: FetchCreateContextFnOptions) {
  //   const user = { name: req.headers.get('username') ?? 'anonymous' };
  return { req, resHeaders };
}

export const ALL: APIRoute = ({ request }) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext,
  });
};

type Action = { name: string; fn: (...args: any) => any };

type ActionsToRecord<T extends Action[]> = {
  [K in T[number]['name']]: MutationProcedure<any>;
};

export function createServerActions<T extends Action>(actions: T[]) {
  const routerActions = actions.reduce(
    (acc, action) => {
      return {
        ...acc,
        [action.name]: publicProcedure.mutation(async (opts) => {
          const { input } = opts;
          return await action.fn(input);
        }),
      };
    },
    {} as ActionsToRecord<T[]>,
  );

  return router(routerActions);
}

// const action = {
//   name: 'getHello',
//   fn: function getHello(name: string) {
//     return `Hello ${name}!`;
//   },
// } as const;

// const appRouter = createServerActions([action]);
// export type AppRouter = typeof appRouter;
