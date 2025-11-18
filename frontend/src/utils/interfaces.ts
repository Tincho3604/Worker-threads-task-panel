export interface rowsProps {
    workerId: number;
    memory: string;
    cpu: number;
    status: string;
    time: string;
    workerReplacement: number;
}

export interface GridComponentProps {
    columns: string[];
    rows: rowsProps[];
};