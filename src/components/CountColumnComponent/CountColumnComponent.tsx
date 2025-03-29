import styles from './CountColumnComponent.module.scss';

interface CountColumnProps {
  count: number;
}

const CountColumnComponent: React.FC<CountColumnProps> = ({ count }) => {
  return (
    <div className={styles.countColumn}>
      <div className={styles.label}>Количество полей</div>
      <div className={styles.value}>{count}</div>
    </div>
  );
};

export default CountColumnComponent;
