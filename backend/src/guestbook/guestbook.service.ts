import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class GuestbookService {
  private supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_KEY || ''
  );

  async getAllEntries() {
    const { data, error } = await this.supabase
      .from('honorable_guest') // Use your actual table name
      .select('*')
      .order('created_at', { ascending: false }); // Ensure this column name is exactly 'created_at' in Supabase
    
    if (error) {
      console.error("Supabase Error:", error.message);
      // Fallback: Try fetching without ordering if 'created_at' is causing the crash
      const fallback = await this.supabase.from('honorable_guest').select('*');
      return fallback.data || [];
    }
    return data || [];
  }

  async createEntry(name: string, message: string) {
    return await this.supabase
      .from('honorable_guest')
      .insert([{ name, message }]);
  }

  async deleteEntry(id: string) {
    return await this.supabase
      .from('honorable_guest')
      .delete()
      .eq('id', id);
  }
}