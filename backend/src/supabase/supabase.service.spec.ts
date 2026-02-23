import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL || '',
      process.env.SUPABASE_KEY || ''
    );
  }

  // Updated to use your table: Honorable_Guest
  async getGuestbook() {
    const { data, error } = await this.supabase
      .from('Honorable_Guest') 
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  // Updated to use your table: Honorable_Guest
  async addEntry(name: string, message: string) {
    const { data, error } = await this.supabase
      .from('Honorable_Guest')
      .insert([{ name, message }]);
    
    if (error) throw error;
    return data;
  }
}