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

  // Changed 'Honorable_Guest' to lowercase 'honorable_guest'
  async getGuestbook() {
    const { data, error } = await this.supabase
      .from('honorable_guest') 
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  // Changed 'Honorable_Guest' to lowercase 'honorable_guest'
  async addEntry(name: string, message: string) {
    const { data, error } = await this.supabase
      .from('honorable_guest')
      .insert([{ name, message }]);
    
    if (error) {
       console.error("SUPABASE ERROR:", error.message);
       throw error;
    }
    return data;
  }
}