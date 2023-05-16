import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import PopularMovieItem from '../PopularMovieItem'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Popular extends Component {
  state = {apiStatus: apiStatusConstant.initial}

  componentDidMount() {
    this.fetchPopularMoviesData()
  }

  formatMovieData = data => {
    const formattedData = data.map(eachData => ({
      backdropPath: eachData.backdrop_path,
      id: eachData.id,
      overview: eachData.overview,
      posterPath: eachData.poster_path,
      title: eachData.title,
    }))
    return formattedData
  }

  fetchPopularMoviesData = async () => {
    this.setState({apiStatus: apiStatusConstant.inprogress})
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const formattedData = this.formatMovieData(data.results)
      this.setState({
        apiStatus: apiStatusConstant.success,
        movieData: formattedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader
        type="TailSpin"
        color="#D81F26"
        height={50}
        width={50}
        radius={0}
      />
    </div>
  )

  renderFailureVIew = () => (
    <div className="popular-page-failure-container">
      <img
        className="popular-page-failure"
        alt="failure"
        src="https://res.cloudinary.com/ddkfpnw7u/image/upload/v1684156199/movie%20app/Background-Complete_vldnun.png"
      />
      <p className="failure-description">
        Something went wrong. Please try again later
      </p>
      <button className="failure-button" type="button">
        Try Again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {movieData} = this.state
    return (
      <div className="popular-movies-card-container">
        <ul className="popular-movies-items">
          {movieData.map(eachData => (
            <PopularMovieItem key={eachData.id} movieData={eachData} />
          ))}
        </ul>
        <Footer />
      </div>
    )
  }

  renderPopularMovies = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.inprogress:
        return this.renderLoader()
      case apiStatusConstant.failure:
        return this.renderFailureVIew()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-page-bg-container">
        <Header />
        <div className="popular-movies-container">
          {this.renderPopularMovies()}
        </div>
      </div>
    )
  }
}

export default Popular