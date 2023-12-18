const isProd = import.meta.env.MODE === 'production';
console.log(import.meta.env.MODE);
console.log(import.meta.env.BASE_URL);
console.log(import.meta.env.SITE);
console.log(import.meta.env.ASSETS_PREFIX);
console.log(import.meta.env.PUBLIC_BASE_URL);

export const baseUrl = isProd? 'https://event-loop-blog-be-production.up.railway.app' : 'http://localhost:3000';