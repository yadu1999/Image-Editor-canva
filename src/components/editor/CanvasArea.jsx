
    import React, { useState, useEffect, useRef } from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Slider } from '@/components/ui/slider';
    import { Input } from '@/components/ui/input';
    import IconRenderer from '@/components/IconRenderer';
    import CanvasToolbar from '@/components/editor/CanvasToolbar';

    const CanvasElement = ({ element, isSelected, onSelect, onUpdate }) => {
      const [isEditing, setIsEditing] = useState(false);
      const [editText, setEditText] = useState(element.content);
      const inputRef = useRef(null);

      const handleDoubleClick = () => {
        if (element.type === 'text') {
          setIsEditing(true);
          setEditText(element.content);
        }
      };

      const handleTextChange = (e) => {
        setEditText(e.target.value);
      };

      const handleTextBlur = () => {
        setIsEditing(false);
        onUpdate(element.id, { content: editText });
      };
      
      const handleTextKeyDown = (e) => {
        if (e.key === 'Enter') {
          inputRef.current?.blur();
        }
      };

      useEffect(() => {
        if (isEditing && inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, [isEditing]);
      
      const style = {
        position: 'absolute',
        left: `${element.x}px`,
        top: `${element.y}px`,
        width: element.width ? `${element.width}px` : 'auto',
        height: element.height ? `${element.height}px` : 'auto',
        transform: `rotate(${element.rotation || 0}deg)`,
        color: element.color,
        fontSize: element.fontSize ? `${element.fontSize}px` : 'inherit',
        border: isSelected ? '2px dashed #9333ea' : 'none',
        cursor: 'pointer',
        userSelect: 'none' 
      };

      if (element.type === 'image') {
        return (
          <img 
            src={element.src} 
            alt={element.alt || 'canvas element'} 
            style={style} 
            className="object-contain"
            onClick={() => onSelect(element.id)} 
            onDoubleClick={handleDoubleClick}
          />
        );
      }
      if (element.type === 'text') {
        if (isEditing) {
          return (
            <Input
              ref={inputRef}
              type="text"
              value={editText}
              onChange={handleTextChange}
              onBlur={handleTextBlur}
              onKeyDown={handleTextKeyDown}
              style={{ ...style, zIndex: 10, border: '1px solid #9333ea', outline: 'none', minWidth: '50px' }}
              className="bg-white p-0 m-0 absolute"
            />
          );
        }
        return (
            <div 
                style={style} 
                onClick={() => onSelect(element.id)} 
                onDoubleClick={handleDoubleClick}
                className="whitespace-pre-wrap"
            >
                {element.content}
            </div>
        );
      }
      return null;
    };


    const CanvasArea = ({ elements, onAddPage, selectedElementId, onElementSelect, onElementUpdate, onCanvasToolbarAction, pagesCount, currentPageIndex, onPageChange }) => {
      const [zoomLevel, setZoomLevel] = useState(50); 
      const canvasWidth = 320;
      const canvasHeight = 320;

      const displayWidth = canvasWidth * (zoomLevel / 50);
      const displayHeight = canvasHeight * (zoomLevel / 50);
      
      const handlePageNavigation = (direction) => {
        const newIndex = direction === 'prev' ? currentPageIndex - 1 : currentPageIndex + 1;
        if (newIndex >= 0 && newIndex < pagesCount) {
          onPageChange(newIndex);
        }
      };


      return (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
          className="flex-grow bg-canva-bg-tertiary flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden"
        >
          {selectedElementId && <CanvasToolbar onAction={onCanvasToolbarAction} />}
          
          <motion.div 
            className="bg-white shadow-2xl rounded-sm overflow-hidden relative"
            style={{ 
                width: `${displayWidth}px`, 
                height: `${displayHeight}px` 
            }}
            drag 
            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
            whileHover={{ boxShadow: "0px 15px 35px rgba(0,0,0,0.15)" }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={(e) => { if (e.target === e.currentTarget) onElementSelect(null); }}
          >
            <div 
                className="absolute top-0 left-0 origin-top-left"
                style={{ transform: `scale(${zoomLevel / 50})`, width: `${canvasWidth}px`, height: `${canvasHeight}px`}}
            >
                {elements.length === 0 ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                        <p className="text-gray-400">Canvas is empty. Add elements from the sidebar.</p>
                    </div>
                ) : (
                    elements.map(element => (
                      <CanvasElement 
                        key={element.id} 
                        element={element} 
                        isSelected={element.id === selectedElementId}
                        onSelect={onElementSelect}
                        onUpdate={onElementUpdate}
                      />
                    ))
                )}
            </div>
          </motion.div>
          
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={() => handlePageNavigation('prev')} disabled={currentPageIndex === 0} className="bg-white hover:bg-slate-50 shadow-md border-slate-300 text-slate-700">
                <IconRenderer name="ChevronLeft" size={18} />
            </Button>
            <span className="text-sm text-slate-700 bg-white px-3 py-1.5 rounded-md shadow-md border-slate-300">Page {currentPageIndex + 1} of {pagesCount}</span>
            <Button variant="outline" size="icon" onClick={() => handlePageNavigation('next')} disabled={currentPageIndex === pagesCount - 1} className="bg-white hover:bg-slate-50 shadow-md border-slate-300 text-slate-700">
                <IconRenderer name="ChevronRight" size={18} />
            </Button>
          </div>


          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
            className="absolute bottom-4 right-4 flex items-center gap-2 bg-white p-1.5 rounded-lg shadow-md border border-slate-200"
          >
            <Button variant="ghost" size="icon" className="text-slate-600 hover:bg-slate-100 h-8 w-8" onClick={() => setZoomLevel(Math.max(10, zoomLevel - 5))}>
              <IconRenderer name="ZoomOut" size={18}/>
            </Button>
            <div className="w-20">
                <Slider
                    value={[zoomLevel]}
                    max={200}
                    min={10}
                    step={1}
                    onValueChange={(value) => setZoomLevel(value[0])}
                    className="[&>span:first-child]:h-1 [&>span:first-child>span]:bg-canva-purple [&>span:first-child>span]:h-1"
                />
            </div>
            <span className="text-xs font-medium text-slate-700 w-10 text-center">{zoomLevel}%</span>
            <Button variant="ghost" size="icon" className="text-slate-600 hover:bg-slate-100 h-8 w-8" onClick={() => setZoomLevel(Math.min(200, zoomLevel + 5))}>
              <IconRenderer name="ZoomIn" size={18}/>
            </Button>
            <div className="w-px h-5 bg-slate-200"></div>
             <Button variant="ghost" size="icon" className="text-slate-600 hover:bg-slate-100 h-8 w-8">
              <IconRenderer name="Maximize2" size={18}/>
            </Button>
          </motion.div>

           <Button onClick={onAddPage} variant="outline" className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white hover:bg-slate-50 shadow-md border-slate-300 text-slate-700 text-sm px-4 py-2">
              <IconRenderer name="Plus" className="mr-2" size={16} />
              Add page
            </Button>
        </motion.div>
      );
    };

    export default CanvasArea;
  