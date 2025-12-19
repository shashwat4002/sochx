import Head from 'next/head'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>SochX — Build & Launch</title>
        <meta name="description" content="SochX — beautiful product landing tailored for you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-surface text-on-surface">
        <Nav />
        <Hero />
        <main className="max-w-7xl mx-auto px-6">
          <Features />
        </main>
        <Footer />
      </div>
    </>
  )
}
