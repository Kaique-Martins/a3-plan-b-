# IoT Real-Time Dashboard


Exemplo de dashboard mostrando temperatura, umidade e logs em tempo real.

Descrição do Projeto

Esse projeto é um sistema IoT em tempo real. Ele simula sensores que medem temperatura, umidade e movimento, envia os dados para um servidor e mostra tudo em um painel visual no navegador.

# Serve para:

Testar sistemas IoT sem hardware real

Visualizar dados em tempo real

Treinar integração de front-end e back-end

Preparar aplicações reais de monitoramento (casas inteligentes, indústrias, agricultura de precisão)

Estrutura do Projeto
A3/
├─ server.js             # Servidor Node com Socket.IO e REST API
├─ /simulator
│   ├─ simulator.js      # Simulador de sensores
│   └─ package.json
├─ /public
│   ├─ dashboard.html    # Painel de monitoramento
│   ├─ script.js         # Lógica do dashboard
│   └─ style.css         # Estilo do dashboard

Pré-requisitos

Node.js 18+

Navegador moderno (Chrome, Edge, Firefox)

Conexão local (localhost)

Instalação e Execução

1️⃣ Instalar dependências do simulador

cd simulator
npm install


2️⃣ Rodar o servidor

cd ..
node server.js


3️⃣ Rodar o simulador

cd simulator
node simulator.js


4️⃣ Abrir o dashboard no navegador

http://localhost:3000/dashboard.html

Fluxo do Sistema
Simulador → Servidor → Dashboard


Simulador: envia dados aleatórios (temp, umidade, movimento) a cada 2s

Servidor: recebe e distribui os dados em tempo real via Socket.IO

Dashboard: atualiza cards, gráficos e logs automaticamente

# Aplicações

Monitoramento IoT sem hardware

Treinamento de integração front-end + back-end

Visualização de dados em tempo real

Preparação para sistemas reais de casas inteligentes, indústrias ou agricultura

Aprendizado / Diferenciais

Comunicação em tempo real com Socket.IO

Gráficos dinâmicos com Chart.js

Dashboard interativo com cards, logs e gráficos

Integração completa de front-end e back-end
