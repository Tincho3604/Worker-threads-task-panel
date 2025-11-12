import { EventEmitter } from 'events';

export class CronController extends EventEmitter {
    public threadId: number;
    public interval: NodeJS.Timeout;
    public cronTime: number;
    public retryLimit: number;

    constructor(cronTime: number, retryLimit: number) {
        super();
        this.threadId = 0;
        this.interval = setInterval(() => {}, 1000);
        this.cronTime = cronTime;
        this.retryLimit = retryLimit;
    }

    public async createCron(): Promise<void> {
        this.interval = setInterval(async () => {
            this.threadId++;
            console.log(`Cron ejecutandose - Thread N° [${this.threadId}]`);
            this.emit('startCron', this.threadId);
            if (this.threadId === this.retryLimit) {
                this.clearCron();
                await this.delayCron(60000);
            }
        }, this.cronTime);
    }

    public clearCron(): void {
        clearInterval(this.interval);
        this.emit('finishCron', this.threadId);
    }

    public async delayCron(ms: number): Promise<void> {
        console.log(`Se espera hasta la siguiente ejecución, un total de ${ms} segundos`)
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}