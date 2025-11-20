export interface rowsProps {
    threadId: number;
    memoryMb: string;
    cpuUserMs: number;
    status: string;
    durationMs: string;
    workerReplacement?: number;
    counter?: number;
}

export interface GridComponentProps {
    columns: string[];
    rows: rowsProps[];
};