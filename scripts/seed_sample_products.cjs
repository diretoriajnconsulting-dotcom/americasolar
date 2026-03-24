const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const SAMPLE_PRODUCTS = [
  {
    name: 'Transformador a Seco 750kVA',
    description: 'Transformador trifásico a seco com alta eficiência energética, ideal para indústrias e shoppings. Redução de perdas e maior segurança contra incêndios.',
    sku: 'TRF-SEC-750K',
    price: 45000.00,
    is_direct_sale: false,
    image_url: 'https://images.unsplash.com/photo-1540954388837-de2fb4625b0f?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Inversor String 50kW Trifásico',
    description: 'Inversor solar robusto para usinas de médio porte e instalações comerciais. Monitoramento avançado via Wi-Fi e proteção IP65.',
    sku: 'INV-STR-50K',
    price: 18500.00,
    is_direct_sale: true,
    image_url: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Painel Solar Monocristalino 550W',
    description: 'Módulo fotovoltaico de alta potência com tecnologia Half-Cut. Maior tolerância a sombreamento e durabilidade superior.',
    sku: 'PNL-MONO-550',
    price: 850.00,
    is_direct_sale: true,
    image_url: 'https://images.unsplash.com/photo-1509391366360-5254ee8c4dce?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Subestação Compacta 13.8kV',
    description: 'Subestação de energia blindada, projetada para otimizar espaço e garantir proteção máxima aos componentes de média tensão.',
    sku: 'SUB-CMP-138',
    price: 120000.00,
    is_direct_sale: false,
    image_url: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Cabo Solar Flexível 6mm (Rolo 100m)',
    description: 'Cabo fotovoltaico com isolamento duplo, resistente a UV e intempéries. Segurança e condução perfeita para seu sistema solar.',
    sku: 'CAB-SOL-6MM',
    price: 450.00,
    is_direct_sale: true,
    image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop'
  }
];

async function seedProducts() {
  console.log('Inserting sample products...');
  const { data, error } = await supabase.from('products').insert(SAMPLE_PRODUCTS).select();
  
  if (error) {
    console.error('Error inserting products:', error);
  } else {
    console.log(`Successfully inserted ${data.length} products.`);
  }
}

seedProducts();
