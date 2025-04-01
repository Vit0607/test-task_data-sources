import React, { useState } from 'react';
import MenuComponent from '../MenuComponent/MenuComponent';
import BodyComponent from '../BodyComponent/BodyComponent';
import styles from './MainComponent.module.scss';
import SourceModal from '../SourceModal/SourceModal';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';

export interface URLItem {
  name: string;
  url: string;
}

const MainComponent = () => {
  const [state, setState] = useState({
    urls: [] as URLItem[],
    loadedJSON: null as any,
    countRows: 0,
    countColumns: 0,
    statusLoadedJSON: false,
    currentURL_ID: -1
  });

  const [modalState, setModalState] = useState({
    isAddModalOpen: false,
    isEditModalOpen: false,
    isDeleteModalOpen: false,
    editingIndex: -1,
    tempSource: { name: '', url: '' }
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

  // Обработчики действий
  const handleAddSource = () => {
    setModalState(prev => ({
      ...prev,
      isAddModalOpen: true,
      tempSource: { name: '', url: '' }
    }));
  };

  const handleEditSource = () => {
    if (state.currentURL_ID === -1) return;

    setModalState(prev => ({
      ...prev,
      isEditModalOpen: true,
      editingIndex: state.currentURL_ID,
      tempSource: state.urls[state.currentURL_ID]
    }));
  };

  const handleDeleteSource = () => {
    if (state.currentURL_ID === -1) return;

    setModalState(prev => ({
      ...prev,
      isDeleteModalOpen: true
    }));
  };

  // Сохранение изменений
  const handleSaveSource = (name: string, url: string) => {
    const newSource = { name, url };

    setState(prev => {
      const newUrls = [...prev.urls];
      if (modalState.editingIndex > -1) {
        newUrls[modalState.editingIndex] = newSource;
      } else {
        newUrls.push(newSource);
      }
      return {
        ...prev,
        urls: newUrls,
        currentURL_ID:
          modalState.editingIndex > -1
            ? modalState.editingIndex
            : newUrls.length - 1
      };
    });

    setModalState(prev => ({
      ...prev,
      isAddModalOpen: false,
      isEditModalOpen: false,
      editingIndex: -1
    }));
  };

  // Удаление источника
  const handleConfirmDelete = () => {
    setState(prev => ({
      ...prev,
      urls: prev.urls.filter((_, i) => i !== prev.currentURL_ID),
      currentURL_ID: -1
    }));

    setModalState(prev => ({
      ...prev,
      isDeleteModalOpen: false
    }));
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
        onAdd={handleAddSource}
        onEdit={handleEditSource}
        onDelete={handleDeleteSource}
      />

      <SourceModal
        isOpen={modalState.isAddModalOpen || modalState.isEditModalOpen}
        mode={modalState.isAddModalOpen ? 'add' : 'edit'}
        initialName={modalState.tempSource.name}
        initialUrl={modalState.tempSource.url}
        onSave={handleSaveSource}
        onCancel={() =>
          setModalState(prev => ({
            ...prev,
            isAddModalOpen: false,
            isEditModalOpen: false
          }))
        }
      />

      <DeleteConfirmationModal
        isOpen={modalState.isDeleteModalOpen}
        sourceName={state.urls[state.currentURL_ID]?.name || ''}
        onConfirm={handleConfirmDelete} // Привязка функции подтверждения
        onCancel={() =>
          setModalState(prev => ({
            ...prev,
            isDeleteModalOpen: false
          }))
        }
      />
    </div>
  );
};

export default MainComponent;
