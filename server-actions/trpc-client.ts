// import { createTRPCClient, httpBatchLink } from '@trpc/client';
// import type { AnyRouter } from '@trpc/server';

// export function getServerActions<T extends AnyRouter>(baseUrl: string) {
//   const trpc = createTRPCClient<T>({
//     links: [
//       httpBatchLink({
//         url: `${baseUrl}/api/trpc`,
//       }),
//     ],
//   });

//   return {
//     async getHello(str: string) {
//       return await trpc.getHello.mutate(str);
//     },
//   };
// }
