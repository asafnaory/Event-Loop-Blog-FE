import { BlogDisplay } from "../../BlogDisplay/BlogDisplay";
import { EditorButton } from "../../EditorButton/EditorButton";
import type { Categories } from "../NewBlog";
import styles from "./NewBlogPreview.module.css";
 import { isPreview } from '../../../store/store'
// import { useStore } from "@nanostores/react";

type NewBlogPreviewProps = {
  title: string;
  blogPost: string;
  categories: (keyof Categories)[];
  setIsPreview: (isPreview: boolean) => void;
};

export function NewBlogPreview({ title, blogPost, categories, setIsPreview }: NewBlogPreviewProps) {
  return (
    <>
      {shouldDisplayPreview() ? (
        <BlogDisplay title={title} blogPost={blogPost} categories={categories} />
      ) : (
        <div className={styles["new-blog-preview-placeholder"]}>
          <p>You need to write a blog in order to preview</p>
        </div>
      )}
      <div className={styles["new-blog-preview-button"]}>
        <EditorButton text={"Back"} onClick={() => setIsPreview(false)} />;
      </div>
    </>
  );

  function shouldDisplayPreview(): boolean {
    return Boolean(title) && Boolean(blogPost) && Object.values(categories).some((category) => category);
  }
}
