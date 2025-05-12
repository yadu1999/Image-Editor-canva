
    import { useState, useEffect, useCallback } from 'react';

    const MAX_HISTORY_LENGTH = 30;

    const useHistoryManager = (initialPages, initialActivePageIndex, setPagesContext, setActivePageIndexContext) => {
      const [history, setHistory] = useState([{ pages: initialPages, activePageIndex: initialActivePageIndex }]);
      const [currentIndex, setCurrentIndex] = useState(0);

      useEffect(() => {
         setHistory([{ pages: initialPages, activePageIndex: initialActivePageIndex }]);
         setCurrentIndex(0);
      }, []);


      const recordHistory = useCallback(() => {
        const currentPages = JSON.parse(localStorage.getItem('editorPages') || '[]');
        const currentActiveIdx = parseInt(localStorage.getItem('editorActivePageIndex') || '0', 10);

        if (currentPages.length > 0) {
            const newHistoryEntry = { pages: currentPages, activePageIndex: currentActiveIdx };
            
            setHistory(prevHistory => {
                const historyToUpdate = prevHistory.slice(0, currentIndex + 1);
                const updatedHistory = [...historyToUpdate, newHistoryEntry];
                
                let finalHistory;
                if (updatedHistory.length > MAX_HISTORY_LENGTH) {
                    finalHistory = updatedHistory.slice(updatedHistory.length - MAX_HISTORY_LENGTH);
                } else {
                    finalHistory = updatedHistory;
                }
                
                setCurrentIndex(finalHistory.length - 1);
                return finalHistory;
            });
        }
      }, [currentIndex]);


      const undo = useCallback(() => {
        if (currentIndex > 0) {
          const newIndex = currentIndex - 1;
          setCurrentIndex(newIndex);
          const { pages: pagesToRestore, activePageIndex: activeIndexToRestore } = history[newIndex];
          setPagesContext(pagesToRestore);
          setActivePageIndexContext(activeIndexToRestore);
        }
      }, [currentIndex, history, setPagesContext, setActivePageIndexContext]);

      const redo = useCallback(() => {
        if (currentIndex < history.length - 1) {
          const newIndex = currentIndex + 1;
          setCurrentIndex(newIndex);
          const { pages: pagesToRestore, activePageIndex: activeIndexToRestore } = history[newIndex];
          setPagesContext(pagesToRestore);
          setActivePageIndexContext(activeIndexToRestore);
        }
      }, [currentIndex, history, setPagesContext, setActivePageIndexContext]);

      const canUndo = currentIndex > 0;
      const canRedo = currentIndex < history.length - 1 && history.length > 1;

      return {
        recordHistory,
        undo,
        redo,
        canUndo,
        canRedo,
        history, 
        currentIndex
      };
    };

    export default useHistoryManager;
  