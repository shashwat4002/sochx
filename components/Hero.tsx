import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <header className="bg-hero-gradient text-white">
      <div className="max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-extrabold leading-tight">
            Build faster. Ship smarter.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mt-6 text-lg max-w-xl">
            A modern product toolkit to design, prototype and launch beautiful experiences — minimal, fast and accessible.
          </motion.p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a className="px-5 py-3 bg-white text-indigo-700 rounded-md font-semibold" href="#get-started">Get started — it's free</a>
            <a className="px-5 py-3 border border-white/30 rounded-md" href="#demo">View demo</a>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="relative">
          <div className="rounded-2xl bg-white/8 p-6 backdrop-blur-md border border-white/10">
            <div className="h-64 md:h-72 bg-gradient-to-b from-white/5 to-white/3 rounded-lg flex items-center justify-center text-white/90">
              Live preview card
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  )
}
