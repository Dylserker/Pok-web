import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import './Contact.css'

function Contact() {
  return (
    <div className="page-shell">
      <Header />
      <main className="page-content contact-page">
        <section className="contact-grid" aria-label="Section contact">
          <div className="contact-form-card">
            <h2>Contact</h2>
            <form className="contact-form">
              <div className="contact-inline">
                <div className="contact-row">
                  <label htmlFor="nom">Nom</label>
                  <input id="nom" name="nom" type="text" required />
                </div>

                <div className="contact-row">
                  <label htmlFor="prenom">Prénom</label>
                  <input id="prenom" name="prenom" type="text" required />
                </div>
              </div>

              <div className="contact-inline">
                <div className="contact-row">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required />
                </div>

                <div className="contact-row">
                  <label htmlFor="telephone">Téléphone</label>
                  <input id="telephone" name="telephone" type="tel" required />
                </div>
              </div>

              <div className="contact-row">
                <label htmlFor="objet">Objet</label>
                <input id="objet" name="objet" type="text" required />
              </div>

              <div className="contact-row">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={5} required />
              </div>

              <label className="consent-row" htmlFor="consentement">
                <input id="consentement" name="consentement" type="checkbox" required />
                <span>
                  J&apos;accepte que mes données personnelles soient réutilisées pour être
                  contacté(e).
                </span>
              </label>

              <button type="submit">Envoyer</button>
            </form>
          </div>

          <aside className="contact-info-card" aria-label="Informations de contact">
            <h3>Coordonnées</h3>
            <p>Levant Dylan</p>
            <p>Téléphone : 06 65 95 19 43</p>
            <p>Adresse : 3 rue Gratteminot</p>
            <p>Ville : 45000 Orléans</p>
            <p>Entreprise : Levant Dev Solution</p>
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Contact