
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import IconRenderer from '@/components/IconRenderer';

    const CanvasToolbar = ({ onAction }) => {
      const actions = [
        { name: 'Color', icon: 'Palette', action: 'color' },
        { name: 'Animate', icon: 'Wand2', action: 'animate' },
        { name: 'Position', icon: 'Move', action: 'position' },
      ];
      const iconActions = [
        { name: 'Layers', icon: 'Layers', action: 'layers', disabled: true },
        { name: 'Duplicate', icon: 'Copy', action: 'duplicate' },
        { name: 'Delete', icon: 'Trash2', action: 'delete' },
        { name: 'Lock', icon: 'Lock', action: 'lock' },
      ];

      return (
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
          className="absolute top-4 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="flex items-center gap-0.5 bg-white p-1 rounded-lg shadow-lg border border-slate-200">
            {actions.map((item, index) => (
              <React.Fragment key={item.action}>
                <Button variant="ghost" size="sm" className="text-slate-700 hover:bg-slate-100 px-2.5" onClick={() => onAction(item.action)}>
                  {item.icon && <IconRenderer name={item.icon} size={18} className="mr-1"/>} {item.name}
                </Button>
                {index < actions.length -1 && <div className="w-px h-5 bg-slate-200 mx-1"></div>}
              </React.Fragment>
            ))}
            <div className="w-px h-5 bg-slate-200 mx-1"></div>
            {iconActions.map((item) => (
              <Button key={item.action} variant="ghost" size="icon" className="text-slate-700 hover:bg-slate-100 h-8 w-8" onClick={() => onAction(item.action)} disabled={item.disabled}>
                <IconRenderer name={item.icon} size={18}/>
              </Button>
            ))}
          </div>
        </motion.div>
      );
    };

    export default CanvasToolbar;
  