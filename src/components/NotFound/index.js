import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-bg-container">
    <h1 className="not-found-heading">Lost Your Way?</h1>
    <p className="not-found-description">
      we are sorry, the page you requested could not be found <br />
      Please go back to the homepage.
    </p>
    <button className="homepage-button" type="button">
      <Link className="link" to="/">
        Go to Home
      </Link>
    </button>
  </div>
)

export default NotFound
