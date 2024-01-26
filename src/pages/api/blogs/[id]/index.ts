import type { APIRoute } from 'astro'
import { blogService } from '../../../../lib/blog.service';

export const PATCH: APIRoute = async ({ params, request }) => {
  const blogData = await request.json();
  const id = params.id;
  console.log('id: ', id);
  
  if(id) {
    const blog = await blogService.createOrUpdateBlog(id, blogData);
    return new Response(
      JSON.stringify({
          blog
      }),
    )
  }
  return new Response(
    JSON.stringify({
      error: 'No id provided',
    }), 
    { status: 404 }
  )
}
export const ALL: APIRoute = ({ request }) => {
  return new Response(
    JSON.stringify({
      message: `This was a ${request.method}!`,
    }),
  );
};