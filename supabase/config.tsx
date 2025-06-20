import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://vtsmpbtpmvjjuomehdos.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0c21wYnRwbXZqanVvbWVoZG9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwODkwMTIsImV4cCI6MjA2MzY2NTAxMn0.UuQAs280jNUqEi_fb4hxuzhTga2PYFq6xiHt1QQDoqU')