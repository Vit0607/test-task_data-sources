import styles from './InstructionComponent.module.scss';

const InstructionComponent = () => {
  return (
    <div className={styles.instruction}>
      <h3>Инструкция</h3>
      <ol className={styles.instructionList}>
        <li>Нажимаем "Загрузить из файла" || "Добавить источник".</li>
        <li>
          Нажимаем "Сохранить" (в левой колонке "МЕНЮ" - сохраняет в Local
          Storage).
        </li>
        <li>
          После обновления страницы теперь можно нажать просто "Загрузить"
          (загружает из Local Storage).
        </li>
        <li>Выбираем источник.</li>
        <li>Нажимаем "Рассчитать".</li>
      </ol>
      <a
        className={styles.link}
        href="https://disk.yandex.ru/d/PEDJ6Nih1Ebkew"
        target="_blank"
      >
        Файл с источниками для проверки работы приложения.
      </a>
    </div>
  );
};

export default InstructionComponent;
