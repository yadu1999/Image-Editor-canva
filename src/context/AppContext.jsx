
    import React, { createContext, useState, useContext, useEffect } from 'react';
    import { v4 as uuidv4 } from 'uuid';
    import image from '../../public/labourDay.png'

    const AppContext = createContext();

   
    const createInitialPage = () => ({
      id: uuidv4(),
      elements: [
        {
          id: uuidv4(),
          type: 'image',
          src: image,
          x: 0,
          y: 0,
          width: 320,
          height: 320,
          rotation: 0,
          alt: 'Initial Design'
        }
      ]
    });
    
    const createNewBlankPage = () => ({
      id: uuidv4(),
      elements: []
    });

    export const AppProvider = ({ children }) => {
      const [pages, setPages] = useState(() => {
        const savedPages = localStorage.getItem('editorPages');
        if (savedPages) {
          try {
            const parsedPages = JSON.parse(savedPages);
            return parsedPages.length > 0 ? parsedPages : [createInitialPage()];
          } catch (e) {
            return [createInitialPage()];
          }
        }
        return [createInitialPage()];
      });

      const [activePageIndex, setActivePageIndexState] = useState(() => {
        const savedIndex = localStorage.getItem('editorActivePageIndex');
        const parsedIndex = savedIndex ? parseInt(savedIndex, 10) : 0;
        return (pages.length > 0 && parsedIndex < pages.length) ? parsedIndex : 0;
      });
      
      const [uploadedImages, setUploadedImagesState] = useState(() => {
        const savedUploadedImages = localStorage.getItem('uploadedImages');
        return savedUploadedImages ? JSON.parse(savedUploadedImages) : [];
      });

      useEffect(() => {
        localStorage.setItem('editorPages', JSON.stringify(pages));
      }, [pages]);

      useEffect(() => {
         if (pages.length > 0 && activePageIndex < pages.length) {
            localStorage.setItem('editorActivePageIndex', activePageIndex.toString());
         } else if (pages.length === 0) {
            localStorage.setItem('editorActivePageIndex', '0');
         }
      }, [activePageIndex, pages]);
      
      useEffect(() => {
        localStorage.setItem('uploadedImages', JSON.stringify(uploadedImages));
      }, [uploadedImages]);
      
      const setActivePageIndex = (index) => {
        if (index >= 0 && index < pages.length) {
          setActivePageIndexState(index);
        } else if (pages.length === 0 && index === 0) {
          setActivePageIndexState(0);
        }
      };

      const addPage = () => {
        const newPage = createNewBlankPage();
        setPages(prevPages => {
          const updatedPages = [...prevPages, newPage];
          setActivePageIndexState(updatedPages.length - 1);
          return updatedPages;
        });
        return newPage.id; 
      };
      
      const addElement = (pageIndex, element) => {
        setPages(prevPages => 
          prevPages.map((page, index) => 
            index === pageIndex 
              ? { ...page, elements: [...page.elements, { ...element, rotation: element.rotation || 0 }] } 
              : page
          )
        );
      };
      
      const updatePageElements = (pageIndex, newElements) => {
         setPages(prevPages => 
          prevPages.map((page, index) => 
            index === pageIndex 
              ? { ...page, elements: newElements.map(el => ({ ...el, rotation: el.rotation || 0})) } 
              : page
          )
        );
      };

      const updateElement = (pageIndex, elementId, updates) => {
        setPages(prevPages =>
          prevPages.map((page, index) => {
            if (index === pageIndex) {
              return {
                ...page,
                elements: page.elements.map(el =>
                  el.id === elementId ? { ...el, ...updates, rotation: el.rotation || 0 } : el
                ),
              };
            }
            return page;
          })
        );
      };

      const deleteElement = (pageIndex, elementId) => {
        setPages(prevPages =>
          prevPages.map((page, index) => {
            if (index === pageIndex) {
              return {
                ...page,
                elements: page.elements.filter(el => el.id !== elementId),
              };
            }
            return page;
          })
        );
      };
      
      const addUploadedImageToContext = (image) => {
        setUploadedImagesState(prev => [image, ...prev.filter(img => img.id !== image.id)]);
      };


      return (
        <AppContext.Provider value={{ 
          pages, 
          setPages,
          activePageIndex, 
          setActivePageIndex, 
          addPage, 
          addElement, 
          updateElement,
          deleteElement,
          updatePageElements,
          uploadedImages,
          addUploadedImageToContext
        }}>
          {children}
        </AppContext.Provider>
      );
    };

    export const useAppContext = () => {
      const context = useContext(AppContext);
      if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
      }
      return context;
    };
  