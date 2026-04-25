import './ContactForm.css'

function ContactForm() {
	return (
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
						J&apos;accepte que mes données personnelles soient réutilisées pour être contacté(e).
					</span>
				</label>

				<button type="submit">Envoyer</button>
			</form>
		</div>
	)
}

export default ContactForm
