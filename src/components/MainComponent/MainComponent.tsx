import React, { useState } from 'react';
import MenuComponent from '../MenuComponent/MenuComponent';
import BodyComponent from '../BodyComponent/BodyComponent';
import styles from './MainComponent.module.scss';

export interface URLItem {
  name: string;
  url: string;
}

const MainComponent: React.FC = () => {
  const [state, setState] = useState({
    urls: [] as URLItem[],
    loadedJSON: null as any,
    countRows: 0,
    countColumns: 0,
    statusLoadedJSON: false,
    currentURL_ID: -1
  });

  // Загрузка из Local Storage
  const handleLoadFromStorage = () => {
    const stored = localStorage.getItem('urls');
    if (stored) {
      setState(prev => ({ ...prev, urls: JSON.parse(stored) }));
    }
  };

  // Сохранение в Local Storage
  const handleSaveToStorage = () => {
    localStorage.setItem('urls', JSON.stringify(state.urls));
  };

  // Загрузка из файла
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        const urls = (e.target?.result as string)
          .split('\n')
          .filter(url => url.trim()) // Игнорируем пустые строки
          .map((url, i) => ({
            name: `Источник ${i + 1}`, // Изменено здесь
            url: url.trim()
          }));
        setState(prev => ({ ...prev, urls }));
      };
      reader.readAsText(file);
    }
  };

  // Расчет данных
  const handleCalculate = async () => {
    if (state.currentURL_ID === -1) return;

    try {
      const response = await fetch(state.urls[state.currentURL_ID].url);
      if (!response.ok) throw new Error('Ошибка загрузки');

      const json = await response.json();

      let countRows = 0;
      let countColumns = 0;

      if (Array.isArray(json)) {
        countRows = json.length;
        if (json[0]) countColumns = Object.keys(json[0]).length;
      } else if (typeof json === 'object') {
        countRows = 1;
        countColumns = Object.keys(json).length;
      }

      setState(prev => ({
        ...prev,
        loadedJSON: json,
        countRows,
        countColumns,
        statusLoadedJSON: true
      }));
    } catch (error) {
      console.error('Ошибка:', error);
      setState(prev => ({
        ...prev,
        statusLoadedJSON: false,
        loadedJSON: null,
        countRows: 0,
        countColumns: 0
      }));
    }
  };

  return (
    <div className={styles.main}>
      <MenuComponent
        onFileUpload={handleFileUpload}
        onLoad={handleLoadFromStorage}
        onSave={handleSaveToStorage}
        onCalculate={handleCalculate}
        statusLoaded={state.statusLoadedJSON}
      />
      <BodyComponent
        urls={state.urls}
        currentURL_ID={state.currentURL_ID}
        setCurrentURL_ID={id =>
          setState(prev => ({ ...prev, currentURL_ID: id }))
        }
        loadedJSON={state.loadedJSON}
        countRows={state.countRows}
        countColumns={state.countColumns}
      />
    </div>
  );
};

export default MainComponent;
