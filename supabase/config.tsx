import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://pvyauemetdjaibvrhtuh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2eWF1ZW1ldGRqYWlidnJodHVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNzkwNTAsImV4cCI6MjA2Nzg1NTA1MH0.lC19ooPP03iAZw6IclLGSiAWimhDuiEC853nixxAN5k')

