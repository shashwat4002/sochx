export default function Footer() {
  return (
    <footer className="border-t mt-20 py-8">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} SochX — Built with ❤️
      </div>
    </footer>
  )
}
