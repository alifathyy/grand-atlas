import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

export default function Hero({ title, text, image, height = 560, children }) {
  return (
    <section
      className="hero"
      style={{ minHeight: height, backgroundImage: image ? `url(${image})` : 'none' }}
    >
      <div className="hero-overlay" />
      <div className="hero-socials">
        <span><FaFacebookF /></span>
        <span><FaXTwitter /></span>
        <span><FaInstagram /></span>
        <span><FaTiktok /></span>
      </div>
      <div className="hero-content">
        <h1>{title}</h1>
        <p>{text}</p>
        {children}
      </div>
    </section>
  )
}