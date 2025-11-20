import { Server as SocketIOServer } from "socket.io";

export interface WorkerInfo {
    threadId: number;
    progress?: number;
    status?: string;
    message?: string;
    [key: string]: any; // permite agregar info extra del worker
}

export interface WorkerBroadcastPayload {
    totalWorkers: number;
    workers: WorkerInfo[];
}

export class WorkerManager {
    private io: SocketIOServer;
    private workers: Map<number, WorkerInfo>;

    constructor(io: SocketIOServer) {
        this.io = io;
        this.workers = new Map<number, WorkerInfo>();
    }

    /**
     * Registra un nuevo worker
     */
    public registerWorker(threadId: number, info: WorkerInfo): void {
        this.workers.set(threadId, info);
        this.broadcast();
    }

    /**
     * Actualiza la información de un worker existente
     */
    public updateWorker(threadId: number, info: WorkerInfo): void {
        this.workers.set(threadId, info);
        this.broadcast();
    }

    /**
     * Envía el estado de todos los workers a los clientes conectados
     */
    private broadcast(): void {
        const payload: WorkerBroadcastPayload = {
            totalWorkers: this.workers.size,
            workers: [...this.workers.values()]
        };

        this.io.emit("worker_update", payload);
    }

    /**
     * Devuelve el estado actual de todos los workers
     */
    public getData(): WorkerBroadcastPayload {
        return {
            totalWorkers: this.workers.size,
            workers: [...this.workers.values()]
        };
    }
}
