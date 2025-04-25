import { useState, useEffect } from 'react';
import { getUserData } from '../services/firebaseServices';
import { update } from 'firebase/database';
import { User } from 'firebase/auth';

const useUserScore = (user: User | null) => {
  const [userScore, setUserScore] = useState(0);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchUserScore = async () => {
      try {
        const { data: userData } = await getUserData(user.uid);
        setUserScore(userData.score);
      } catch (e) {
        console.error('Error leyendo la puntuación del usuario', e);
      }
    };

    fetchUserScore();
  }, [user]);

  const updateScore = async (newScore: number) => {
    if (user?.uid) {
      try {
        const { ref: userRef, data: userData } = await getUserData(user.uid);
        const currentScore = userData?.score ?? 0;
        if (newScore && newScore > currentScore) {
          await update(userRef, { score: newScore });
          setUserScore(newScore);
        }
      } catch (err) {
        console.error('Error actualizando el puntaje en Firebase:', err);
      }
    }
  };

  return { userScore, updateScore };
};

export default useUserScore;
