// server.js
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { Worker } from "worker_threads";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Crear HTTP server
const server = createServer(app);

// Crear instancia de socket.io
const io = new SocketIOServer(server, {
  cors: { origin: "*" }
});

// ---- WORKER POOL SIMPLE ----
const workers = new Map(); // workerId → info

// Función para crear un worker
function createWorker(id: number) {
  const worker = new Worker(`
    const { parentPort } = require("worker_threads");

    // Cada segundo enviamos info simulada
    setInterval(() => {
      const memory = Math.floor(Math.random() * 200);
      const cpu = Math.floor(Math.random() * 100);
      const time = Math.floor(Math.random() * 500);

      parentPort.postMessage({
        workerId: ${id},
        memory: memory + "MB",
        cpu,
        status: "running",
        time: time + "ms"
      });
    }, 1000);

  `, { eval: true });

  // Escuchar mensajes del worker
  worker.on("message", (info) => {
    workers.set(info.workerId, info);

    // Enviar actualización al frontend
    io.emit("worker_update", info);
  });

  worker.on("error", (err) => {
    console.error("Worker error:", err);
  });
}

// Crear 4 workers
for (let i = 1; i <= 4; i++) createWorker(i);

// ---- SOCKET IO ----
io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  // Enviar datos iniciales
  socket.emit("initialData", {
    totalWorkers: workers.size,
    workers: [...workers.values()]
  });
});

// ---- ROUTES OPTIONAL ----
app.get("/workers", (_req, res) => {
  res.send({
    totalWorkers: workers.size,
    workers: [...workers.values()]
  });
});

server.listen(PORT, () => {
  console.log("Servidor escuchando en http://localhost:" + PORT);
});
