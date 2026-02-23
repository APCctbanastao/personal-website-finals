import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class GuestbookService {
  private supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_KEY || ''
  );

  async getAllEntries() {
    const { data } = await this.supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });
    return data || [];
  }

  async createEntry(name: string, message: string) {
    return await this.supabase.from('guestbook').insert([{ name, message }]);
  }

  async deleteEntry(id: string) {
    return await this.supabase.from('guestbook').delete().eq('id', id);
  }
}