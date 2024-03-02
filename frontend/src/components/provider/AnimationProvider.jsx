import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import AnimationDivProvider from './AnimationDivProvider';

function AnimationProvider({ children, className }) {
  const pathName = usePathname();
  return (
    <AnimatePresence>
      {pathName.startsWith("/app") ? (
        children
      ) : (
        <AnimationDivProvider className={className}>
          {children}
        </AnimationDivProvider>
      )}
    </AnimatePresence>
  );
}

export default AnimationProvider;
