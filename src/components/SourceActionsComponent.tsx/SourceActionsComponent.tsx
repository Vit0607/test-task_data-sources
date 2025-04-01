import styles from './SourceActionsComponent.module.scss';

interface SourceActionsProps {
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
  hasSelected: boolean;
}

const SourceActionsComponent: React.FC<SourceActionsProps> = ({
  onAdd,
  onEdit,
  onDelete,
  hasSelected
}) => {
  return (
    <div className={styles.actions}>
      <button className={`${styles.button} ${styles.add}`} onClick={onAdd}>
        Добавить источник
      </button>
      <button
        className={`${styles.button} ${styles.edit}`}
        onClick={onEdit}
        disabled={!hasSelected}
      >
        Изменить источник
      </button>
      <button
        className={`${styles.button} ${styles.delete}`}
        onClick={onDelete}
        disabled={!hasSelected}
      >
        Удалить источник
      </button>
    </div>
  );
};

export default SourceActionsComponent;
