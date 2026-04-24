import { Link } from 'react-router';
import './Header.css';

function Header() {
    return (
        <header className="header">
            <nav className="nav">
                <div className="links">
                    <Link to="/" className="brand-link" aria-label="Retour à l'accueil">
                        <span className="brand-dot" aria-hidden="true" />
                        PokéWeb
                    </Link>
                    <Link to="/">Accueil</Link>
                    <Link to="/trainer">Dresseurs</Link>
                    <Link to="/soundtrack">Soundtrack</Link>
                    <Link to="/contact">Contact</Link>
                </div>
            </nav>
        </header>
    )
}

export default Header;