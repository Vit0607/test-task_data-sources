import styles from './JSONComponent.module.scss';

interface JSONProps {
  json: any;
}

const JSONComponent: React.FC<JSONProps> = ({ json }) => {
  return (
    <div className={styles.jsonContainer}>
      <pre>{json ? JSON.stringify(json, null, 2) : '\u00A0'}</pre>
    </div>
  );
};

export default JSONComponent;
