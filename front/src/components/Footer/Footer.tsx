import './Footer.css'

function Footer() {
  return (
    <footer className="site-footer" aria-label="Pied de page">
      <p>© {new Date().getFullYear()} PokéWeb</p>
    </footer>
  )
}

export default Footer