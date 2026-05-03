import { Link } from 'react-router';
import './Header.css';
import logo from '../../assets/logo.png';

function Header() {
    return (
        <header className="header">
            <nav className="nav">
                <Link to="/" className="brand-link" aria-label="Retour à l'accueil">
                    <img src={logo} alt="PokéWeb" />
                </Link>
                <div className="links">
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