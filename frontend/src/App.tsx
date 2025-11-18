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
    fetch('http://localhost:3000/workers').catch(() => {});
    const socket = io('http://localhost:3000', { transports: ['websocket'] });
    socket.on('initialData', (payload) => {
      console.log("initialData: ", payload);

      setRows(prev => {
        // si ya tengo data, NO la pises
        if (prev.length > 0) return prev;

        return payload.workers.map((values: any) => ({
          ...values
        }));
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

export default App;
