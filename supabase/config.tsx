import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://xglpaobtlskfotaekjqj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnbHBhb2J0bHNrZm90YWVranFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwOTM2ODYsImV4cCI6MjA2MzY2OTY4Nn0.N9FU0SdBW1mR_XoZurmUQ7JflhFmE7CQfOYJ1k5Byu4')

