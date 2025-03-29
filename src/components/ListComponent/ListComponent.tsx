import URLComponent from '../URLComponent/URLComponent';
import ElementsContainerComponent from '../ElementsContainerComponent/ElementsContainerComponent';
import styles from './ListComponent.module.scss';

interface ListProps {
  urls: Array<{ name: string; url: string }>;
  currentURL_ID: number;
  setCurrentURL_ID: (id: number) => void;
}

const ListComponent: React.FC<ListProps> = ({
  urls,
  currentURL_ID,
  setCurrentURL_ID
}) => {
  return (
    <div className={styles.list}>
      <h2>Список источников данных</h2>

      <URLComponent
        url={currentURL_ID !== -1 ? urls[currentURL_ID]?.url : ''}
        hasSources={urls.length > 0}
      />

      <ElementsContainerComponent
        urls={urls}
        currentURL_ID={currentURL_ID}
        setCurrentURL_ID={setCurrentURL_ID}
      />
    </div>
  );
};

export default ListComponent;
