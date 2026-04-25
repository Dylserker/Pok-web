import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import ContactForm from '../../components/Form/ContactForm/ContactForm'
import ContactCard from '../../components/Card/ContactCard/ContactCard'
import './Contact.css'

function Contact() {
  return (
    <div className="page-shell">
      <Header />
      <main className="page-content contact-page">
        <section className="contact-grid" aria-label="Section contact">
          <ContactForm />
          <ContactCard />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Contact