export interface Field {
  _id: string;
  name: string;
  cropType: string;
  area: number;
  position: { x: number; z: number };
}

export interface Machine {
  _id: string;
  name: string;
  type: string;
  status: string;
  position: { x: number; z: number };
}

export interface Factory {
  _id: string;
  name: string;
  type: string;
  status: string;
  position: { x: number; z: number };
} 