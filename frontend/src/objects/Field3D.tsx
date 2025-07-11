import type { FC } from 'react';
import type { Field } from '../types';

interface Field3DProps {
  field: Field;
}

export const Field3D: FC<Field3DProps> = ({ field }) => (
  <ground
    name={`field-${field._id}`}
    width={Math.sqrt(field.area)}
    height={Math.sqrt(field.area)}
    position={{ x: field.position.x, y: 0, z: field.position.z }}
    // La couleur sera gérée par un material parent dans la scène
  />
); 