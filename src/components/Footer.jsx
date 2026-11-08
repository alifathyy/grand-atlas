import { Link } from 'react-router-dom'
import { FaLinkedinIn, FaFacebookF, FaTwitter } from 'react-icons/fa'
import logo from '../assets/logo.png'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <img className="footer-logo" src={logo} alt="Grand Atlas" />
            <p>+1 (7635) 547-12-97</p>
            <p style={{ marginTop: 16 }}>support@lift.agency</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/units">Inventories</Link></li>
              <li><Link to="/zones">Zones</Link></li>
              <li><Link to="/developers">Developers</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4>About</h4>
            <ul>
              <li>Grand Atlas</li>
              <li>Privacy Policy</li>
              <li>Legal</li>
              <li>Help</li>
              <li>Support</li>
            </ul>
          </div>
          <div>
            <h4>Get In touch</h4>
            <div className="subscribe">
              <input placeholder="Get product updates" />
              <button>→</button>
            </div>
            <div className="socials">
              <span><FaLinkedinIn /></span>
              <span><FaFacebookF /></span>
              <span><FaTwitter /></span>
            </div>
          </div>
        </div>
        <p className="copyright">© 2020 Lift Media. All rights reserved</p>
      </div>
    </footer>
  )
}