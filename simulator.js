const { io } = require("socket.io-client");
const socket = io("http://localhost:3000");

const devices = ["device_A", "device_B", "device_C"];

socket.on("connect", () => {
  console.log("Simulador conectado!");

  setInterval(() => {
    const data = {
      device: devices[Math.floor(Math.random() * devices.length)],
      temperature: (Math.random() * 40).toFixed(1),
      humidity: (Math.random() * 100).toFixed(0),
      motion: Math.random() > 0.5
    };
    socket.emit("sendSensor", data);
  }, 2000); // envia a cada 2s
});
