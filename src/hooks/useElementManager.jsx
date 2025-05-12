
    import React from 'react';
    import { useAppContext } from '@/context/AppContext';
    import { useToast } from '@/components/ui/use-toast';
    import { v4 as uuidv4 } from 'uuid';

    const useElementManager = (appContext, toastInstance, recordHistoryFn, selectedElementId, setSelectedElementId) => {
      const { pages, activePageIndex, addElement: addElementContext, updateElement: updateElementContext, deleteElement: deleteElementContext } = appContext;
      
      const currentElements = pages[activePageIndex]?.elements || [];

      const addElementToPage = (elementData) => {
        recordHistoryFn();
        addElementContext(activePageIndex, { ...elementData, id: uuidv4() });
      };

      const updateElementOnPage = (elementId, updates) => {
        recordHistoryFn();
        updateElementContext(activePageIndex, elementId, updates);
      };

      const deleteElementFromPage = (elementId) => {
        recordHistoryFn();
        deleteElementContext(activePageIndex, elementId);
        setSelectedElementId(null);
        toastInstance({
            title: "Element Deleted",
            description: "The selected element has been removed from the canvas.",
        });
      };
      
      const duplicateElementOnPage = (elementId) => {
        const elementToDuplicate = currentElements.find(el => el.id === elementId);
        if (elementToDuplicate) {
          recordHistoryFn();
          const newElement = {
            ...elementToDuplicate,
            id: uuidv4(),
            x: (elementToDuplicate.x || 0) + 10,
            y: (elementToDuplicate.y || 0) + 10,
          };
          addElementContext(activePageIndex, newElement);
          setSelectedElementId(newElement.id);
          toastInstance({
            title: "Element Duplicated",
            description: "The selected element has been duplicated.",
          });
        }
      };

      return {
        currentElements,
        addElementToPage,
        updateElementOnPage,
        deleteElementFromPage,
        duplicateElementOnPage,
      };
    };

    export default useElementManager;
  