import './App.css'
import { GridComponent } from './components/grid/gridComponent';
import { response } from './utils/constants';
import type { rowsProps } from './utils/interfaces';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function App() {
  const [columns] = useState<string[]>(response.mainThreat.columns);
  const [rows, setRows] = useState<rowsProps[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/tasks').catch(() => {});
    const socket = io('http://localhost:3000', { transports: ['websocket'] });
    socket.on('worker_update', (payload: { data: rowsProps }) => {
      setRows((prev) => {
        const idx = prev.findIndex((r) => r.threadId === payload.data.threadId);
        if (idx === -1) return [...prev, payload.data];
        const next = prev.slice();
        next[idx] = payload.data;
        return next;
      });
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div className='main-container-grid'>
      <GridComponent columns={columns} rows={rows} />
    </div>
  )
}

export default App
