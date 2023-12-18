import { useState } from 'react';
import styles from './CommentManager.module.css';
import { addComment } from '../../helpers/blog-requests';

type CommentManagerProps = {
    comments: string[];
    setComments: React.Dispatch<React.SetStateAction<string[]>>;
    id: string;
}

export default function CommentManager({ setComments, comments, id }: CommentManagerProps): JSX.Element {
    const [currentComment, setCurrentComment] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if(!currentComment.trim()){
          setError(true);
          return;
        }
        setComments((prevComments: string[]) => [...prevComments, currentComment]);
        setCurrentComment('');
        const response = await addComment(currentComment, id);
        if('error' in response){
          setComments((prevComments: string[]) => prevComments.slice(0, prevComments.length - 1));
          return;
        }
      };

      return (
        <div className={styles['comment-wrapper']}>
          <form onSubmit={handleSubmit} className={styles["comment-form"]}>
            <div className={styles["comment-input-area"]}>
              <textarea
                value={currentComment}
                onChange={(e) => setCurrentComment(e.target.value)}
                onFocus={() => setError(false)}
                className={styles["comment-textarea"]}
                placeholder={'Add a comment...'}
              />
              <button type="submit" className={styles["comment-button"]}>
                Add
              </button>
            </div>
          </form>
          {error && <p className={styles['comment-error']}>You forgot to add the comment text.</p>}
          <div className={styles["comments-display"]}>
            {comments.map((comment, index) => (
              <div key={index} className={styles["comment"]}>
                {comment}
              </div>
            ))}
          </div>
        </div>
      );
}