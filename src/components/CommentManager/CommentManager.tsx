import { useState } from 'react';
import styles from './CommentManager.module.css';

type CommentManagerProps = {
    comments: string[];
    id: string;
}

export default function CommentManager({ comments, id }: CommentManagerProps): JSX.Element {
    const baseUrl = process.env.PUBLIC_BASE_URL;
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
      
        const response = await fetch(`${baseUrl}/blogs/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            comments: comments,
          }),
        });
        if (response.status !== 204) {
          comments.pop();
        }
      };

      return (
        <div className={styles['comment-wrapper']}>
          <form onSubmit={handleSubmit} className={styles["comment-form"]}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onFocus={() => setError(false)}
              className={styles["comment-textarea"]}
              placeholder={'Add a comment...'}
            />
            <button type="submit" className={styles["comment-button"]}>
              &#8594;
            </button>
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