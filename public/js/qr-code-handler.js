document.addEventListener('DOMContentLoaded', () => {
  const socket = io();
  const statusElement = document.getElementById('status');
  const qrcodeContainer = document.getElementById('qrcode-container');
  const successContainer = document.getElementById('success-container');
  const qrcodeElement = document.getElementById('qrcode');

  // Ouvir eventos do servidor
  socket.on('qr', (qr) => {
    qrcodeElement.innerHTML = '';
    
    QRCode.toDataURL(qr, {
      width: 250,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    }, (error, url) => {
      if (error) {
        console.error('QR Code error:', error);
        statusElement.textContent = 'Erro ao gerar QR Code';
        statusElement.className = 'status status-error';
        return;
      }
      
      const img = document.createElement('img');
      img.src = url;
      img.alt = 'QR Code para conexão';
      img.style.width = '250px';
      img.style.height = '250px';
      qrcodeElement.appendChild(img);
      
      statusElement.textContent = 'Escaneie o QR Code para conectar';
      statusElement.className = 'status status-waiting';
    });
  });

  socket.on('connected', () => {
    statusElement.textContent = 'Conectado com sucesso!';
    statusElement.className = 'status status-connected';
    qrcodeContainer.style.display = 'none';
    successContainer.style.display = 'block';
  });

  socket.on('disconnected', () => {
    statusElement.textContent = 'Desconectado. Recarregue a página para reconectar.';
    statusElement.className = 'status status-error';
  });

  socket.on('error', (error) => {
    statusElement.textContent = `Erro: ${error}`;
    statusElement.className = 'status status-error';
  });
});