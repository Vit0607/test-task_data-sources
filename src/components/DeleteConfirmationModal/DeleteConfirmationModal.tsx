import styles from './DeleteConfirmationModal.module.scss';

interface DeleteConfirmationProps {
  isOpen: boolean;
  sourceName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationProps> = ({
  isOpen,
  sourceName,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Подтверждение удаления</h2>
        <p>Точно удалить источник {sourceName}?</p>
        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onCancel}>
            Отменить
          </button>
          <button className={styles.confirm} onClick={onConfirm}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
