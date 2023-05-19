import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BiSearchAlt2} from 'react-icons/bi'
import {AiOutlineMenuFold, AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {menu: false, search: false}

  onClickMenu = () => {
    this.setState(prevState => ({menu: !prevState.menu}))
  }

  onClickSearchIcon = () => {
    this.setState(prevState => ({search: !prevState.search}))
  }

  render() {
    const {menu} = this.state
    const {search, onChangeSearchInput} = this.props
    return (
      <>
        <nav className="header">
          <div className="responsive-header-container">
            <div className="website-logo-container">
              <Link className="link" to="/">
                <img
                  className="website-logo"
                  src="https://res.cloudinary.com/ddkfpnw7u/image/upload/v1683724103/movie%20app/Group_7399_dd4mgq.png"
                  alt="website logo"
                />
              </Link>
              <ul className="header-menu-container">
                <li>
                  <Link className="link" to="/">
                    <p className="menu">Home</p>
                  </Link>
                </li>
                <li>
                  <Link className="link" to="/popular">
                    <p className="menu">Popular</p>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="search-icon-container">
              {search !== true ? (
                <Link className="link" to="/search">
                  <BiSearchAlt2 size={24} />
                </Link>
              ) : (
                <div className="search-input-container">
                  <input
                    className="search-input"
                    type="type"
                    placeholder="Search"
                    onChange={onChangeSearchInput}
                  />
                  <div className="search-icon-input-container">
                    <BiSearchAlt2 className="search-input-icon" />
                  </div>
                </div>
              )}
              <Link className="link" to="/account">
                <img
                  className="profile-icon"
                  src="https://res.cloudinary.com/ddkfpnw7u/image/upload/v1683791559/movie%20app/Avatar_uqalpo.png"
                  alt="profile icon"
                />
              </Link>
              <div className="mobile-menu-icon-container">
                <AiOutlineMenuFold
                  size={24}
                  style={{marginLeft: '24px', cursor: 'pointer'}}
                  onClick={this.onClickMenu}
                />
              </div>
            </div>
          </div>
        </nav>
        {menu === true && (
          <ul className="mobile-menu-container">
            <li>
              <Link className="link" to="/">
                <p className="mobile-menu">Home</p>
              </Link>
            </li>
            <li>
              <Link className="link" to="/popular">
                <p className="mobile-menu">Popular</p>
              </Link>
            </li>
            <li>
              <Link className="link" to="/account">
                <p className="mobile-menu">Account</p>
              </Link>
            </li>
            <li>
              <AiFillCloseCircle
                className="mobile-menu-close-icon"
                onClick={this.onClickMenu}
              />
            </li>
          </ul>
        )}
      </>
    )
  }
}

export default Header
