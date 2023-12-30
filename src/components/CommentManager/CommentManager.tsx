import { useState } from 'react';
import styles from './CommentManager.module.css';
import { addComment } from '../../helpers/blog-requests';
import type { Comment } from '../BlogInteractionManager/BlogInteractionManager';

type CommentManagerProps = {
    comments: Comment[];
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
    id: string;
}

export default function CommentManager({ setComments, comments, id }: CommentManagerProps): JSX.Element {
    const [currentComment, setCurrentComment] = useState('');
    const [currentCommenterName, setCurrentCommenterName] = useState('');
    const [error, setError] = useState<string | boolean>(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if(!currentComment.trim()){
          setError('You forgot to add the comment text.');
          return;
        }
        if(!currentCommenterName|| !currentCommenterName.trim()){
          setError('You forgot to add your name.');
          return;
        }
        

        setComments((prevComments: Comment[]) => [...prevComments, {comment: currentComment, commenterName: currentCommenterName}]);
        setCurrentComment('');
        setCurrentCommenterName('');
        const response = await addComment({comment: currentComment, commenterName: currentCommenterName}, id);
        if('error' in response){
          setComments((prevComments: Comment[]) => prevComments.slice(0, prevComments.length - 1));
          return;
        }
      };

      return (
        <div className={styles['comment-wrapper']}>
          <form className={styles["comment-form"]}>
            <div className={styles["comment-input-area"]}>
              <div className={styles["comment-textarea-wrapper"]}>
                <input
                  value={currentCommenterName}
                  onChange={(e) => setCurrentCommenterName(e.target.value)}
                  onFocus={() => setError(false)}
                  className={styles["name-input"]}
                  placeholder={'Your name'}
                  />
                <textarea
                  value={currentComment}
                  onChange={(e) => setCurrentComment(e.target.value)}
                  onFocus={() => setError(false)}
                  className={styles["comment-textarea"]}
                  placeholder={'Add a comment...'}
                  />
                </div>
              <button type="button" className={styles["comment-button"]} onClick={handleSubmit} >
                Add
              </button>
            </div>
          </form>
          {error && <p className={styles['comment-error']}>{error}</p>}
          <div className={styles["comments-display"]}>
            {comments.map((comment, index) => (
              <div key={index} className={styles["comment"]}>
                <div className={styles["commenter-name"]}>
                  {comment.commenterName}
                </div>
                {comment.comment}
              </div>
            ))}
          </div>
        </div>
      );
}