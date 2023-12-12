import { useEffect, useState } from "react"
import LikeManager from "../LikeManager/LikeManager";
import CommentManager from "../CommentManager/CommentManager";
import styles from "./BlogInteractionManager.module.css";

interface BlogInteractionManagerProps {
  baseUrl: string;
  id: string;
}
interface BlogData {
  likes: number;
  comments: string[];
}

export default function BlogInteractionManager({baseUrl, id}: BlogInteractionManagerProps) {
  const [initialLikes, setInitialLikes] = useState(0);
  const [initialComments, setInitialComments] = useState<string[]>([]);

  useEffect(() => {
    const fetchBlogData = async () => {
  const response = await fetch(`${baseUrl}/blogs/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
      if (response.ok) {
        const blogData: BlogData = await response.json();
        setInitialLikes(blogData.likes);
        setInitialComments(blogData.comments);
      }
    };
    fetchBlogData();
  }, [])
  
  return (
    <div className={styles["like-and-comment"]}>
      <LikeManager baseUrl={baseUrl} initialLikes={initialLikes} id={id}/>
      <CommentManager
        baseUrl={baseUrl} 
        id={id}
        comments={initialComments}
        />
    </div>
  ) 
}