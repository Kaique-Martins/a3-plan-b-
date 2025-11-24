// Conecta no servidor Socket.IO
const socket = io('http://localhost:3000');

// Seleção de elementos
const tempCard = document.getElementById('tempCard');
const humCard = document.getElementById('humCard');
const motionCard = document.getElementById('motionCard');
const logsDiv = document.getElementById('logs');
const deviceSelect = document.getElementById('deviceSelect');

// Dados pro gráfico
let tempData = {
  labels: [],
  datasets: [{
    label: 'Temperatura (°C)',
    backgroundColor: 'rgba(255, 102, 0, 0.5)',
    borderColor: 'rgba(255, 102, 0, 1)',
    data: [],
    fill: false,
  }]
};

const tempChart = new Chart(document.getElementById('tempChart').getContext('2d'), {
  type: 'line',
  data: tempData,
  options: {
    responsive: true,
    animation: false,
    scales: { x: { title: { display: true, text: 'Horário' } }, y: { beginAtZero: true } }
  }
});

// Recebe dados do servidor
socket.on('sensorData', (data) => {
  // Filtra dispositivo se estiver selecionado
  if (deviceSelect.value && data.device !== deviceSelect.value) return;

  // Atualiza cards
  tempCard.textContent = `${data.temperature} °C`;
  humCard.textContent = `${data.humidity} %`;
  motionCard.textContent = data.motion ? 'Sim' : 'Não';

  // Atualiza gráfico
  const now = new Date().toLocaleTimeString();
  tempData.labels.push(now);
  tempData.datasets[0].data.push(data.temperature);
  if (tempData.labels.length > 20) { // mantém só os últimos 20 pontos
    tempData.labels.shift();
    tempData.datasets[0].data.shift();
  }
  tempChart.update();

  // Adiciona log
  const p = document.createElement('p');
  p.textContent = `[${now}] ${data.device}: Temp ${data.temperature}°C, Hum ${data.humidity}%, Movimento: ${data.motion ? 'Sim' : 'Não'}`;
  logsDiv.appendChild(p);
  logsDiv.scrollTop = logsDiv.scrollHeight;
});

// Botão de histórico (pode puxar do server via REST)
document.getElementById('btnHistory').addEventListener('click', async () => {
  const device = deviceSelect.value;
  const url = device ? `/api/history?device=${device}` : '/api/history';
  const res = await fetch(url);
  const history = await res.json();

  // Limpa gráfico e logs
  tempData.labels = [];
  tempData.datasets[0].data = [];
  logsDiv.innerHTML = '';

  history.forEach(item => {
    tempData.labels.push(new Date(item.timestamp).toLocaleTimeString());
    tempData.datasets[0].data.push(item.temperature);

    const p = document.createElement('p');
    p.textContent = `[${new Date(item.timestamp).toLocaleTimeString()}] ${item.device}: Temp ${item.temperature}°C, Hum ${item.humidity}%, Movimento: ${item.motion ? 'Sim' : 'Não'}`;
    logsDiv.appendChild(p);
  });

  tempChart.update();
});
