import { Request, Response } from 'express';
import { supabase } from '../services/supabase';

export const getExercises = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('exercises').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};