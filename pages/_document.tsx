// import Document, {
//   Html,
//   Head,
//   Main,
//   NextScript,
//   DocumentContext,
//   DocumentInitialProps,
// } from 'next/document'
// import { GA_TRACKING_ID } from '../lib/gtag'

// class MyDocument extends Document {
//   static getInitialProps = async (
//     ctx: DocumentContext
//   ): Promise<DocumentInitialProps> => {
//     const initialProps = await Document.getInitialProps(ctx)
//     return initialProps
//   }

//   render(): JSX.Element {
//     return (
//       <Html lang="en">
//         <Head>
//           {/* Global Site Tag (gtag.js) - Google Analytics */}
//           {GA_TRACKING_ID && (
//             <>
//               <script
//                 async
//                 src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
//               />
//               <script
//                 dangerouslySetInnerHTML={{
//                   __html: `
//                     window.dataLayer = window.dataLayer || [];
//                     function gtag(){dataLayer.push(arguments);}
//                     gtag('js', new Date());
//                     gtag('config', '${GA_TRACKING_ID}', {
//                       page_path: window.location.pathname,
//                     });
//                   `,
//                 }}
//               />
//             </>
//           )}
//         </Head>
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     )
//   }
// }

// export default MyDocument


// pages/_document.js









import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Google Tag Manager */}
          <Script id="gtm-init" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PJSQB68P');
            `}
          </Script>

          {/* Google Analytics (gtag.js) */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=AW-16667636692"
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16667636692');
            `}
          </Script>

          {/* Facebook Pixel Code */}
          <Script id="fb-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s) {
                if(f.fbq) return;
                n=f.fbq=function() {
                  n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments)
                };
                if(!f._fbq) f._fbq=n;
                n.push=n;
                n.loaded=!0;
                n.version='2.0';
                n.queue=[];
                t=b.createElement(e); t.async=!0;
                t.src=v;
                s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)
              }(window, document,'script', 'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '829378715632565');
              fbq('track', 'PageView');
            `}
          </Script>

          {/* Facebook Pixel Noscript fallback */}
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src="https://www.facebook.com/tr?id=829378715632565&ev=PageView&noscript=1"
              alt="Facebook Pixel"
            />
          </noscript>
        </Head>
        <body>
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-PJSQB68P"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
