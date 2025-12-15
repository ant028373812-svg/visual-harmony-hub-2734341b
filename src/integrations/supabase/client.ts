import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://impqcjqgyzktexjxwxvp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltcHFjanFneXprdGV4anh3eHZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4OTk5OTEsImV4cCI6MjA2NTQ3NTk5MX0.QL1kHa_b2FNYPIFbMjF6cxuQoujKzJGnf4Hm6VQoWvo";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
