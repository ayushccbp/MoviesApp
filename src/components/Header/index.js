import {Component} from 'react'
import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {AiOutlineMenuFold, AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {menu: false, search: false, searchInput: ''}

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickMenu = () => {
    this.setState(prevState => ({menu: !prevState.menu}))
  }

  onClickSearchIcon = () => {
    this.setState(prevState => ({search: !prevState.search}))
  }

  render() {
    const {menu, searchInput} = this.state
    const {
      search,
      onChangeSearchInput,
      fetchSearchInputResult,
      onClickSearchIcon,
    } = this.props
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
                <Link className="link" to="/">
                  <li>
                    <p className="menu">Home</p>
                  </li>
                </Link>
                <li>
                  <Link className="link" to="/popular">
                    <p className="menu">Popular</p>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="search-icon-container" testid="search">
              {search !== true ? (
                <Link className="link" to="/search">
                  <button
                    type="button"
                    className="search-button"
                    testid="search"
                  >
                    <HiOutlineSearch size={24} />
                  </button>
                </Link>
              ) : (
                <div className="search-input-container" testid="search">
                  <input
                    className="search-input"
                    type="search"
                    placeholder="Search"
                    onKeyDown={onChangeSearchInput}
                    onChange={this.onChangeSearchInput}
                  />
                  <button
                    type="button"
                    className="search-icon-input-container"
                    onClick={() => onClickSearchIcon(searchInput)}
                    testid="searchButton"
                  >
                    <HiOutlineSearch className="search-input-icon" />
                  </button>
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
            <Link className="link" to="/">
              <li>
                <p className="mobile-menu">Home</p>
              </li>
            </Link>
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
