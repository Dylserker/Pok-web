import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import TableOst from '../../components/Tables/TableOst/TableOst'
import { SOUNDTRACK_TRACKS } from '../../constants/soundtracks'
import './Soundtrack.css'

function Soundtrack() {
    return (
        <div className="soundtrack">
            <Header />
            <div className="soundtrack-content">
                <h1>Soundtrack</h1>
                <p>
                    Découvrez notre collection de bandes sonores de l'univers pokémon.
                </p>
                <TableOst tracks={SOUNDTRACK_TRACKS} />
            </div>
            <Footer />
        </div>
    )
}

export default Soundtrack