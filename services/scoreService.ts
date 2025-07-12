import { supabase } from '../supabase/config';

export interface UserScore {
  id?: number;
  user_id: string;
  user_name: string;
  score: number;
  created_at?: string;
  avatar_url?: string; // ← Campo para avatar
}

// Create scores table first in Supabase with these columns:
// id (bigint, auto-increment, primary key)
// user_id (uuid, references auth.users)
// user_name (text)
// score (integer)
// created_at (timestamp with time zone, default now())
// avatar_url (text) ← Agregar esta columna también

// Guardar puntuación del usuario (mejorado)
export const saveUserScore = async (userId: string, userName: string, score: number) => {
  try {
    // Obtener datos del usuario incluyendo avatar
    const { data: userData, error: userError } = await supabase.auth.getUser()
    
    if (userError) {
      console.error('Error obteniendo usuario:', userError)
    }
    
    let avatarUrl = null
    if (userData?.user?.user_metadata?.avatar_url) {
      avatarUrl = userData.user.user_metadata.avatar_url
    }

    const { data, error } = await supabase
      .from('scores')
      .insert([
        { 
          user_id: userId,
          user_name: userName,
          score: score,
          avatar_url: avatarUrl // ← Guardar URL del avatar
        }
      ])
      .select();

    if (error) throw error;
    
    console.log('Score guardado con avatar:', data);
    return data;
  } catch (error) {
    console.error('Error guardando score:', error);
    throw error;
  }
};

// Obtener mejores puntuaciones con avatares
export const getTopScores = async (limit: number = 10) => {
  try {
    const { data, error } = await supabase
      .from('scores')
      .select('*')
      .order('score', { ascending: false })
      .limit(limit);

    if (error) throw error;
    
    console.log('Scores obtenidos:', data); // ← Log para debug
    return data as UserScore[];
  } catch (error) {
    console.error('Error obteniendo scores:', error);
    return [];
  }
};

// Obtener scores del usuario actual con avatar
export const getUserScores = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('scores')
      .select('*')
      .eq('user_id', userId)
      .order('score', { ascending: false });

    if (error) throw error;
    
    return data as UserScore[];
  } catch (error) {
    console.error('Error obteniendo scores del usuario:', error);
    return [];
  }
};

// Función auxiliar para obtener el avatar del usuario actual
export const getUserAvatar = async () => {
  try {
    const { data: userData, error } = await supabase.auth.getUser()
    
    if (error || !userData?.user) {
      return null
    }
    
    return userData.user.user_metadata?.avatar_url || null
  } catch (error) {
    console.error('Error obteniendo avatar:', error)
    return null
  }
}

// Función para actualizar un score existente (opcional)
export const updateUserScore = async (scoreId: number, newScore: number) => {
  try {
    const { data, error } = await supabase
      .from('scores')
      .update({ score: newScore })
      .eq('id', scoreId)
      .select();

    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error actualizando score:', error);
    throw error;
  }
};