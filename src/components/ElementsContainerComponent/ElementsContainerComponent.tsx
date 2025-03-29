import ElementComponent from '../ElementComponent/ElementComponent';
import styles from './ElementsContainerComponent.module.scss';

interface ElementsContainerProps {
  urls: Array<{ name: string; url: string }>;
  currentURL_ID: number;
  setCurrentURL_ID: (id: number) => void;
}

const ElementsContainerComponent: React.FC<ElementsContainerProps> = ({
  urls,
  currentURL_ID,
  setCurrentURL_ID
}) => {
  return (
    <div className={styles.container}>
      {urls.map((url, index) => (
        <ElementComponent
          key={index}
          name={url.name}
          isSelected={currentURL_ID === index}
          onClick={() => setCurrentURL_ID(index)}
        />
      ))}
    </div>
  );
};

export default ElementsContainerComponent;
