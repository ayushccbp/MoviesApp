import {Component} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

class Account extends Component {
  render() {
    return (
      <div className="account-bg-container">
        <Header />
        <div className="account-info-container">
          <h1 className="account">Account</h1>
          <hr className="horizontal-line" />
          <div className="membership-container">
            <h1 className="membership">Member ship</h1>
            <div className="membership-details-container">
              <p className="email">rahul@gmail.com</p>
              <p className="password">Password: ********</p>
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="plan-details-container">
            <h1 className="plan-details">Plan details</h1>
            <p className="premium">Premium</p>
            <div className="video-quality">Ultra HD</div>
          </div>
          <hr className="horizontal-line" />
          <button className="logout-button" type="button">
            Logout
          </button>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Account
