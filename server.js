const express = require('express');
const path = require('path');
const app = express();

// Servir arquivos estáticos (HTML, PDFs, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} Cntrl + C para finalizar o servidor`);
});
