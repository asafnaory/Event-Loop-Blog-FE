import type { Categories } from "../components/NewBlog/NewBlog";
import type { BlogResponse } from "../types";
const url = "http://localhost:3000/blogs";
// const httpClient = fetch;
type Blog = {
  title: string;
  content: string;
  categories: Categories;
};

export async function getAllBlogs(): Promise<BlogResponse[] | undefined> {
  try {
    const responseJson = await fetch(url);
    const response = await responseJson.json();
    return response;
  } catch (e) {
    console.error(e);
  }
}
export async function getBlogsByCategories(categories: string[]) {
  try {
    const responseJson = await fetch(`${url}?categories=${categories}`);
    const response = await responseJson.json();
    return response;
  } catch (e) {
    console.error(e);
  }
}
export async function createBlog(blogBody: Blog) {
  try {
    const responseJson = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogBody),
    });
    const response = await responseJson.json();
    return response;
  } catch (e) {
    console.error(e);
  }
}
export async function updateBlogs() {}
export async function deleteBlog() {}
