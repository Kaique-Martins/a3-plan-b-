const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(bodyParser.json());
app.use(express.static('public')); // coloca dashboard.html e script.js aqui

// Histórico fake
app.get('/api/history', (req, res) => {
  const device = req.query.device || 'Todos';
  const fakeData = [];
  for (let i = 0; i < 20; i++) {
    fakeData.push({
      device: device === 'Todos' ? `device_${String.fromCharCode(65 + i % 3)}` : device,
      temperature: Math.floor(Math.random() * 40),
      humidity: Math.floor(Math.random() * 100),
      motion: Math.random() > 0.5,
      timestamp: Date.now() - (20 - i) * 60000
    });
  }
  res.json(fakeData);
});

// Socket.IO
io.on('connection', (socket) => {
  console.log('Cliente conectado via Socket.IO');

  socket.on('sendSensor', (data) => {
    io.emit('sensorData', data);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectou');
  });
});

server.listen(3000, () => console.log('Servidor rodando na porta 3000'));
