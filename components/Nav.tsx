import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          {/* Prefer existing logo in public/ (logo.png or logo.svg). Falls back to text. */}
          <img src="/logo.png" alt="logo" className="h-8 w-auto hidden sm:block" onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}} />
          <span className="text-2xl font-bold">SochX</span>
        </Link>
        <div className="hidden md:flex gap-6 items-center">
          <a className="text-sm hover:underline" href="#features">Features</a>
          <a className="text-sm hover:underline" href="#pricing">Pricing</a>
          <a className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md" href="#get-started">Get started</a>
        </div>
      </div>
    </nav>
  )
}
