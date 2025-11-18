import './gridComponent.css';
import type { GridComponentProps } from '../../utils/interfaces';
import { threadStatus } from '../../utils/constants';
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
                        <tr key={row.workerId}>
                            <>  
                                <td>{`worker-${row.workerId}`}</td>
                                <td>
                                    <span className={`status status--${row.status === 'running' ? 'active' : 'inactive'}`}>
                                        <span className="status-dot"></span>
                                        {row.status === 'running' ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td>{row.cpu}%</td>
                                <td>{row.memory}</td>
                                <td>{row.time}</td>
                                <td>{`worker-${row.workerReplacement || 0}`}</td>
                            </>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}