
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import IconRenderer from '@/components/IconRenderer';
import { useAppContext } from '@/context/AppContext';
import { useToast } from '@/components/ui/use-toast';

const TopBar = ({ onUndo, onRedo, canUndo, canRedo }) => {
  const { pages, activePageIndex } = useAppContext();
  const { toast } = useToast();

  const handleDownload = () => {
    const currentElements = pages[activePageIndex]?.elements || [];
    if (currentElements.length === 1 && currentElements[0].type === 'image' && currentElements[0].src) {
      const imageElement = currentElements[0];
      const link = document.createElement('a');
      link.href = imageElement.src;
      link.download = imageElement.alt || 'downloaded-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: "Image Downloaded",
        description: "The canvas image has started downloading.",
      });
    } else if (currentElements.length === 0) {
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "Canvas is empty. Add an image to download.",
      });
    } else {
      toast({
        title: "Download In Progress",
        description: "Advanced download for designs with multiple elements or text is coming soon!",
      });
    }
  };

  const handleShare = () => {
    toast({
      title: "Share Functionality",
      description: "Sharing your awesome designs will be available soon!",
    });
  };

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-16 w-full flex items-center justify-between px-3 sm:px-4 shadow-sm border-b border-slate-200 bg-gradient-to-r from-[#00C9FF] to-[#7742E3] text-white"
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <Button variant="ghost" size="icon" className="hover:bg-white/10">
          <IconRenderer name="Menu" size={20} />
        </Button>
        <Button variant="ghost" size="sm" className="hover:bg-white/10 hidden sm:inline-flex">File</Button>
        <IconRenderer name="Dot" size={12} className="hidden sm:inline-flex opacity-70" />
        <Button variant="ghost" size="sm" className="hover:bg-white/10 hidden sm:inline-flex">Resize</Button>
        <IconRenderer name="Dot" size={12} className="hidden sm:inline-flex opacity-70" />
        <Button variant="ghost" size="sm" className="hover:bg-white/10 hidden sm:inline-flex">Editing ▼</Button>
        <IconRenderer name="Dot" size={12} className="hidden sm:inline-flex opacity-70" />
        <Button variant="ghost" size="icon" className="hover:bg-white/10" onClick={onUndo} disabled={!canUndo}>
          <IconRenderer name="Undo" size={16} />
        </Button>
        <Button variant="ghost" size="icon" className="hover:bg-white/10"  onClick={onRedo} disabled={!canRedo}>
          <IconRenderer name="Redo" size={16} />
        </Button>
        <Button variant="ghost" size="icon" className="hover:bg-white/10">
          <IconRenderer name="Cloud" size={16} />
        </Button>
      </div>

      <div className="flex-grow flex justify-center items-center px-2 sm:px-4 text-sm font-medium truncate">
        Blue and White Modern Labour Day Greeting Instagram Post
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <Button variant="ghost" className="hover:bg-white/10 px-2 sm:px-3 text-sm hidden md:inline-flex">
          <IconRenderer name="Gift" size={18} className="mr-1.5 text-pink-300" /> Try Canva Pro
        </Button>
        <Button variant="ghost" size="icon" className="hover:bg-white/10 relative">
          <IconRenderer name="Bell" size={20} />
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
        </Button>
        <Button
          onClick={handleShare}
          className="bg-white text-[#7742E3] hover:bg-white/90 text-sm font-semibold px-3 sm:px-4 rounded-md"
        >
          <IconRenderer name="Share2" className="mr-1.5" size={16} />
          Share
        </Button>
        <Button
          onClick={handleDownload}
          variant="ghost"
          size="icon"
          className="hover:bg-white/10"
        >
          <IconRenderer name="Download" size={20} />
        </Button>
      </div>
    </motion.div>
  );
};

export default TopBar;
