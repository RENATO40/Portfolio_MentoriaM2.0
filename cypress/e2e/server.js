import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(__dirname)); // serve index.html, styles.css, script.js

app.listen(3000, () => {
  console.log('Satiro Comercial rodando em http://localhost:3000');
});
