/**
 * seed-products.js
 * Popula a tabela `products` do Supabase com os dados capturados do
 * antigo site Vijai (= Solar América) — 8 linhas de produto.
 *
 * Uso: node seed-products.js
 * (rode na raiz do projeto, onde o .env.local já existe)
 */

const https = require('https')
const fs    = require('fs')
const path  = require('path')

// ─── Lê as variáveis do .env.local ───────────────────────────────────────────
function loadEnv() {
  const envPath = path.join(__dirname, '.env.local')
  if (!fs.existsSync(envPath)) throw new Error('.env.local não encontrado')
  const lines = fs.readFileSync(envPath, 'utf8').split('\n')
  const env = {}
  for (const line of lines) {
    const [key, ...rest] = line.split('=')
    if (key && rest.length) env[key.trim()] = rest.join('=').trim()
  }
  return env
}

// ─── Requisição REST simples (sem dependências) ───────────────────────────────
function supabaseRequest(url, serviceKey, method, body) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url)
    const data   = body ? JSON.stringify(body) : undefined
    const opts = {
      hostname: parsed.hostname,
      path:     parsed.pathname + parsed.search,
      method,
      headers: {
        'apikey':         serviceKey,
        'Authorization':  `Bearer ${serviceKey}`,
        'Content-Type':   'application/json',
        'Prefer':         'resolution=merge-duplicates,return=minimal',
      },
    }
    if (data) opts.headers['Content-Length'] = Buffer.byteLength(data)

    const req = https.request(opts, (res) => {
      let raw = ''
      res.on('data', (c) => (raw += c))
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ ok: true, status: res.statusCode })
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${raw}`))
        }
      })
    })
    req.on('error', reject)
    if (data) req.write(data)
    req.end()
  })
}

// ─── Catálogo de produtos Vijai / Solar América ───────────────────────────────
// Dados capturados do site https://www.vijai.com.br/br/single.php
// Imagens salvas em public/produtos/ após rodar download-vijai-products.js
const PRODUCTS = [
  {
    name:          'Transformador de Distribuição a Óleo',
    sku:           'SA-OLEO-DIST',
    description:   'Transformadores de distribuição imersos em óleo mineral isolante, trifásicos e monofásicos. Fabricados conforme ABNT NBR 5356. Tensão primária até 34,5 kV, capacidade de 10 kVA a 10.000 kVA. Aplicação em redes de distribuição pública, indústrias e concessionárias. Núcleo de aço-silício de grão orientado, tanque hermético ou com conservador de óleo.',
    is_direct_sale: false,
    image_url:     '/produtos/tri.jpg',
    price:         null,
  },
  {
    name:          'Transformador a Seco (Encapsulado)',
    sku:           'SA-SECO-ENC',
    description:   'Transformadores a seco com enrolamentos encapsulados em resina epóxi ou de classe F/H. Capacidade de 1 kVA a 2.500 kVA. Indicados para instalações internas, shoppings, hospitais e data centers onde não é permitido o uso de óleo. Alta resistência à umidade e agentes químicos. Norma ABNT NBR 5380.',
    is_direct_sale: false,
    image_url:     '/produtos/mono.jpg',
    price:         null,
  },
  {
    name:          'Transformador de Núcleo Metal Amorfo',
    sku:           'SA-AMORFO',
    description:   'Transformadores de núcleo em liga amorfa (metal amorfo), com perdas em vazio até 70% menores que os transformadores convencionais de aço-silício. Excelente para projetos com foco em eficiência energética e sustentabilidade. Vida útil superior e redução significativa na conta de energia ao longo do ciclo de vida do equipamento.',
    is_direct_sale: false,
    image_url:     '/produtos/amorfo.jpg',
    price:         null,
  },
  {
    name:          'Autotransformador Trifásico',
    sku:           'SA-AUTO-TRI',
    description:   'Autotransformadores trifásicos para adequação de tensão entre redes de diferentes padrões (ex.: 380V/220V, 440V/380V). Capacidade de 1 kVA a 10.000 kVA. Construção robusta em aço-carbono, com bobinas de alumínio ou cobre. Conexão estrela (Y) ou delta (D). Norma ABNT NBR 5380.',
    is_direct_sale: false,
    image_url:     '/produtos/tri.jpg',
    price:         null,
  },
  {
    name:          'Autotransformador Monofásico',
    sku:           'SA-AUTO-MONO',
    description:   'Autotransformadores monofásicos para elevação ou redução de tensão. Capacidade até 1.000 kVA. Indicados para alimentação de equipamentos importados, máquinas de solda e sistemas de controle. Alta eficiência e baixo custo de instalação.',
    is_direct_sale: false,
    image_url:     '/produtos/mono.jpg',
    price:         null,
  },
  {
    name:          'Transformador Fotovoltaico (FV)',
    sku:           'SA-FV-SOLAR',
    description:   'Transformadores dedicados a sistemas fotovoltaicos Grid-Tie e Off-Grid. Projetados para suportar as harmônicas geradas pelos inversores solares, com isolação galvânica completa. Conexão delta-estrela aterrada (Dyn11), adequada para sistemas FV. Capacidade de 25 kVA a 2.500 kVA. Compatíveis com inversores das principais marcas do mercado.',
    is_direct_sale: false,
    image_url:     '/produtos/amorfo.jpg',
    price:         null,
  },
  {
    name:          'Transformador Isolador de Comando',
    sku:           'SA-ISOL-CMD',
    description:   'Transformadores isoladores para painéis de controle, circuitos de comando e sistemas de automação industrial. Potência de 50 VA a 10 kVA. Tensões de entrada e saída configuráveis. Proteção contra transientes e ruídos eletromagnéticos. Conformes com IEC 61558-2-4 e ABNT equivalente. Linha industrial robusta para ambiente fabril.',
    is_direct_sale: true,
    image_url:     '/produtos/mono.jpg',
    price:         null,
  },
  {
    name:          'Transformador de Saída para Inversores (VFD)',
    sku:           'SA-VFD-OUT',
    description:   'Transformadores de saída especiais para inversores de frequência (VFD/VSD). Suportam elevadas taxas de distorção harmônica (THD) e dV/dt. Enrolamentos com maior isolação dielétrica e condutor transposto. Aplicados em sistemas de acionamento de motores, elevadores industriais e compressores de grande porte. Capacidade até 5.000 kVA.',
    is_direct_sale: false,
    image_url:     '/produtos/tri.jpg',
    price:         null,
  },
]

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🔌 Solar América — Seed de Produtos no Supabase\n')

  const env        = loadEnv()
  const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL']
  const serviceKey  = env['SUPABASE_SERVICE_ROLE_KEY']

  if (!supabaseUrl || !serviceKey) {
    throw new Error('Variáveis NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não encontradas no .env.local')
  }

  const endpoint = `${supabaseUrl}/rest/v1/products`

  let success = 0
  let errors  = 0

  for (const product of PRODUCTS) {
    process.stdout.write(`  ${product.name.padEnd(50)} `)
    try {
      await supabaseRequest(endpoint, serviceKey, 'POST', product)
      console.log('✓')
      success++
    } catch (e) {
      console.log(`✗  ${e.message.slice(0, 80)}`)
      errors++
    }
  }

  console.log(`\n✅  Concluído: ${success} produtos inseridos, ${errors} erros.`)
  if (errors === 0) {
    console.log('   Acesse /catalogo para ver os produtos publicados.\n')
  } else {
    console.log('   Verifique os erros acima. Produtos com SKU duplicado são ignorados (já existem).\n')
  }
}

main().catch((err) => {
  console.error('\n❌ Erro fatal:', err.message)
  process.exit(1)
})
