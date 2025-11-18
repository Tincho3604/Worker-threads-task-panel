import { EventEmitter } from 'events';

export class CronController extends EventEmitter {
    public workerId: number;
    public interval: NodeJS.Timeout;
    public cronTime: number;
    public retryLimit: number;
    public isCronRunning: boolean;

    constructor(cronTime: number, retryLimit: number) {
        super();
        this.workerId = 1;
        this.interval = setInterval(() => {}, 1000);
        this.cronTime = cronTime;
        this.retryLimit = retryLimit;
        this.isCronRunning = false;
    }

    public async createCron(): Promise<void> {
        this.interval = setInterval(async () => {
            this.emit('startCron', this.workerId);
            this.workerId++;
            console.log(`Cron ejecutandose - Thread N° [${this.workerId}]`);
            if (this.workerId === this.retryLimit) {
                this.clearCron();
                await this.delayCron(60000);
            }
        }, this.cronTime);
    }

    public clearCron(): void {
        clearInterval(this.interval);
        this.emit('finishCron', this.workerId);
    }

    public async delayCron(ms: number): Promise<void> {
        console.log(`Se espera hasta la siguiente ejecución, un total de ${ms} segundos`)
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}