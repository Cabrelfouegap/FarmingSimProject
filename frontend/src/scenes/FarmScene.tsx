import { useEffect, useState } from 'react';
import { Engine, Scene } from 'react-babylonjs';
import { Vector3, Color3 } from '@babylonjs/core';
import { getFields, getMachines, getFactories } from '../services/api';
import type { Field, Machine, Factory } from '../types';
import { Field3D } from '../objects/Field3D';
import { Machine3D } from '../objects/Machine3D';
import { Factory3D } from '../objects/Factory3D';

export const FarmScene = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [factories, setFactories] = useState<Factory[]>([]);

  useEffect(() => {
    getFields().then(setFields);
    getMachines().then(setMachines);
    getFactories().then(setFactories);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Engine antialias adaptToDeviceRatio canvasId="babylon-canvas">
        <Scene>
          <hemisphericLight name="light1" intensity={0.9} direction={Vector3.Up()} />
          <arcRotateCamera
            name="camera1"
            target={new Vector3(0, 0, 0)}
            alpha={Math.PI / 2}
            beta={Math.PI / 3}
            radius={40}
            minZ={0.1}
            wheelPrecision={30}
            lowerBetaLimit={0.1}
            upperBetaLimit={Math.PI / 2}
            upperRadiusLimit={100}
            useAutoRotationBehavior={false}
            setActiveOnSceneIfNoneActive={true}
            allowUpsideDown={false}
            panningSensibility={0}
          />
          <ground name="ground1" width={60} height={60} subdivisions={2} receiveShadows={true} />
          {/* Ciel bleu */}
          <backgroundMaterial name="sky" baseColor={Color3.FromHexString('#87ceeb')} />
          {/* Champs */}
          {fields.map(field => <Field3D key={field._id} field={field} />)}
          {/* Machines */}
          {machines.map(machine => <Machine3D key={machine._id} machine={machine} />)}
          {/* Usines */}
          {factories.map(factory => <Factory3D key={factory._id} factory={factory} />)}
        </Scene>
      </Engine>
    </div>
  );
}; 