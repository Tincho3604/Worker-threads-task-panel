// src/heavyTasks/task.js
const { parentPort, workerData } = require("worker_threads");

parentPort.on("message", async (msg) => {
  if (msg.type === "run_task") {
    const iterations = Number(msg.payload) || 100; // payload determina "peso"
    const chunkSize = 50000; // tamaño de cada bloque de trabajo
    const start = Date.now();
    let processed = 0;

    // Ejecutar en chunks para poder postear progreso
    while (processed < iterations * 100000) {
      // hacer trabajo pesado en un chunk
      const max = Math.min(processed + chunkSize, iterations * 100000);
      for (let i = processed; i < max; i++) {
        // operación simple que consume CPU
        const x = i * i;
      }
      processed = max;

      // enviar progreso intermedio
      parentPort.postMessage({
        type: "progress",
        processed,
        timestamp: Date.now() - start
      });
    }

    const totalTime = Date.now() - start;

    // tarea finalizada
    parentPort.postMessage({
      type: "task_finished",
      time: `${totalTime}ms`
    });
  }
});
