import './gridComponent.css';
import type { GridComponentProps } from '../../utils/interfaces';

export const GridComponent = (gridValues: GridComponentProps) => {
    return (
        <div className="table-wrapper">
            <table className="table">
                <thead>
                    <tr>
                        {gridValues?.columns?.map((column) => (
                            <th key={column}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {gridValues?.rows?.map((row) => (
                        <tr key={row.threadId}>
                            <>  
                                <td>{`worker-${row.threadId}`}</td>
                                <td>
                                    <span className={`status status--${row.status === 'running' ? 'active' : 'inactive'}`}>
                                        <span className="status-dot"></span>
                                        {row.status === 'running' ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td>{row.cpuUserMs}%</td>
                                <td>{row.memoryMb}</td>
                                <td>{row.durationMs}ms</td>
                                <td>{row.counter}</td>
                                <td>{row.replaceWorker ? `worker-${row.replaceWorker}` : ""}</td>
                            </>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}