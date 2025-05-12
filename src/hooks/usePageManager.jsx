
    import React from 'react';
    import { useAppContext } from '@/context/AppContext'; 
    import { useToast } from '@/components/ui/use-toast';

    const usePageManager = (appContext, toastInstance, recordHistoryFn) => {
      const { pages, activePageIndex, addPage: addPageContext, setActivePageIndex: setActivePageIndexContext } = appContext;

      const handleAddPage = () => {
        recordHistoryFn();
        addPageContext();
        toastInstance({
            title: "Page Added",
            description: "A new blank page has been added.",
        });
      };

      const setActivePageIndexWithHistory = (index) => {
        recordHistoryFn();
        setActivePageIndexContext(index);
      };

      return {
        pages,
        activePageIndex,
        handleAddPage,
        setActivePageIndexWithHistory,
      };
    };

    export default usePageManager;
  