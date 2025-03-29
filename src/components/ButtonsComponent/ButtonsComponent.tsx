import styles from './ButtonsComponent.module.scss';

interface ButtonsProps {
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLoad: () => void;
  onSave: () => void;
  onCalculate: () => void;
}

const ButtonsComponent: React.FC<ButtonsProps> = ({
  onFileUpload,
  onLoad,
  onSave,
  onCalculate
}) => {
  return (
    <div className={styles.buttonsContainer}>
      <input
        type="file"
        id="fileInput"
        className={styles.hiddenInput}
        onChange={onFileUpload}
        accept=".txt"
      />
      <button
        className={styles.button}
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        Загрузить из файла
      </button>
      <button className={styles.button} onClick={onLoad}>
        Загрузить
      </button>
      <button className={styles.button} onClick={onSave}>
        Сохранить
      </button>
      <button className={styles.button} onClick={onCalculate}>
        Рассчитать
      </button>
    </div>
  );
};

export default ButtonsComponent;
