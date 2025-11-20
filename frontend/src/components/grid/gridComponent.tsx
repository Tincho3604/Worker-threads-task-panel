import './gridComponent.css';
import type { GridComponentProps } from '../../utils/interfaces';
import { Filter } from '../filter/filter';

export const GridComponent = (gridValues: GridComponentProps) => {
    return (
        <div className="table-wrapper">
            <Filter value={"1"} onChange={(e: any) => { console.log(e)}} />
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
                                <td>{row.durationMs}</td>
                                <td>{row.counter}</td>
                            </>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}