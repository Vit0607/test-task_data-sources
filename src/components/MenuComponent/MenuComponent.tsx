import ButtonsComponent from '../ButtonsComponent/ButtonsComponent';
import InstructionComponent from '../InstructionComponent/InstructionComponent';
import LoadedComponent from '../LoadedComponent/LoadedComponent';
import styles from './MenuComponent.module.scss';

interface MenuProps {
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLoad: () => void;
  onSave: () => void;
  onCalculate: () => void;
  statusLoaded: boolean;
}

const MenuComponent: React.FC<MenuProps> = ({
  onFileUpload,
  onLoad,
  onSave,
  onCalculate,
  statusLoaded
}) => {
  return (
    <div className={styles.menu}>
      <h2 className={styles.title}>МЕНЮ</h2>
      <ButtonsComponent
        onFileUpload={onFileUpload}
        onLoad={onLoad}
        onSave={onSave}
        onCalculate={onCalculate}
      />
      <InstructionComponent />
      {statusLoaded && <LoadedComponent />}
    </div>
  );
};

export default MenuComponent;
