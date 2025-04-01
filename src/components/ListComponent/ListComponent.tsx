import URLComponent from '../URLComponent/URLComponent';
import ElementsContainerComponent from '../ElementsContainerComponent/ElementsContainerComponent';
import styles from './ListComponent.module.scss';
import SourceActionsComponent from '../SourceActionsComponent.tsx/SourceActionsComponent';

interface ListProps {
  urls: Array<{ name: string; url: string }>;
  currentURL_ID: number;
  setCurrentURL_ID: (id: number) => void;
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ListComponent: React.FC<ListProps> = ({
  urls,
  currentURL_ID,
  setCurrentURL_ID,
  onAdd,
  onEdit,
  onDelete
}) => {
  return (
    <div className={styles.list}>
      <h3>Список источников данных</h3>
      <URLComponent
        url={currentURL_ID !== -1 ? urls[currentURL_ID]?.url : ''}
        hasSources={urls.length > 0}
      />
      <ElementsContainerComponent
        urls={urls}
        currentURL_ID={currentURL_ID}
        setCurrentURL_ID={setCurrentURL_ID}
      />
      <SourceActionsComponent
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        hasSelected={currentURL_ID !== -1}
      />
    </div>
  );
};

export default ListComponent;
