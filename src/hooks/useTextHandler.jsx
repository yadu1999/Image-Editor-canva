
    import React from 'react';
    import { useAppContext } from '@/context/AppContext';
    import { useToast } from '@/components/ui/use-toast';
    import { v4 as uuidv4 } from 'uuid';

    const useTextHandler = (addElementFn, toastInstance, setActiveToolFn, recordHistoryFn) => {
      
      const handleAddTextElement = (textType = 'heading') => {
        recordHistoryFn();
        let content = "Add a heading";
        let fontSize = 32;
        let width = 220;
        if (textType === 'subheading') {
            content = "Add a subheading";
            fontSize = 24;
            width = 200;
        } else if (textType === 'body') {
            content = "Add a little bit of body text";
            fontSize = 16;
            width = 180;
        }

        const newTextElement = {
          type: 'text',
          content: content,
          x: 50,
          y: 50,
          width: width,
          color: '#000000',
          fontSize: fontSize,
        };
        addElementFn(newTextElement);
        setActiveToolFn('text'); 
        toastInstance({
          title: "Text Added",
          description: `A new ${textType} has been added to the canvas.`,
        });
      };
      
      return {
        handleAddTextElement,
      };
    };

    export default useTextHandler;
  