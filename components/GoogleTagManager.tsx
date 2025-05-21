// components/GoogleTagManager.tsx
import React, { useEffect } from 'react';
import Script from 'next/script';

const GoogleTagManager: React.FC = () => {
  useEffect(() => {
    if (window && window.dataLayer) {
      window.dataLayer.push({ 'event': 'gtm.js', 'gtm.start': new Date().getTime() });
    }
  }, []);

  return (
    <>
      <Script
        id="gtag"
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=AW-16667636692"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16667636692');
          `,
        }}
      />
    </>
  );
};

export default GoogleTagManager;
