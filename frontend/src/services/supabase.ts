import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qngyagrjbgifjfufgqsu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuZ3lhZ3JqYmdpZmpmdWZncXN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1OTA0MDQsImV4cCI6MjA1NDE2NjQwNH0.b9gZ0hGjqwMCkgomRtscpy0KM3n9cAYkfVtW-mJm9BI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
