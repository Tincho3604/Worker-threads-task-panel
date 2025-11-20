import './App.css'
import { GridComponent } from './components/grid/gridComponent';
import { COLUMNS_DEFAULT } from './utils/constants';
import type { rowsProps } from './utils/interfaces';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function App() {
  const [rows, setRows] = useState<rowsProps[]>([]);

  useEffect(():any => {
    const socket = io('http://localhost:3000', { transports: ['websocket'] });

    socket.on("worker_update", (info) => {
      const { workers } = info;
      setRows(prev => {
        const merge = [...prev, ...workers];
        const map = new Map(merge.map(item => [item.threadId, item]));
        const workerThreads = Array.from(map.values());
        return workerThreads;
      });
    });
    return () => socket.disconnect();
  }, []);
console.log(rows);
  return (
    <div className='main-container-grid'>
      <GridComponent columns={COLUMNS_DEFAULT} rows={rows} />
    </div>
  );
}

export default App;
