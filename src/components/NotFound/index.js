import './index.css'

const NotFound = () => (
  <div className="not-found-bg-container">
    <h1 className="not-found-heading">Lost Your Way?</h1>
    <p className="not-found-description">
      We are sorry the page you requested could not be found <br />
      Please go back to the home page.
    </p>
    <button className="homepage-button" type="button">
      Go to Home
    </button>
  </div>
)

export default NotFound
