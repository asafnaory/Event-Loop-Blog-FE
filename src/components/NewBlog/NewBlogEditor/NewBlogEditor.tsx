import {type ChangeEvent } from "react";
import { TextEditor } from "../../TextEditor/TextEditor";
import styles from './NewBlogEditor.module.css';
import { EditorButton } from "../../EditorButton/EditorButton";
import type { Categories } from "../NewBlog";
import { createBlog } from "../../../helpers/blog-requests";
 import { isPreview } from '../../../store/store'

type NewBlogEditorProps = {
    title: string,
    setTitle: (title: string) => void,
    blogPost: string,
    setBlogPost: (blogPost: string) => void,
    categories: Categories,
    setCategories: (categories: Categories) => void
    setIsPreview: (isPreview: boolean) => void
}

export function NewBlogEditor({title,  setTitle, blogPost,setBlogPost,categories, setCategories , setIsPreview}: NewBlogEditorProps) {

    return (
        <div>
            <div className={styles["blog-info-wrapper"]}>
                <div className={styles.title}>
                    <label htmlFor="title">Blog Post Title</label>
                    <input type="text" id="title" name="title" className={styles.input} value={title} onChange={handleTitleChange}/>
                </div>
            <div className={styles['categories-wrapper']}>
                    <div className={styles['categories-title']}>
                                <label>Category</label>
                    </div>
                        <div className={styles.categories}>
                            <label htmlFor="javascript">
                                <input type="checkbox" checked={categories.javascript} id="javascript" name="category" value="javascript" className={styles.checkbox} onChange={handleCategoryChange}/>
                                JavaScript
                            </label>
                            <label htmlFor="typescript">
                                <input type="checkbox" checked={categories.typescript} id="typescript" name="category" value="typescript" className={styles.checkbox}  onChange={handleCategoryChange}/>
                                TypeScript
                            </label>
                            <label htmlFor="react">
                                <input type="checkbox" checked={categories.react}  id="react" name="category" value="react" className={styles.checkbox}  onChange={handleCategoryChange}/>
                                React JS
                            </label>
                            <label htmlFor="nest">
                                <input type="checkbox" checked={categories.nest}  id="nest" name="category" value="nest" className={styles.checkbox}  onChange={handleCategoryChange}/>
                                Nest JS
                            </label>
                            <label htmlFor="node">
                                <input type="checkbox" checked={categories.node}  id="node" name="category" value="node" className={styles.checkbox}  onChange={handleCategoryChange}/>
                                Node JS
                            </label>
                        </div>
                    </div>
                </div>
            <TextEditor blogPost={blogPost} setBlogPost={setBlogPost}/>
            <div className={styles.buttons}>
                <EditorButton text={"Submit Blog"} onClick={postBlog} />;
          <EditorButton text={ "Preview" } onClick={ () => setIsPreview(true) } />;
            </div>
        </div>
    );

    function handleCategoryChange(event: React.ChangeEvent<HTMLInputElement>) {
        const category = event.target.value;
        const isChecked = event.target.checked;
        setCategories({...categories, [category]: isChecked});
      }

      function handleTitleChange (event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
      };

      async function postBlog(): Promise<Response> {
        const request = {
            title,
            content: blogPost,
            categories
        }
        return createBlog(request);

      }
}