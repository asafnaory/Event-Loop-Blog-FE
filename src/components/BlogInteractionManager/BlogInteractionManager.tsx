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
  console.log('BlogInteractionManager rendered!');
  const [initialLikes, setInitialLikes] = useState(0);
  const [initialComments, setInitialComments] = useState<string[]>([]);

  useEffect(() => {
    const fetchBlogData = async () => {
      const response = await getBlogDataByBlogId(id)    
      if('error' in response){
        return;
      }
      if(response.success.data.likes){
        setInitialLikes(response.success.data.likes);
      }
      if(response.success.data.comments){
        setInitialComments(response.success.data.comments);
      }
      console.log('BlogInteractionManager fetched blog data!', response.success.data.comments, response.success.data.likes);
      
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