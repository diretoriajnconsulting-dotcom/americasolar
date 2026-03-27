/**
 * download-vijai-products.js
 * Baixa as fotos de produto do antigo site Vijai (= Solar América)
 * Uso: node download-vijai-products.js
 */

const https = require('https');
const http  = require('http');
const fs    = require('fs');
const path  = require('path');

const DEST = path.join(__dirname, 'public', 'produtos');
if (!fs.existsSync(DEST)) fs.mkdirSync(DEST, { recursive: true });

const IMAGES = [
  // Fotos de produto (sidebar do antigo site)
  { url: 'https://www.vijai.com.br/br/images/foto01.jpg', dest: 'mono.jpg',   label: 'Transformador Monofásico' },
  { url: 'https://www.vijai.com.br/br/images/foto02.jpg', dest: 'tri.jpg',    label: 'Transformador Trifásico' },
  { url: 'https://www.vijai.com.br/br/images/foto03.jpg', dest: 'amorfo.jpg', label: 'Transformador Metal Amorfo' },
  // Infraestrutura (fábrica — para usar em seções de conteúdo)
  { url: 'https://www.vijai.com.br/br/images/infraestrutura/01.jpg', dest: 'fab-fabrica.jpg',   label: 'Fábrica Vista Interna' },
  { url: 'https://www.vijai.com.br/br/images/infraestrutura/02.jpg', dest: 'fab-fachada.jpg',   label: 'Fachada' },
  { url: 'https://www.vijai.com.br/br/images/infraestrutura/09.jpg', dest: 'fab-producao.jpg',  label: 'Área de Produção' },
  { url: 'https://www.vijai.com.br/br/images/infraestrutura/10.jpg', dest: 'fab-linha.jpg',     label: 'Linha de Montagem' },
  { url: 'https://www.vijai.com.br/br/images/infraestrutura/11.jpg', dest: 'fab-acabamento.jpg',label: 'Acabamento' },
  // Laboratório de qualidade
  { url: 'https://www.vijai.com.br/br/images/qualidade/2.jpg', dest: 'lab-ensaios.jpg',   label: 'Lab. Ensaios Elétricos' },
  { url: 'https://www.vijai.com.br/br/images/qualidade/3.jpg', dest: 'lab-ensaios2.jpg',  label: 'Lab. Ensaios 2' },
  { url: 'https://www.vijai.com.br/br/images/qualidade/4.jpg', dest: 'lab-ensaios3.jpg',  label: 'Lab. Ensaios 3' },
  { url: 'https://www.vijai.com.br/br/images/qualidade/5.jpg', dest: 'lab-testes.jpg',    label: 'Testes de Qualidade' },
  { url: 'https://www.vijai.com.br/br/images/qualidade/6.jpg', dest: 'lab-testes2.jpg',   label: 'Testes de Qualidade 2' },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);
    function makeReq(u) {
      client.get(u, res => {
        if ([301,302,307].includes(res.statusCode)) {
          file.destroy();
          makeReq(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) { reject(new Error('HTTP ' + res.statusCode)); return; }
        res.pipe(file);
        file.on('finish', () => file.close(resolve));
        file.on('error', err => { fs.unlink(dest, () => {}); reject(err); });
      }).on('error', reject);
    }
    makeReq(url);
  });
}

async function main() {
  console.log('⬇  Baixando fotos do antigo site Vijai → Solar América\n');
  for (const img of IMAGES) {
    const out = path.join(DEST, img.dest);
    process.stdout.write(`  ${img.label.padEnd(35)} `);
    try {
      await download(img.url, out);
      const kb = Math.round(fs.statSync(out).size / 1024);
      console.log(`✓  ${kb} KB`);
    } catch (e) {
      console.log(`✗  ${e.message}`);
    }
  }
  console.log('\n✅  Fotos salvas em public/produtos/');
  console.log('   Referência nos cards: /produtos/mono.jpg, /produtos/tri.jpg, etc.\n');
}
main();
