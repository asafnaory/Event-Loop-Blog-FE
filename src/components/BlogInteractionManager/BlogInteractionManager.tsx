import { useEffect, useState } from "react"
import LikeManager from "../LikeManager/LikeManager";
import CommentManager from "../CommentManager/CommentManager";
import styles from "./BlogInteractionManager.module.css";
import type { BlogWithComments } from "../../lib/types";
// import { block } from 'million/react';

interface BlogInteractionManagerProps {
  blogData: Partial<BlogWithComments> | null;
  id: string;
}
export type Comment = {
  comment: string;
  commenterName: string;
};


const  BlogInteractionManager = ({ id, blogData }: BlogInteractionManagerProps) => {
  console.log('blogData', blogData);
  
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

// const BlogInteractionManagerBlock = block(BlogInteractionManager);
// export default BlogInteractionManagerBlock;
export default BlogInteractionManager;