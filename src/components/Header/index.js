import {BiSearchAlt2} from 'react-icons/bi'
import './index.css'

const Header = () => (
  <nav className="header">
    <div className="website-logo-container">
      <img
        className="website-logo"
        src="https://res.cloudinary.com/ddkfpnw7u/image/upload/v1683724103/movie%20app/Group_7399_dd4mgq.png"
        alt="website logo"
      />
      <ul className="header-menu-container">
        <li>
          <p className="menu">Home</p>
        </li>
        <li>
          <p className="menu">Popular</p>
        </li>
      </ul>
    </div>
    <div className="search-icon-container">
      <BiSearchAlt2 size={24} />
      <img
        className="profile-icon"
        src="https://res.cloudinary.com/ddkfpnw7u/image/upload/v1683791559/movie%20app/Avatar_uqalpo.png"
        alt="profile icon"
      />
    </div>
  </nav>
)

export default Header
