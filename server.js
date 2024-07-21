const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/download', (req, res) => {
  const { url, format } = req.body;
  exec(`node download.js "${url}" "${format}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro: ${error.message}`);
      return res.status(500).json({ error: 'Erro ao baixar o vídeo.' });
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).json({ error: 'Erro ao baixar o vídeo.' });
    }
    console.log(`stdout: ${stdout}`);
    res.json({ message: 'Download iniciado.' });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
