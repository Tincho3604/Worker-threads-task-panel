// /src/workers/task.js
const { parentPort } = require("worker_threads");
const { performance } = require("perf_hooks");

let counter = Math.floor(Math.random() * (50 - 15 + 1)) + 15;;

// escuchar mensajes del main thread
parentPort.on("message", (msg) => {
  //console.log("Worker recibió:", msg);
});

function slowCount() {
  const startCpu = process.cpuUsage();
  const startTime = performance.now();

  let work = 0;
  for (let i = 0; i < 5e7; i++) {
    work += i;
  }

  const endTime = performance.now();
  const cpuDiff = process.cpuUsage(startCpu);

  const memory = (process.memoryUsage().rss / 1024 / 1024).toFixed(2);
  const cpuUserMs = cpuDiff.user / 1000;
  const durationMs = (endTime - startTime).toFixed(2);

  parentPort.postMessage({
    counter,
    status: "running",
    memoryMb: memory,
    cpuUserMs,
    durationMs
  });

  if (counter < 0) {
    parentPort.postMessage({
    counter,
    status: "done",
    memoryMb: memory,
    cpuUserMs,
    durationMs
  });
    return;
  }

  counter--;
  setTimeout(slowCount, 1000);
}

slowCount();
