import { useState } from 'react';
import styles from './CommentManager.module.css';
import { addComment } from '../../helpers/blog-requests';

type CommentManagerProps = {
    comments: string[];
    id: string;
    baseUrl: string;
}

export default function CommentManager({ comments, id, baseUrl }: CommentManagerProps): JSX.Element {
    const [comment, setComment] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if(!comment.trim()){
          setError(true);
          return;
        }
        comments.push(comment);
        setComment('');

        try{
           await addComment(comment, id);
        }
        catch(e){
          comments.pop();
        }
      };

      return (
        <div className={styles['comment-wrapper']}>
          <form onSubmit={handleSubmit} className={styles["comment-form"]}>
            <div className={styles["comment-input-area"]}>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
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