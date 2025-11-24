const WebSocket = require('ws');

let wss;

function initWebSocket(server) {
  wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('Novo cliente conectado');

    ws.on('message', (message) => {
      console.log('Mensagem recebida do cliente:', message);
      // Aqui tu pode processar dados do simulador ou do dashboard
      broadcast(message);
    });

    ws.on('close', () => {
      console.log('Cliente desconectou');
    });
  });
}

// Função pra enviar pra todo mundo conectado
function broadcast(data) {
  if (!wss) return;
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

module.exports = { initWebSocket, broadcast };
