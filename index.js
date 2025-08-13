require('dotenv').config();
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const initializeWhatsAppClient = require('./whatsapp-client');
const dbConnect = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Conecta ao MongoDB
dbConnect();

// Configuração do servidor HTTP
const server = app.listen(PORT, () => {
  console.log(`🌐 Servidor web rodando em http://localhost:${PORT}`);
});

// Configuração do Socket.IO
const io = socketIO(server);

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicializa o cliente WhatsApp
initializeWhatsAppClient(io);