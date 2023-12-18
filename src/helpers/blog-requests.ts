import { baseUrl } from "../config/config";
console.log('baseUrl:', baseUrl);

type BlogData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  comments: string[];
  likes: number;
};

type DataOrError = { success: {data: BlogData} } | { error: Error, }
type SuccessOrError = { success: {status: number} } | { error: Error, }

function setEndpoint(id: string) {
  const res = `${baseUrl}/blogs/${id}`;
  console.log('url: ',res); 
  return res;
}

export async function addComment(body: unknown, id: string): Promise<SuccessOrError> {
  let returnValue = {}
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
    returnValue = {error:  new Error(`${errorData.message} - error code: ${response.status}`)}; 

  }
  else {
    returnValue = {success: {status: await response.json()}}
  }
  return returnValue as SuccessOrError;
}
export async function addLike(body: unknown, id: string): Promise<SuccessOrError>{
  let returnValue = {}
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
    console.log(`${errorData.message} - error code: ${response.status}`);
    returnValue = {error:  new Error(`${errorData.message} - error code: ${response.status}`)}; 
  }
  else {
    returnValue = {success: {status: await response.json()}}
  }
  return returnValue as SuccessOrError;
}

export async function getBlogDataByBlogId(id: string): Promise<DataOrError>{
  let returnValue = {}
  const response = await fetch(setEndpoint(id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if(!response.ok){
    console.log("Something went wrong", response.status);
    returnValue = {error:  new Error(`error code: ${response.status}`)}; 
  }
  else {
    returnValue = {success: {status: await response.json()}}
  }
  return returnValue as DataOrError;
}
