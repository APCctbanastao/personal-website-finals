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
      .from('honorable_guest')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Supabase Fetch Error:", error.message);
      return [];
    }
    return data || [];
  }

  async createEntry(name: string, message: string) {
    const { data, error } = await this.supabase
      .from('honorable_guest')
      .insert([{ name: name, message: message }]);
    
    if (error) {
      console.error("Supabase Insert Error:", error.message);
    }
    return data;
  }

  async deleteEntry(id: string) {
    const { data, error } = await this.supabase
        .from('honorable_guest')
        .delete()
        .eq('id', id); // This matches the 'id' column from your screenshot

    if (error) {
        console.error("Supabase Redaction Error:", error.message);
        throw new Error(error.message);
  }
  return data;
  }
}