export interface WorkerInformation {
    workerId: number;
    memory: string;
    cpu: number;
    status: number;
    time: string;
    workerReplacement?: number;
}
