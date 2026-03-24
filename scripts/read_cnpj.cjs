const fs = require('fs');
const pdf = require('pdf-parse');

try {
  const dataBuffer = fs.readFileSync('CNPJ SOLAR AMÉRICA ATUALIZADO.pdf');
  pdf(dataBuffer).then(function(data) {
      console.log("=== EXTRAÇÃO DO PDF ===");
      console.log(data.text);
      console.log("=======================");
  }).catch(err => {
      console.error("Error internally in pdf-parse:", err);
  });
} catch (e) {
  console.error("Failed to read file:", e);
}
