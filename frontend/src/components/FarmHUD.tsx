import type { FC } from 'react';
import './FarmHUD.css';

interface FarmHUDProps {
  fieldsCount: number;
  machinesCount: number;
  factoriesCount: number;
}

export const FarmHUD: FC<FarmHUDProps> = ({ fieldsCount, machinesCount, factoriesCount }) => (
  <div className="farm-hud">
    <h2>Simulation de Ferme</h2>
    <p>Champs : {fieldsCount}</p>
    <p>Machines : {machinesCount}</p>
    <p>Usines : {factoriesCount}</p>
    {/* Ajoute ici des boutons ou infos supplémentaires */}
  </div>
); 