import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { baseUrl } from '../config/config';
import type { AppRouter } from '../server';

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${baseUrl}/api/trpc`,
    }),
  ],
});
