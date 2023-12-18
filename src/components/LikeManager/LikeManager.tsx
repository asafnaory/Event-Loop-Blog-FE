import React, { useState } from 'react';
import styles from './LikeManager.module.css';
import { useLocalStorage } from '../react-hooks/useLocalStorage';
import confetti from 'canvas-confetti';
import { addLike } from '../../helpers/blog-requests';

interface LikeManagerProps {
    id: string;
    baseUrl: string;
    initialLikes?: number;
}

export default function LikeManager({ initialLikes = 0, id, baseUrl }: LikeManagerProps): JSX.Element {
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
        const response = await addLike(newLikes, id);
        if('error' in response){
          setLikes(likes);
          setIsLiked(false);
          return;
        }
      };

    return (
        <button disabled={isLiked} className={styles.button} onClick={handleLike}>
             <span>🎉</span>
            <span> Like {likes}</span>
        </button>
    );
};
