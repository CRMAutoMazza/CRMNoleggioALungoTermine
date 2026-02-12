
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://mcxbcxtwtloinifjwfeq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jeGJjeHR3dGxvaW5pZmp3ZmVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxMzA2NTMsImV4cCI6MjA4MTcwNjY1M30.MlzOxkTqqJPKUV_Vu7L_CkPlofy30XG9nnQCz1OlBHA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
    console.log('--- CHECK SUPABASE REST ---');

    // Check count
    const { count, error: countError } = await supabase
        .from('Lead')
        .select('*', { count: 'exact', head: true });

    if (countError) {
        console.error('Count Error:', countError);
    } else {
        console.log(`Total Leads (REST): ${count}`);
    }

    // Check first lead
    const { data, error } = await supabase
        .from('Lead')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Fetch Error:', error);
    } else {
        console.log('First Lead:', data);
    }
}

main();
