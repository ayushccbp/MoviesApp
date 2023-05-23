import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

class Account extends Component {
  onClickLogoutButton = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <div className="account-bg-container">
        <Header />
        <div className="account-info-container">
          <h1 className="account">Account</h1>
          <hr className="horizontal-line" />
          <div className="membership-container">
            <p className="membership">Member ship</p>
            <div className="membership-details-container">
              <p className="email">rahul@gmail.com</p>
              <p className="password">Password: ********</p>
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="plan-details-container">
            <p className="plan-details">Plan details</p>
            <p className="premium">Premium</p>
            <div className="video-quality">
              <p>Ultra HD</p>
            </div>
          </div>
          <hr className="horizontal-line" />
          <button
            className="logout-button"
            type="button"
            onClick={this.onClickLogoutButton}
          >
            Logout
          </button>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Account
