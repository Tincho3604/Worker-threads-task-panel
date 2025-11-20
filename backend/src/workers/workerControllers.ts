import { Worker } from "worker_threads";
import path from "path";
import { WorkerManager, WorkerInfo } from "./workerManager";

export class WorkerController {
    private readonly file: string;
    private worker?: Worker;
    private manager: WorkerManager;

    constructor(file: string, manager: WorkerManager) {
        this.file = file;
        this.manager = manager;
    }

    /**
     * Inicia el worker y registra los listeners
     */
    public start(): void {
        this.worker = new Worker(this.file);

        const threadId = this.worker.threadId;

        // Registrar el worker en el manager
        this.manager.registerWorker(threadId, {
            threadId,
            status: "starting"
        });

        this.worker.on("message", (message: WorkerInfo) => {
            const update: WorkerInfo = {
                ...message,
                threadId
            };

            this.manager.updateWorker(threadId, update);
        });

        this.worker.on("error", (error: Error) => {
            console.error(`Error en worker ${threadId}:`, error);

            this.manager.updateWorker(threadId, {
                threadId,
                status: "error",
                message: error.message
            });
        });

        this.worker.on("exit", (code) => {
            console.log(`🔴 Worker ${threadId} finalizado con código:`, code);

            this.manager.updateWorker(threadId, {
                threadId,
                status: "finished",
                exitCode: code
            });
        });

        // Enviar mensaje inicial
        this.worker.postMessage({
            threadId,
            action: "start"
        });
    }

    /**
     * Permite terminar el worker manualmente
     */
    public stop(): void {
        if (this.worker) {
            this.worker.terminate();
        }
    }
}
