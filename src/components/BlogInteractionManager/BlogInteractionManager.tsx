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
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<string[]>([]);
  const [commenterName, setCommenterName] = useState<string>();

  useEffect(() => {
    const fetchBlogData = async () => {
      const response = await getBlogDataByBlogId(id)    
      if('error' in response){
        return;
      }
      if(response.success.data.likes){
        setLikes(response.success.data.likes);
      }
      if(response.success.data.comments){
        setComments(response.success.data.comments);
      }
      console.log('BlogInteractionManager fetched blog data!', response.success.data.comments, response.success.data.likes);
      
    };
    fetchBlogData();
  }, [comments, commenterName])
  
  return (
    <div className={styles["like-and-comment"]}>
      <LikeManager likes={likes} setLikes={setLikes} id={id}/>
      <CommentManager
          id={id}
          comments={comments}
          setComments={setComments}
          commenterName={commenterName}
          setCommenterName={setCommenterName}
        />
    </div>
  ) 
}