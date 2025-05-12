
    import React, { useRef } from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
    import IconRenderer from '@/components/IconRenderer';

    const SecondaryPanel = ({ 
        activeTool, 
        templates, 
        uploadedImages, 
        onSelectTemplate, 
        onImageUpload, 
        onSelectUploadedImage,
        onAddTextElement 
    }) => {
      const fileInputRef = useRef(null);

      const handleUploadButtonClick = () => {
        fileInputRef.current?.click();
      };
      
      if (!activeTool) return null;

      const panelContentData = {
        design: {
          title: "Design",
          tabs: ["Templates", "Styles"],
          searchPlaceholder: "Search templates...",
          categories: [
            { name: "Mother's day", type: "category" },
            { name: "Food", type: "category" },
            { name: "Hiring", type: "category" },
            { name: "Business", type: "category" },
          ],
          gallery: templates || []
        },
        elements: { title: "Elements", tabs: ["Search", "Lines & Shapes", "Graphics", "Stickers"], searchPlaceholder: "Search elements...", message: "Explore various design elements." },
        text: { 
            title: "Text", 
            tabs: ["Add Text"], 
            searchPlaceholder: "Search fonts...", 
            actions: [
                { label: "Add a heading", type: "heading", style: "text-2xl font-bold" },
                { label: "Add a subheading", type: "subheading", style: "text-xl font-semibold" },
                { label: "Add some body text", type: "body", style: "text-base" },
            ]
        },
        uploads: {
          title: "Uploads",
          searchPlaceholder: "Search your uploads...",
          gallery: uploadedImages || []
        },
        brand: { title: "Brand", message: "Manage your brand assets." },
        draw: { title: "Draw", message: "Drawing tools will appear here." },
        projects: { title: "Projects", message: "Your projects will be listed here." },
        apps: { title: "Apps", message: "Integrate with other apps." },
        photos: { title: "Photos", searchPlaceholder: "Search millions of photos...", message: "Browse stock photos." },
        videos: { title: "Videos", searchPlaceholder: "Search videos...", message: "Browse stock videos." },
      };

      const currentPanel = panelContentData[activeTool] || { title: activeTool.charAt(0).toUpperCase() + activeTool.slice(1), tabs: [], searchPlaceholder: "Search..."};

      return (
        <motion.div
          initial={{ x: -320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -320, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-80 bg-white border-r border-slate-200 flex flex-col flex-shrink-0"
        >
          <div className="p-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-canva-text-primary mb-3">{currentPanel.title}</h2>
            {currentPanel.searchPlaceholder && (
                <div className="relative">
                <Input 
                    type="text" 
                    placeholder={currentPanel.searchPlaceholder}
                    className="bg-slate-100 border-transparent focus:ring-1 focus:ring-canva-purple focus:border-canva-purple pl-10 text-sm text-canva-text-primary placeholder-canva-text-secondary"
                />
                <IconRenderer name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-canva-text-secondary" />
                </div>
            )}
          </div>
          
          {currentPanel.tabs && currentPanel.tabs.length > 0 && (
            <div className="p-2 border-b border-slate-200">
              <Tabs defaultValue={currentPanel.tabs[0].toLowerCase().replace(/\s+/g, '')} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-slate-100 rounded-md">
                  {currentPanel.tabs.map(tab => (
                    <TabsTrigger 
                      key={tab} 
                      value={tab.toLowerCase().replace(/\s+/g, '')} 
                      className="text-xs data-[state=active]:bg-white data-[state=active]:text-canva-purple data-[state=active]:shadow-sm text-canva-text-secondary"
                    >
                      {tab}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          )}
          
          <div className="flex-grow overflow-y-auto p-4 space-y-3">
            {activeTool === 'uploads' && (
              <>
                <Button onClick={handleUploadButtonClick} className="w-full bg-canva-purple hover:bg-canva-purple/90 text-sm text-white">
                  <IconRenderer name="Upload" size={18} className="mr-2"/> Upload file
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={onImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                 {currentPanel.gallery.length === 0 && <p className="text-sm text-canva-text-secondary text-center py-4">No images uploaded yet. Click above to upload.</p>}
              </>
            )}

            {activeTool === 'text' && currentPanel.actions && (
                currentPanel.actions.map(action => (
                    <Button 
                        key={action.type} 
                        onClick={() => onAddTextElement(action.type)} 
                        variant="outline" 
                        className="w-full justify-start text-canva-text-primary hover:border-canva-purple hover:text-canva-purple py-3"
                    >
                       <span className={action.style}>{action.label}</span>
                    </Button>
                ))
            )}

            {currentPanel.categories && activeTool === 'design' && currentPanel.categories.map((item, index) => (
              <div key={index}>
                <Button variant="outline" className="w-full justify-start text-canva-text-secondary hover:border-canva-purple hover:text-canva-purple text-sm">
                  {item.name}
                </Button>
              </div>
            ))}

            {currentPanel.gallery && (activeTool === 'design' || activeTool === 'uploads') && currentPanel.gallery.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {currentPanel.gallery.map((image) => (
                  <motion.div
                    key={image.id}
                    className="rounded-md aspect-square object-cover cursor-pointer overflow-hidden relative group bg-slate-100"
                    onClick={() => activeTool === 'design' ? onSelectTemplate(image.src) : onSelectUploadedImage(image.src)}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img src={image.src} alt={image.alt} className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"/>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <IconRenderer name="Pointer" size={24} className="text-white"/>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            {currentPanel.message && !currentPanel.gallery && activeTool !== 'text' && (
              <p className="text-sm text-canva-text-secondary text-center py-4">{currentPanel.message}</p>
            )}
            
          </div>
        </motion.div>
      );
    };

    export default SecondaryPanel;
  