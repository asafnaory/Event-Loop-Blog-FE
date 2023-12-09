import React, { useState } from 'react';
import styles from './LikeManager.module.css';
import { useLocalStorage } from '../react-hooks/useLocalStorage';
import confetti from 'canvas-confetti';

interface LikeManagerProps {
    id: string;
    initialLikes?: number;
}

export default function LikeManager({ initialLikes = 0, id }: LikeManagerProps): JSX.Element {
    const baseUrl = process.env.PUBLIC_BASE_URL;
    const [isLiked, setIsLiked] = useLocalStorage(id, false)
    const [likes, setLikes] = useState(initialLikes);

    const handleLike = async () => {
      confetti({
        particleCount: 150,
        spread: 60
      });
      
        const newLikes = likes + 1;
        setLikes(newLikes);
        setIsLiked(true);
    
       const response = await fetch(`${baseUrl}/blogs/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            likes: newLikes,
          }),
        });
        if (response.status !== 204) {
          setLikes(likes);
        }

      };

    return (
        <button disabled={isLiked} className={styles.button} onClick={handleLike}>
             <span>🎉</span>
            <span> Like {likes}</span>
        </button>
    );
};
