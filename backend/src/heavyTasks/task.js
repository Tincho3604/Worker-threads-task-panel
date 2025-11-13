const { parentPort } = require('worker_threads');
parentPort.on('message', (msg) => {
   console.log(`Mensaje recibido del hilo principal: ${msg}`);
  })
let result = 0;
const startTime = performance.now();
for (let i = 0; i < 1e10; i++) {
       result++; 
}
const endTime = performance.now() - startTime;

parentPort.postMessage(endTime.toFixed(0));