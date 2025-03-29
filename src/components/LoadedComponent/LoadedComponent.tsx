import React from 'react';
import styles from './LoadedComponent.module.scss';

const LoadedComponent: React.FC = () => {
  return <div className={styles.loaded}>Данные загружены</div>;
};

export default LoadedComponent;
