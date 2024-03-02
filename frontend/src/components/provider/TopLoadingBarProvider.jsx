import React from 'react';
import NextNProgress from 'nextjs-progressbar';

function TopLoadingBarProvider({ children }) {
  return (
    <>
      <NextNProgress color="#fff" startPosition={0.3} stopDelayMs={200} height={10} showOnShallow={true} />
      {children}
    </>
  );
}

export default TopLoadingBarProvider;
