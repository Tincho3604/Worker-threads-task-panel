import './App.css'
import { GridComponent } from './components/grid/gridComponent';
import { response } from './utils/constants';
import type { rowsProps } from './utils/interfaces';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function App() {
  const [columns] = useState<string[]>(response.mainThreat.columns);
  const [rows, setRows] = useState<rowsProps[]>([]);

  useEffect(():any => {
    const socket = io('http://localhost:3000', { transports: ['websocket'] });

    socket.on("worker_update", (info) => {
      const { workers } = info;
      setRows(prev => {
        const merge = [...prev, ...workers];
        const map = new Map(merge.map(item => [item.threadId, item]));
        const result = Array.from(map.values());
        return result;
      });
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className='main-container-grid'>
      <GridComponent columns={columns} rows={rows} />
    </div>
  );
}

export default App;
