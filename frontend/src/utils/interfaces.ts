export interface rowsProps {
    threadId: number;
    memoryMb: string;
    cpuUserMs: number;
    status: string;
    durationMs: string;
    replaceWorker?: number;
    counter?: number;
}

export interface GridComponentProps {
    columns: string[];
    rows: rowsProps[];
};