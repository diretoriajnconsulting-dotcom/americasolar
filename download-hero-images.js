/**
 * download-hero-images.js
 *
 * Baixa as 3 fotos landscape (1920×1080) para o carrossel hero.
 * Uso: node download-hero-images.js
 * (Não precisa de npm install — usa apenas módulos nativos do Node.js)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Fotos do Unsplash (licença gratuita para uso comercial)
const IMAGES = [
  {
    // Engenheiro trabalhando em torre de transmissão — representa a equipe
    // técnica de campo da Solar América
    url: 'https://images.unsplash.com/photo-1509391265514-544156f068d3?w=1920&h=1080&fit=crop&auto=format&q=85',
    dest: path.join(__dirname, 'public', 'hero-carousel', '1.png'),
    label: 'Slide 1 — Engenheiro / Torre de transmissão',
    credit: 'American Public Power Association (Unsplash)',
  },
  {
    // Vista aérea de fazenda solar — representa energia renovável fotovoltaica
    url: 'https://images.unsplash.com/photo-1641959166358-6d08825fb88f?w=1920&h=1080&fit=crop&auto=format&q=85',
    dest: path.join(__dirname, 'public', 'hero-carousel', '2.png'),
    label: 'Slide 2 — Fazenda solar aérea',
    credit: 'Unsplash — Renewable Energy',
  },
  {
    // Subestação elétrica ao entardecer — representa infraestrutura de energia
    url: 'https://images.unsplash.com/photo-1509390673020-a5b2450e33f1?w=1920&h=1080&fit=crop&auto=format&q=85',
    dest: path.join(__dirname, 'public', 'hero-carousel', '3.png'),
    label: 'Slide 3 — Subestação ao pôr do sol',
    credit: 'American Public Power Association (Unsplash)',
  },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);

    function makeRequest(requestUrl) {
      https.get(requestUrl, (res) => {
        // Seguir redirecionamentos (Unsplash CDN redireciona para signed URLs)
        if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307) {
          file.destroy();
          makeRequest(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) {
          file.destroy();
          reject(new Error(`HTTP ${res.statusCode} para ${requestUrl}`));
          return;
        }
        res.pipe(file);
        file.on('finish', () => file.close(resolve));
        file.on('error', (err) => {
          fs.unlink(dest, () => {});
          reject(err);
        });
      }).on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }

    makeRequest(url);
  });
}

async function main() {
  console.log('🌞 Solar América — Download de fotos para o hero carousel\n');

  for (const img of IMAGES) {
    process.stdout.write(`  ⬇  ${img.label} ... `);
    const start = Date.now();
    try {
      await download(img.url, img.dest);
      const kb = Math.round(fs.statSync(img.dest).size / 1024);
      console.log(`✓  ${kb} KB  (${Date.now() - start}ms)`);
      console.log(`     Crédito: ${img.credit}`);
    } catch (err) {
      console.log(`✗  ERRO: ${err.message}`);
    }
  }

  console.log('\n✅ Pronto! As imagens foram salvas em public/hero-carousel/');
  console.log('   Agora faça git add public/hero-carousel/ && git push para deploy.\n');
}

main();
