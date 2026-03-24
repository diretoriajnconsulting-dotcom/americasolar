const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProducts() {
  const { data, error } = await supabase.from('products').select('*').limit(5);
  if (error) {
    console.error('Error fetching products:', error);
  } else {
    console.log('Got', data.length, 'products in DB.');
    if (data.length > 0) {
      console.log('Sample product:', JSON.stringify(data[0], null, 2));
    }
  }
}

checkProducts();
