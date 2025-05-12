
    import React from 'react';
    import { useAppContext } from '@/context/AppContext';
    import { useToast } from '@/components/ui/use-toast';
    import { v4 as uuidv4 } from 'uuid';

    const useImageHandler = (appContext, toastInstance, addElementFn, recordHistoryFn) => {
      const { uploadedImages, addUploadedImageToContext, activePageIndex, updatePageElements } = appContext;

      const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            recordHistoryFn();
            const newImage = { id: `uploaded-${uuidv4()}`, src: reader.result, alt: file.name };
            addUploadedImageToContext(newImage);
            
            const newImageElement = {
              id: uuidv4(),
              type: 'image',
              src: reader.result,
              x: 0,
              y: 0,
              width: 320,
              height: 320,
              alt: file.name
            };
            updatePageElements(activePageIndex, [newImageElement]);
            toastInstance({
              title: "Image Uploaded",
              description: `${file.name} has been uploaded and set as canvas image.`,
            });
          };
          reader.readAsDataURL(file);
        } else {
          toastInstance({
            variant: "destructive",
            title: "Upload Failed",
            description: "Please select a valid image file.",
          });
        }
      };

      const handleSelectUploadedImage = (imageSrc) => {
        recordHistoryFn();
        const newImageElement = {
          type: 'image',
          src: imageSrc,
          x: 0,
          y: 0,
          width: 320,
          height: 320,
          alt: 'Uploaded Image'
        };
        updatePageElements(activePageIndex, [{...newImageElement, id: uuidv4()}]);
        toastInstance({
         title: "Image Applied",
         description: "Uploaded image set on canvas.",
       });
      };
      
      const handleSelectTemplate = (templateSrc) => {
        recordHistoryFn();
        const newImageElement = {
          type: 'image',
          src: templateSrc,
          x: 0,
          y: 0,
          width: 320, 
          height: 320,
          alt: 'Template Image'
        };
        updatePageElements(activePageIndex, [{...newImageElement, id: uuidv4()}]);
        toastInstance({
          title: "Template Applied",
          description: "The selected template has been loaded to the canvas.",
        });
      };

      return {
        uploadedImages,
        handleImageUpload,
        handleSelectUploadedImage,
        handleSelectTemplate,
      };
    };

    export default useImageHandler;
  