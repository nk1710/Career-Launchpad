// import { useEffect } from 'react'
// import { AppProps } from 'next/app'
// import { useRouter } from 'next/router'
// import Head from 'next/head'
// import { DefaultSeo } from 'next-seo'
// import SEO from '../next-seo.config'
// import * as gtag from '../lib/gtag'
// import 'tailwindcss/tailwind.css'
// import '../styles/globals.scss'

// const App: React.FC<AppProps> = ({ Component, pageProps }) => {
//   const router = useRouter()

//   useEffect(() => {
//     const handleRouteChange = (
//       url: string,
//       { shallow }: { shallow?: boolean }
//     ) => {
//       if (!shallow) gtag.pageview(url)
//     }
//     router.events.on('routeChangeComplete', handleRouteChange)
//     return () => {
//       router.events.off('routeChangeComplete', handleRouteChange)
//     }
//   }, [router.events])

//   return (
//     <>
//       <Head>
//         <meta name="viewport" content="initial-scale=1.0, width=device-width" />
//       </Head>
//       <DefaultSeo {...SEO} />
//       <Component {...pageProps} />
//     </>
//   )
// }

// export default App

// pages/_app.tsx
import { useEffect } from 'react'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'
import * as gtag from '../lib/gtag'
import 'tailwindcss/tailwind.css'
import '../styles/globals.scss'
// import GoogleTagManager from '../components/GoogleTagManager'
// import FacebookPixel from '../components/FacebookPixel'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (
      url: string,
      { shallow }: { shallow?: boolean }
    ) => {
      if (!shallow) gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" /> {/* Add this line */}
        {/* Add other meta tags or links if necessary */}
      </Head>
      <DefaultSeo {...SEO} />
      {/* <GoogleTagManager/>
      <FacebookPixel/> */}
      <Component {...pageProps} />
    </>
  )
}

export default App
