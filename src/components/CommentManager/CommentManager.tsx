import { useState } from 'react';
import styles from './CommentManager.module.css';
import type { Comment } from '../BlogInteractionManager/BlogInteractionManager';
import { trpc } from '../../client';

type CommentManagerProps = {
    comments: Comment[];
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
    id: string;
}

export default function CommentManager({ setComments, comments, id }: CommentManagerProps): JSX.Element {
    const [currentContent, setCurrentContent] = useState('');
    const [currentUserName, setCurrentUserName] = useState('');
    const [error, setError] = useState<string | boolean>(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if(!currentContent.trim()){
          setError('You forgot to add the comment text.');
          return;
        }
        if(!currentUserName|| !currentUserName.trim()){
          setError('You forgot to add your name.');
          return;
        }
        

        setComments((prevComments: Comment[]) => [...prevComments, {content: currentContent, userName: currentUserName}]);
        setCurrentContent('');
        setCurrentUserName('');
        const response = await trpc.updateBlog.mutate({id, blogData: {comment: {content: currentContent, userName: currentUserName}}});
        if(!response){
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
                  value={currentUserName}
                  onChange={(e) => setCurrentUserName(e.target.value)}
                  onFocus={() => setError(false)}
                  className={styles["name-input"]}
                  placeholder={'Your name'}
                  />
                <textarea
                  value={currentContent}
                  onChange={(e) => setCurrentContent(e.target.value)}
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
                  {comment.userName}
                </div>
                {comment.content}
              </div>
            ))}
          </div>
        </div>
      );
}