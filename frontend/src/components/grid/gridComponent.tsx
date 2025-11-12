import './gridComponent.css';
import type { GridComponentProps } from '../../utils/interfaces';
import { threadStatus } from '../../utils/constants';
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
                                    <span className={`status status--${row.status === 0 ? 'active' : 'loading'}`}>
                                        <span className="status-dot"></span>
                                        {threadStatus[row.status]}
                                    </span>
                                </td>
                                <td>{row.cpu}%</td>
                                <td>{row.memory}</td>
                                <td>{row.time}</td>
                            </>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}