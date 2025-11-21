import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import path from "path";

import { WorkerController } from "./workers/workerControllers";
import { WorkerManager } from "./workers/workerManager";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const server = createServer(app);
const io = new SocketIOServer(server, { cors: { origin: "*" } });

// Crear manager de workers
const workerManager = new WorkerManager(io);

for(let i = 0; i < 5; i++) {
const worker = new WorkerController(
    path.resolve(__dirname, "./heavyTasks/task.js"),
    workerManager
  );
  worker.start();
}

  app.get("/workers", (_req, res) => {
    res.send(workerManager.getData());
});

server.listen(PORT, () => {
    console.log("Servidor escuchando en http://localhost:" + PORT);
});
