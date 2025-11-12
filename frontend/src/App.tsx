import './App.css'
import { GridComponent } from './components/grid/gridComponent';
// import type { GridComponentProps } from './utils/interfaces';
import { response } from './utils/constants';

function App() {
  return (

    <div className='main-container-grid'>
      {Object.keys(response).map( values => {
        const { columns, rows } = response[values];
           return <GridComponent columns={columns} rows={rows} />
      })}

    </div>
  )
}

export default App
