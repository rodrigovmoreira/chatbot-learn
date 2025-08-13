const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');

function initializeWhatsAppClient(io) {
  console.log('Inicializando cliente WhatsApp...');
  
  const client = new Client({
    puppeteer: {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
  });

  // Eventos do WhatsApp
  client.on('qr', (qr) => {
    console.log('QR Code recebido');
    qrcode.toDataURL(qr, (err, url) => {
      if (err) {
        console.error('Erro ao gerar QR Code:', err);
        return;
      }
      io.emit('qr', qr);
    });
  });

  client.on('ready', () => {
    console.log('✅ Bot conectado ao WhatsApp');
    io.emit('connected');
  });

  client.on('disconnected', () => {
    console.log('❌ Bot desconectado');
    io.emit('disconnected');
  });

  // Inicializa o cliente
  client.initialize();

  return client;
}

module.exports = initializeWhatsAppClient;