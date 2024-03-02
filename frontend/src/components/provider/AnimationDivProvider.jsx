import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

function AnimationDivProvider({ children, className }) {
  const pathName = usePathname();

  return (
    <motion.div
      key={pathName}
      transition={{
        duration: 0.75
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default AnimationDivProvider;
