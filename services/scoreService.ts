import { ref, push, onValue, query, orderByChild } from 'firebase/database';
import { database } from '../firebase/config';


export interface UserScore {
  id?: string;
  userId: string;
  userName: string;
  score: number;
  timestamp: number;
}

// Guardar puntuación del usuario
export const saveUserScore = async (userId: string, userName: string, score: number) => {
  try {
    const scoresRef = ref(database, 'scores');
    await push(scoresRef, {
      userId,
      userName,
      score,
      timestamp: Date.now()
    });
    console.log('Puntuación guardada exitosamente');
  } catch (error) {
    console.error('Error guardando puntuación:', error);
  }
};

// Obtener todas las puntuaciones ordenadas
export const getAllScores = (): Promise<UserScore[]> => {
  return new Promise((resolve) => {
    const scoresRef = ref(database, 'scores');
    const scoresQuery = query(scoresRef, orderByChild('score'));
    
    onValue(scoresQuery, (snapshot) => {
      const scores: UserScore[] = [];
      
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          scores.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          } as UserScore);
        });
      }
      
      // Ordenar de mayor a menor puntuación
      scores.sort((a, b) => b.score - a.score);
      resolve(scores);
    });
  });
};

// Obtener puntuaciones de un usuario específico
export const getUserScores = (userId: string): Promise<UserScore[]> => {
  return new Promise((resolve) => {
    const scoresRef = ref(database, 'scores');
    
    onValue(scoresRef, (snapshot) => {
      const scores: UserScore[] = [];
      
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const score = childSnapshot.val();
          if (score.userId === userId) {
            scores.push({
              id: childSnapshot.key,
              ...score
            } as UserScore);
          }
        });
      }
      
      // Ordenar de mayor a menor puntuación
      scores.sort((a, b) => b.score - a.score);
      resolve(scores);
    });
  });
};