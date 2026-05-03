import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import ContactForm from '../../components/Form/ContactForm/ContactForm'
import ContactCard from '../../components/Card/ContactCard/ContactCard'
import './Contact.css'

function Contact() {
  return (
    <div className="contact">
      <Header />
      <div className="contact-content" aria-label="Section contact">
        <div className="contact-grid">
          <ContactForm />
          <ContactCard />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contact