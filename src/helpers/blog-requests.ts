const baseUrl = import.meta.env.PUBLIC_BASE_URL || process.env.PUBLIC_BASE_URL;
console.log('baseUrl:', baseUrl);
console.log('import PUBLIC_BASE_URL:', import.meta.env.PUBLIC_BASE_URL);
console.log('process PUBLIC_BASE_URL:', process.env.PUBLIC_BASE_URL);


type BlogData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  comments: string[];
  likes: number;
};

function setEndpoint(id: string) {
  const res = `${baseUrl}/blogs/${id}`;
  console.log('url: ',res); 
  return res;
}

export async function addComment(body: unknown, id: string): Promise<{status: number}> {
  const response = await fetch(setEndpoint(id), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      comments: body,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error(errorData.message); 
    throw new Error(`${errorData.message} - error code: ${response.status}`);
  }

  return await response.json();
}
export async function addLike(body: unknown, id: string): Promise<{status: number}>{
  const response = await fetch(`${baseUrl}/blogs/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      likes: body,
    }),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    console.error(errorData.message); 
    throw new Error(`${errorData.message} - error code: ${response.status}`);
  }

  return await response.json()
}

export async function getBlogDataByBlogId( id: string): Promise<BlogData>{
  const response = await fetch(setEndpoint(id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if(!response.ok){
    new Error("Something went wrong");
  }
  return await response.json();
}
