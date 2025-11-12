export interface rowsProps {
    threadId: number;
    memory: string;
    cpu: number;
    status: number;
    time: string;
}

export interface GridComponentProps {
    columns: string[];
    rows: rowsProps[];
};