import type { FC } from 'react';
import type { Machine } from '../types';

interface Machine3DProps {
  machine: Machine;
}

export const Machine3D: FC<Machine3DProps> = ({ machine }) => (
  <box
    name={`machine-${machine._id}`}
    size={1}
    position={{ x: machine.position.x, y: 0.5, z: machine.position.z }}
    // La couleur sera gérée par un material parent dans la scène
  />
); 