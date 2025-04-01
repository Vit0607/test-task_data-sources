import { useEffect, useState } from 'react';
import styles from './SourceModal.module.scss';

interface SourceModalProps {
  isOpen: boolean;
  mode: 'add' | 'edit';
  initialName: string;
  initialUrl: string;
  onSave: (name: string, url: string) => void;
  onCancel: () => void;
}

const SourceModal: React.FC<SourceModalProps> = ({
  isOpen,
  mode,
  initialName,
  initialUrl,
  onSave,
  onCancel
}) => {
  const [name, setName] = useState(initialName);
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    if (isOpen) {
      setName(initialName);
      setUrl(initialUrl);
    }
  }, [isOpen, initialName, initialUrl]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>
          {mode === 'add' ? 'Добавить источник' : 'Редактировать источник'}
        </h2>

        <div className={styles.formGroup}>
          <label>Название источника:</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>URL источника:</label>
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
        </div>

        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onCancel}>
            Отменить
          </button>
          <button className={styles.save} onClick={() => onSave(name, url)}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

export default SourceModal;
