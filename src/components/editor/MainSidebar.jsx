
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import IconRenderer from '@/components/IconRenderer';

    const MainSidebar = ({ onSelectTool, activeTool }) => {
      const mainTools = [
        { id: 'design', label: 'Design', icon: 'Palette' },
        { id: 'elements', label: 'Elements', icon: 'MousePointerSquare' },
        { id: 'text', label: 'Text', icon: 'Type' },
        { id: 'brand', label: 'Brand', icon: 'Star' },
        { id: 'uploads', label: 'Uploads', icon: 'UploadCloud' },
        { id: 'draw', label: 'Draw', icon: 'PenTool' },
        { id: 'projects', label: 'Projects', icon: 'FolderKanban' },
        { id: 'apps', label: 'Apps', icon: 'AppWindow' },
        { id: 'photos', label: 'Photos', icon: 'Image' },
        { id: 'videos', label: 'Videos', icon: 'Video' },
      ];

      return (
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          className="w-20 bg-canva-sidebar text-white flex flex-col items-center py-4 space-y-1 flex-shrink-0"
        >
          {mainTools.map((tool) => (
            <Button
              key={tool.id}
              variant="ghost"
              size="lg"
              className={`w-16 h-16 flex flex-col items-center justify-center rounded-lg ${
                activeTool === tool.id ? 'bg-purple-500/50' : 'hover:bg-purple-500/30'
              } text-xs text-white`}
              onClick={() => onSelectTool(tool.id)}
            >
              <IconRenderer name={tool.icon} size={22} className="mb-1" />
              {tool.label}
            </Button>
          ))}
        </motion.div>
      );
    };

    export default MainSidebar;
  