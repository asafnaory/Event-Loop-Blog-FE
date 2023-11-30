import { useState } from "react";
import { NewBlogEditor } from "./NewBlogEditor/NewBlogEditor";
import { NewBlogPreview } from "./NewBlogPreview/NewBlogPreview";
//  import { isPreview } from '../../store/store'
// import { useStore } from "@nanostores/react";

export type Categories = {
  javascript: boolean;
  typescript: boolean;
  react: boolean;
  nest: boolean;
  node: boolean;
};

export function NewBlog() {
    // const $isPreview = useStore(isPreview);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [blogPost, setBlogPost] = useState("");
  const [categories, setCategories] = useState<Categories>({
    javascript: false,
    typescript: false,
    react: false,
    nest: false,
    node: false,
  });

  return (
    <>
      {isPreview  ? (
        <NewBlogPreview title={title} blogPost={blogPost} categories={getSelectedCategories(categories)} setIsPreview={setIsPreview}/>
      ) : (
        <NewBlogEditor
          title={title}
          setTitle={setTitle}
          blogPost={blogPost}
          setBlogPost={setBlogPost}
          categories={categories}
          setCategories={setCategories}
          setIsPreview={setIsPreview}
        />
      )}
    </>
  );
}


function getSelectedCategories(categories: Categories): (keyof Categories)[] {
  return Object.entries(categories)
    .filter(([_, selected]) => selected)
    .map(([category, _]) => category) as (keyof Categories)[];
}
