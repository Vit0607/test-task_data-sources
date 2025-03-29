import styles from './URLComponent.module.scss';

interface URLProps {
  url: string;
  hasSources: boolean;
}

const URLComponent: React.FC<URLProps> = ({ url, hasSources }) => {
  return (
    <div
      className={styles.urlContainer}
      data-placeholder={hasSources ? 'Выберите источник данных' : ''}
    >
      {url || ''}
    </div>
  );
};

export default URLComponent;
