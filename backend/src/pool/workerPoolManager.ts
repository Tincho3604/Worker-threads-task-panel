import { WorkerController } from "../workers/workerControllers";
import path from "path";

export class WorkerPoolManager {
  public workerPool: Map<number, WorkerController> = new Map();
  private readonly maxWorkers: number;
  private nextId = 1;

  constructor(maxWorkers: number) {
    this.maxWorkers = maxWorkers;
  }

  public getCurrentCount(): number {
    return this.workerPool.size;
  }

  public addWorker(controller: WorkerController) {
    const id = controller.information.workerId;
    this.workerPool.set(id, controller);
  }

  public initializeWorkers() {
    const missing = this.maxWorkers - this.getCurrentCount();
    if (missing <= 0) return;

    for (let i = 0; i < missing; i++) {
      const id = this.nextId++;

      const controller = new WorkerController(
        path.resolve(__dirname, "../heavyTasks/task.js")
      );

      const worker = controller.createWorker();

      worker.on("message", () => {
        this.addWorker(controller);
      });
    }
  }
}
