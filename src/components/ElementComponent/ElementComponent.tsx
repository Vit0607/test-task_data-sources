import styles from './ElementComponent.module.scss';

interface ElementProps {
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

const ElementComponent: React.FC<ElementProps> = ({
  name,
  isSelected,
  onClick
}) => {
  return (
    <div
      className={`${styles.element} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
    >
      {name}
    </div>
  );
};

export default ElementComponent;
