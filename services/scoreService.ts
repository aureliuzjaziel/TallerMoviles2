import { supabase } from '../supabase/config';

export interface UserScore {
  id?: number;
  user_id: string;
  user_name: string;
  score: number;
  created_at?: string;
}

// Create scores table first in Supabase with these columns:
// id (bigint, auto-increment, primary key)
// user_id (uuid, references auth.users)
// user_name (text)
// score (integer)
// created_at (timestamp with time zone, default now())

// Guardar puntuación del usuario
export const saveUserScore = async (userId: string, userName: string, score: number) => {
  try {
    const { data, error } = await supabase
      .from('scores')
      .insert([
        { 
          user_id: userId,
          user_name: userName,
          score: score
        }
      ])
      .select();

    if (error) throw error;

    console.log('Puntuación guardada exitosamente:', data);
    return data;
  } catch (error) {
    console.error('Error guardando puntuación:', error);
    throw error;
  }
};

// Obtener todas las puntuaciones ordenadas (de mayor a menor)
export const getAllScores = async (limit?: number): Promise<UserScore[]> => {
  try {
    let query = supabase
      .from('scores')
      .select('*')
      .order('score', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data as UserScore[];
  } catch (error) {
    console.error('Error obteniendo puntuaciones:', error);
    throw error;
  }
};

// Obtener puntuaciones de un usuario específico (ordenadas de mayor a menor)
export const getUserScores = async (userId: string, limit?: number): Promise<UserScore[]> => {
  try {
    let query = supabase
      .from('scores')
      .select('*')
      .eq('user_id', userId)
      .order('score', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data as UserScore[];
  } catch (error) {
    console.error('Error obteniendo puntuaciones del usuario:', error);
    throw error;
  }
};

// Obtener el ranking global con información de usuarios
export const getScoreRanking = async (limit: number = 10): Promise<UserScore[]> => {
  try {
    const { data, error } = await supabase
      .from('scores')
      .select(`
        *,
        user:user_id (email, metadata)
      `)
      .order('score', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return data as UserScore[];
  } catch (error) {
    console.error('Error obteniendo ranking:', error);
    throw error;
  }
};