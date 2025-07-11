import { useEffect, useState } from 'react';
import { FarmScene } from './scenes/FarmScene';
import { FarmHUD } from './components/FarmHUD';
import { getFields, getMachines, getFactories } from './services/api';
import './App.css';

function App() {
  const [fieldsCount, setFieldsCount] = useState(0);
  const [machinesCount, setMachinesCount] = useState(0);
  const [factoriesCount, setFactoriesCount] = useState(0);

  useEffect(() => {
    getFields().then(fields => setFieldsCount(fields.length));
    getMachines().then(machines => setMachinesCount(machines.length));
    getFactories().then(factories => setFactoriesCount(factories.length));
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <FarmScene />
      <FarmHUD fieldsCount={fieldsCount} machinesCount={machinesCount} factoriesCount={factoriesCount} />
    </div>
  );
}

export default App;
