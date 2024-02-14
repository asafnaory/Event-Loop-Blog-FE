import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { baseUrl } from '../config/config';
import type { AppRouter } from '../server';

console.log('TRPC baseUrl', baseUrl);
export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${baseUrl}/api/trpc`,
    }),
  ],
});
