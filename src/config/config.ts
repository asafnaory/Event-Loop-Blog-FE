const isProd = import.meta.env.MODE === 'production';
export const baseUrl = isProd? 'https://event-loop-blog-be.railway.internal' : 'http://localhost:3001';