import type { FC } from 'react';
import type { Factory } from '../types';

interface Factory3DProps {
  factory: Factory;
}

export const Factory3D: FC<Factory3DProps> = ({ factory }) => (
  <cylinder
    name={`factory-${factory._id}`}
    diameter={2}
    height={2}
    position={{ x: factory.position.x, y: 1, z: factory.position.z }}
    // La couleur sera gérée par un material parent dans la scène
  />
); 