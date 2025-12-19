import '../styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'

// dynamically import with SSR disabled so canvas only runs on the client
const Comets = dynamic(() => import('../components/Comets'), { ssr: false })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Comets />
      <Component {...pageProps} />
    </>
  )
}
