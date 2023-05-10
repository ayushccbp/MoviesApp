import {Component} from 'react'
import './index.css'

class Login extends Component {
  render() {
    return (
      <div className="login-page-container">
        <nav className="navbar">
          <img
            className="login-page-logo"
            alt="movie logo"
            src="https://res.cloudinary.com/ddkfpnw7u/image/upload/v1683724103/movie%20app/Group_7399_dd4mgq.png"
          />
        </nav>
        <div className="responsive-login-container">
          <div className="login-form-container">
            <h1 className="login-text">Login</h1>
            <form className="form">
              <label className="label" htmlFor="username">
                USERNAME
              </label>
              <input className="input" id="username" type="text" />
              <label className="label" htmlFor="password">
                PASSWORD
              </label>
              <input className="input" id="password" type="password" />
              <button className="login-button" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
