export default function Features() {
  const items = [
    { title: 'Pixel-perfect UI', desc: 'Recreate your designs with precise spacing, typography, and thoughtful animations.' },
    { title: 'Fast performance', desc: 'Optimized images and Next.js best practices for instant load times.' },
    { title: 'Accessible', desc: 'Keyboard-friendly, semantic markup, and good color contrast by default.' },
  ]

  return (
    <section id="features" className="py-20">
      <h2 className="text-3xl font-semibold mb-8">What you get</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((it) => (
          <div key={it.title} className="p-6 border rounded-xl bg-white/5">
            <h3 className="font-medium text-lg mb-2">{it.title}</h3>
            <p className="text-sm text-muted-foreground">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
