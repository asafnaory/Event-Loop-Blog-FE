import { useEffect, useState } from "react"
import LikeManager from "../LikeManager/LikeManager";
import CommentManager from "../CommentManager/CommentManager";
import styles from "./BlogInteractionManager.module.css";
import { getBlogDataByBlogId } from "../../helpers/blog-requests";

interface BlogInteractionManagerProps {
  baseUrl: string;
  id: string;
}


export default function BlogInteractionManager({baseUrl, id}: BlogInteractionManagerProps) {
  const [initialLikes, setInitialLikes] = useState(0);
  const [initialComments, setInitialComments] = useState<string[]>([]);

  useEffect(() => {
    const fetchBlogData = async () => {
      const response = await getBlogDataByBlogId(id)    
      const blogData = await response;
      setInitialLikes(blogData.likes);
      setInitialComments(blogData.comments);
      console.log(blogData.comments);
    };
    fetchBlogData();
  }, [])
  
  return (
    <div className={styles["like-and-comment"]}>
      <LikeManager baseUrl={baseUrl} initialLikes={initialLikes} id={id}/>
      <CommentManager
          id={id}
        comments={initialComments}
        />
    </div>
  ) 
}