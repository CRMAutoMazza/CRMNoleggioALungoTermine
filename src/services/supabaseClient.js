import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mcxbcxtwtloinifjwfeq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jeGJjeHR3dGxvaW5pZmp3ZmVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxMzA2NTMsImV4cCI6MjA4MTcwNjY1M30.MlzOxkTqqJPKUV_Vu7L_CkPlofy30XG9nnQCz1OlBHA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
