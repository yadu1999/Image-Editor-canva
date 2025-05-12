
    import React from 'react';
    import * as LucideIcons from 'lucide-react';

    const IconRenderer = ({ name, className, size, color, strokeWidth }) => {
      const IconComponent = LucideIcons[name];

      if (!IconComponent) {
        console.warn(`Icon "${name}" not found in lucide-react.`);
        return <LucideIcons.HelpCircle className={className} size={size} color={color} strokeWidth={strokeWidth} />;
      }

      return <IconComponent className={className} size={size} color={color} strokeWidth={strokeWidth} />;
    };

    export default IconRenderer;
  