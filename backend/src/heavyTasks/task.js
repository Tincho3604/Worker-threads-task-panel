const { parentPort } = require('worker_threads');
let operations = 0;
for (let i = 0; i < 1e10; i++) {
       operations++; 
}
parentPort.postMessage(operations);