import { Worker } from "worker_threads";
import { MEMORY_DEFAULT_VALUE } from "../utils/constants";
import { WorkerInformation } from "../utils/interfaces";


export class WorkerController {
    private readonly file: string;
    private readonly threadCount: number;
    public information: WorkerInformation;
    private status: number;

    constructor(file: string, threadCount: number) {
        this.file = file;
        this.threadCount = threadCount;
        this.status = 0;
        this.information = {} as WorkerInformation;
    }

    public createWorker(): Worker {
        const worker = new Worker(this.file, {
            workerData: { threadCount: this.threadCount }
        });

        this.processWorkers(worker);
        return worker;
    }

    private processWorkers(worker: Worker): void {
        worker.on("message", (timestamp) => {
            const memory = (process.memoryUsage().rss / MEMORY_DEFAULT_VALUE / MEMORY_DEFAULT_VALUE).toFixed(0);
            const cpu = process.cpuUsage();

            this.information = {
                workerId: worker.threadId,
                memory: `${memory} MB`,
                cpu: cpu.system,
                status: this.status,
                time: `${timestamp}ms`
            };
        });

        worker.on("error", (error) => {
            console.error("Error en el worker:", error);
        });

        worker.postMessage(worker.threadId);
    }
}
