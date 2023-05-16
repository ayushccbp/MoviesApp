import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', isError: false, errorMsg: ''}

  onChangeUserInput = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({isError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, isError, errorMsg} = this.state
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
            <form className="form" onSubmit={this.onSubmitForm}>
              <label className="label" htmlFor="userName">
                USERNAME
              </label>
              <input
                className="input"
                id="userName"
                type="text"
                name="username"
                value={username}
                onChange={this.onChangeUserInput}
              />
              <label className="label" htmlFor="userPassword">
                PASSWORD
              </label>
              <input
                className="input"
                id="userPassword"
                type="password"
                name="password"
                value={password}
                onChange={this.onChangeUserInput}
              />
              {isError && <p className="error-msg">{errorMsg}</p>}
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
