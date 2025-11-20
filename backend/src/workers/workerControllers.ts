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
     * Método Reemplaza el worker actual con uno nuevo.
     */
    public replaceWorker(threadId: number): void {
        console.log("Reemplazando worker", threadId);
        const worker = new WorkerController(
            path.resolve(__dirname, "../heavyTasks/task.js"),
            this.manager
        );
        worker.start(threadId);
    }

    /**
     * Método Inicia el worker y registra los listeners
     */
    public start(idToReplace?: number): void {
        if(idToReplace){
            console.log("Reemplazando worker", idToReplace);
        }
        this.worker = new Worker(this.file);

        const threadId = this.worker.threadId;

        // Registrar el worker en el manager
        this.manager.registerWorker(threadId, {
            threadId,
            status: "starting"
        });

        this.worker.on("message", (message: WorkerInfo) => {
            if (message.status === "done") this.replaceWorker(threadId);
            const update: WorkerInfo = {
                ...message,
                threadId,
                replaceWorker: idToReplace || 0
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
            console.log(`Worker ${threadId} finalizado con código:`, code);

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
     * Método que permite terminar el worker manualmente
     */
    public stop(): void {
        if (this.worker) {
            this.worker.terminate();
        }
    }
}
