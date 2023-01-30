import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://vtbhhjivatbtlaxtnveh.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey as string);

export { supabase };

