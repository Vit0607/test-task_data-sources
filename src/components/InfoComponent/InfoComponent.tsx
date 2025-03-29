import CountRowComponent from '../CountRowComponent/CountRowComponent';
import CountColumnComponent from '../CountColumnComponent/CountColumnComponent';
import JSONComponent from '../JSONComponent/JSONComponent';
import styles from './InfoComponent.module.scss';

interface InfoProps {
  loadedJSON: any;
  countRows: number;
  countColumns: number;
}

const InfoComponent: React.FC<InfoProps> = ({
  loadedJSON,
  countRows,
  countColumns
}) => {
  return (
    <div className={styles.info}>
      <h2>Информация</h2>
      <CountRowComponent count={countRows} />
      <CountColumnComponent count={countColumns} />
      <JSONComponent json={loadedJSON} />
    </div>
  );
};

export default InfoComponent;
