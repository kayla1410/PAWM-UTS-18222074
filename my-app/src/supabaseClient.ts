import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vzugvnssyixkijqbuneq.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6dWd2bnNzeWl4a2lqcWJ1bmVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1ODc0NjQsImV4cCI6MjA0NzE2MzQ2NH0.Ti0tfAwx0uuwKSKUJrnT0H98NI1N0N9CmHV9uBrxnlc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
