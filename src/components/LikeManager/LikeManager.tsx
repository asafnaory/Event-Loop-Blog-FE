import React from 'react';
import styles from './LikeManager.module.css';
import { useLocalStorage } from '../react-hooks/useLocalStorage';
import confetti from 'canvas-confetti';
import { trpc } from '../../client';
// import { serverActions } from '../../pages/api/trpc/[trpc]';

interface LikeManagerProps {
    id: string;
    likes: number;
    setLikes: React.Dispatch<React.SetStateAction<number>>;
}

export default function LikeManager({likes,setLikes, id }: LikeManagerProps): JSX.Element {
    const [isLiked, setIsLiked] = useLocalStorage(id, false)
    const handleLike = async () => {
        confetti({
          particleCount: 150,
          spread: 60
        });
        const newLikes = likes + 1;
        setLikes(newLikes);
        setIsLiked(true);
        const response = await trpc.updateBlog.mutate({id, blogData: {likes: newLikes}});
        if(!response){
          setLikes(likes);
          setIsLiked(false);
        }
      };

    return (
        <button disabled={isLiked} className={styles.button} onClick={handleLike}>
             <span>🎉</span>
            <span> Like {likes}</span>
        </button>
    );
};
