import type { Categories } from "../NewBlog/NewBlog";
import styles from "./BlogDisplay.module.css";

type NewBlogPreviewProps = {
  title: string;
  blogPost: string;
  categories: (keyof Categories)[];
};

export function BlogDisplay({ title, blogPost, categories }: NewBlogPreviewProps) {
  return (
    <div className={styles["new-blog-preview"]}>
      <h1 className={styles["new-blog-preview-title"]}>{title}</h1>
      <div className={styles["new-blog-preview-categories"]}>
        {categories.map((category) => (
          <span key={category} className={styles["new-blog-preview-category"]}>
            {category.toUpperCase()}
          </span>
        ))}
      </div>
      <div className={styles["new-blog-preview-blog-post"]} dangerouslySetInnerHTML={{ __html: blogPost }}></div>
    </div>
  );
}
