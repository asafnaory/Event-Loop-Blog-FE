import { Children, useEffect, useState } from "react"
import LikeManager from "../LikeManager/LikeManager";
import CommentManager from "../CommentManager/CommentManager";
import styles from "./BlogInteractionManager.module.css";
import type { BlogWithComments } from "../../lib/types";

interface BlogInteractionManagerProps {
  blogData: Partial<BlogWithComments> | null;
  id: string;
}
export type Comment = {
  content: string;
  userName: string;
};


const  BlogInteractionManager = ({ id, blogData }: BlogInteractionManagerProps) => {
  const [likes, setLikes] = useState(blogData?.likes || 0);
  const [comments, setComments] = useState<Comment[]>(blogData?.comments || []);

  
  return (
    <div className={styles["like-and-comment"]}>
      <LikeManager likes={likes} setLikes={setLikes} id={id}/>
      <CommentManager
          id={id}
          comments={comments}
          setComments={setComments}
        />
    </div>
  ) 
}
export default BlogInteractionManager;