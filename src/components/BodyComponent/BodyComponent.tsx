import ListComponent from '../ListComponent/ListComponent';
import InfoComponent from '../InfoComponent/InfoComponent';
import styles from './BodyComponent.module.scss';

interface BodyProps {
  urls: Array<{ name: string; url: string }>;
  currentURL_ID: number;
  setCurrentURL_ID: (id: number) => void;
  loadedJSON: any;
  countRows: number;
  countColumns: number;
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const BodyComponent: React.FC<BodyProps> = ({
  urls,
  currentURL_ID,
  setCurrentURL_ID,
  loadedJSON,
  countRows,
  countColumns,
  onAdd,
  onEdit,
  onDelete
}) => {
  return (
    <div className={styles.body}>
      <ListComponent
        urls={urls}
        currentURL_ID={currentURL_ID}
        setCurrentURL_ID={setCurrentURL_ID}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <InfoComponent
        loadedJSON={loadedJSON}
        countRows={countRows}
        countColumns={countColumns}
      />
    </div>
  );
};

export default BodyComponent;
