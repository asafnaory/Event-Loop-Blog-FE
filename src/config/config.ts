const isProd = import.meta.env.MODE === 'production';
console.log('import.meta.env.MODE', import.meta.env.MODE);
console.log('import.meta.env.BASE_URL', import.meta.env.BASE_URL);
console.log('import.meta.env.SITE', import.meta.env.SITE);
console.log('import.meta.env.ASSETS_PREFIX' , import.meta.env.ASSETS_PREFIX);
console.log('import.meta.env.PUBLIC_BASE_URL', import.meta.env.PUBLIC_BASE_URL);

export const baseUrl = import.meta.env.PUBLIC_BASE_URL || 'http://localhost:4321';