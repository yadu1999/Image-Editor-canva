
    import React, { useState } from 'react';
    import { AnimatePresence } from 'framer-motion';
    import TopBar from '@/components/editor/TopBar';
    import MainSidebar from '@/components/editor/MainSidebar';
    import SecondaryPanel from '@/components/editor/SecondaryPanel';
    import CanvasArea from '@/components/editor/CanvasArea';
    import { useAppContext } from '@/context/AppContext';
    import { useToast } from '@/components/ui/use-toast';
    import { v4 as uuidv4 } from 'uuid';

    import usePageManager from '@/hooks/usePageManager';
    import useElementManager from '@/hooks/useElementManager';
    import useImageHandler from '@/hooks/useImageHandler';
    import useTextHandler from '@/hooks/useTextHandler';
    import useHistoryManager from '@/hooks/useHistoryManager';

    const initialTemplates = [
      { id: 'template1', src: 'https://images.unsplash.com/photo-1592786127407-06d545db6c02?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600', alt: 'Modern Labour Day Greeting' },
      { id: 'template2', src: 'https://images.unsplash.com/photo-1588801732842-5b0f27ebb9b9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600', alt: 'Vintage Quill and Ink' },
      { id: 'template3', src: 'https://images.unsplash.com/photo-1690192079529-9fd57e5b24d0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600', alt: 'Corporate Team Presentation' },
      { id: 'template4', src: 'https://images.unsplash.com/photo-1581237301169-d323c295c998?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600', alt: 'Abstract City Skyline' },
    ];
    
    const EditorPage = () => {
      const appCtx = useAppContext();
      const { toast } = useToast();
      const [activeTool, setActiveTool] = useState('design');
      const [selectedElementId, setSelectedElementId] = useState(null);
      const [templates] = useState(initialTemplates);

      const { canUndo, canRedo, undo, redo, recordHistory } = useHistoryManager(appCtx.pages, appCtx.activePageIndex, appCtx.setPages, appCtx.setActivePageIndex);
      
      const { 
        pages, 
        activePageIndex, 
        handleAddPage, 
        setActivePageIndexWithHistory 
      } = usePageManager(appCtx, toast, recordHistory);

      const { 
        currentElements, 
        addElementToPage, 
        updateElementOnPage, 
        deleteElementFromPage,
        duplicateElementOnPage
      } = useElementManager(appCtx, toast, recordHistory, selectedElementId, setSelectedElementId);
      
      const { 
        uploadedImages, 
        handleImageUpload, 
        handleSelectUploadedImage, 
        handleSelectTemplate 
      } = useImageHandler(appCtx, toast, addElementToPage, recordHistory);
      
      const { 
        handleAddTextElement 
      } = useTextHandler(addElementToPage, toast, setActiveTool, recordHistory);

      const handleSelectTool = (toolId) => {
        if (activeTool === toolId) {
          setActiveTool(null); 
        } else {
          setActiveTool(toolId);
          setSelectedElementId(null);
        }
      };

      const handleElementSelect = (elementId) => {
        setSelectedElementId(elementId === selectedElementId ? null : elementId);
      };

      const handleElementUpdate = (elementId, updates) => {
        updateElementOnPage(elementId, updates);
      };
      
      const handleElementDelete = () => {
        if (selectedElementId) {
          deleteElementFromPage(selectedElementId);
        } else {
          toast({ title: "No element selected", description: "Click an element on the canvas to select it first.", variant: "destructive" });
        }
      };

      const handleElementDuplicate = () => {
        if (selectedElementId) {
          duplicateElementOnPage(selectedElementId);
        } else {
          toast({ title: "No element selected", description: "Click an element on the canvas to select it first.", variant: "destructive" });
        }
      };

      const handleCanvasToolbarAction = (action) => {
        if (!selectedElementId && !['undo', 'redo'].includes(action)) {
          toast({ title: "No element selected", description: "Please select an element first.", variant: "destructive" });
          return;
        }
        switch (action) {
          case 'delete':
            handleElementDelete();
            break;
          case 'duplicate':
            handleElementDuplicate();
            break;
          case 'color':
          case 'animate':
          case 'position':
          case 'lock':
            toast({ title: "Coming Soon!", description: `The "${action}" feature is under development.`});
            break;
          default:
            break;
        }
      };
      
      return (
        <div className="flex flex-col h-screen overflow-hidden bg-canva-bg-secondary">
          <TopBar onUndo={undo} onRedo={redo} canUndo={canUndo} canRedo={canRedo} />
          <div className="flex flex-row flex-grow overflow-hidden">
            <MainSidebar onSelectTool={handleSelectTool} activeTool={activeTool} />
            <AnimatePresence>
              {activeTool && (
                <SecondaryPanel
                  activeTool={activeTool}
                  templates={templates}
                  uploadedImages={uploadedImages}
                  onSelectTemplate={handleSelectTemplate}
                  onImageUpload={handleImageUpload}
                  onSelectUploadedImage={handleSelectUploadedImage}
                  onAddTextElement={handleAddTextElement}
                />
              )}
            </AnimatePresence>
            <CanvasArea 
              elements={currentElements} 
              onAddPage={handleAddPage}
              selectedElementId={selectedElementId}
              onElementSelect={handleElementSelect}
              onElementUpdate={handleElementUpdate}
              onCanvasToolbarAction={handleCanvasToolbarAction}
              pagesCount={pages.length}
              currentPageIndex={activePageIndex}
              onPageChange={setActivePageIndexWithHistory}
            />
          </div>
        </div>
      );
    };

    export default EditorPage;
  