import { useState } from 'react'
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FiMapPin, FiMail, FiSmartphone, FiPhone } from 'react-icons/fi'
import Hero from '../components/Hero'

const hours = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday']

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('')

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setStatus('Please fill in your name, email and message.')
      return
    }
    // TODO: send to the API if the task has a contact endpoint
    setStatus('Thank you! Your message has been sent.')
    setForm({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <>
      <Hero
        height={480}
        image="/images/contact-hero.jpg"
        title="Connected Globally. Available Locally."
        text="With experts positioned in the world's most influential markets, we are never more than a conversation away. Reach out to our team to experience a new standard of real estate advisory."
      />

      <div className="container section">
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Contact Information</h2>
            <p>
              Our team is available for private consultations and off-market inquiries. We operate
              with absolute discretion to ensure your real estate objectives are met with precision.
            </p>

            <ul className="contact-list">
              <li><FiMapPin /> Minusio, Lake Maggiore, Switzerland — ref. LOC1771</li>
              <li><FiMail /> Grand .Atlas.Support@gmail.com</li>
              <li><FiSmartphone /> 01247859622</li>
              <li><FiPhone /> 035987124</li>
            </ul>

            <h3>Follow us on social media</h3>
            <div className="contact-socials">
              <span><FaFacebookF /></span>
              <span><FaXTwitter /></span>
              <span><FaInstagram /></span>
              <span><FaTiktok /></span>
            </div>

            <h3>Working Hours</h3>
            <ul className="hours">
              {hours.map((day) => (
                <li key={day}><b>{day} :</b> 9:00AM - 5:00 PM</li>
              ))}
            </ul>
          </div>

          <form className="form-card" onSubmit={onSubmit}>
            <h2>Send us a message</h2>

            <label htmlFor="name">Name</label>
            <input id="name" name="name" value={form.name} onChange={onChange} />

            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={onChange} />

            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" value={form.phone} onChange={onChange} />

            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" value={form.message} onChange={onChange} />

            <button className="send-btn" type="submit">Send Message</button>
            {status && <p className="form-msg">{status}</p>}
          </form>
        </div>
      </div>
    </>
  )
}