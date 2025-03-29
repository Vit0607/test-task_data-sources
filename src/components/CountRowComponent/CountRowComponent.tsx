import React from 'react';
import styles from './CountRowComponent.module.scss';

interface CountRowProps {
  count: number;
}

const CountRowComponent: React.FC<CountRowProps> = ({ count }) => {
  return (
    <div className={styles.countRow}>
      <div className={styles.label}>Количество записей</div>
      <div className={styles.value}>{count}</div>
    </div>
  );
};

export default CountRowComponent;
