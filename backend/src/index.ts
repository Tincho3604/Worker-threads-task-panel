import express from 'express';
import cors from 'cors';
import path from 'path';
import { WorkerController } from "./controllers/workerControllers";
import { createServer } from 'http';
import { CronController } from "./controllers/cronController";
import { Server as SocketIOServer } from 'socket.io';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {
  console.log('Socket conectado:', socket.id);
  socket.on('disconnect', () => {
    console.log('Socket desconectado:', socket.id);
  });
});

app.get('/tasks', async (_req, res) => {

  const cron = new CronController(2000, 5);
  
  cron.on('startCron', (threadId) => {
    console.log(`Cron ejecutandose - Thread N° [${threadId}]`);
    
    const workerController = new WorkerController(path.resolve(__dirname, './heavyTasks/task.js'), threadId);
    const worker = workerController.createWorker();
    
    worker.on('message', () => {
    console.log(`Resultado del worker - Thread N° [${threadId}]:`, workerController.information);
    io.emit('worker_update', { data: workerController.information });
    });
  });
  cron.createCron();
  res.send({ message: 'Tareas iniciadas' });
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
