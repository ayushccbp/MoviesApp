import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <ul className="social-icon-container">
      <li className="social-icon">
        <FaGoogle color="#ffffff" />
      </li>
      <li className="social-icon">
        <FaTwitter />
      </li>
      <li className="social-icon">
        <FaInstagram />
      </li>
      <li className="social-icon">
        <FaYoutube />
      </li>
    </ul>
    <p className="contact-us">Contact Us</p>
  </div>
)

export default Footer
