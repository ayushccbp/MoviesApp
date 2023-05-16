import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {GoAlert} from 'react-icons/go'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    apiStatusOriginalsMovies: apiStatusConstant.initial,
    originalsMoviesData: [],
  }

  componentDidMount() {
    this.fetchOriginalsMovesData()
  }

  randomImage = () => {
    const {originalsMoviesData} = this.state
    const randomImageObject =
      originalsMoviesData[
        Math.floor(Math.random() * originalsMoviesData.length)
      ]
    return randomImageObject
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

  fetchTrendingNewMoviesData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const urlTrendingNowMovies =
      'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const responseTrendingNowMovies = await fetch(urlTrendingNowMovies, options)
    const trendingMoviesData = await responseTrendingNowMovies.json()
    const formattedTrendingMoviesData = this.formatMovieData(
      trendingMoviesData.results,
    )
  }

  fetchOriginalsMovesData = async () => {
    this.setState({apiStatusOriginalsMovies: apiStatusConstant.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const urlOriginalsMovies = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const responseOriginalsMovies = await fetch(urlOriginalsMovies, options)
    const originalsMoviesData = await responseOriginalsMovies.json()
    if (responseOriginalsMovies.ok === true) {
      const formattedOriginalsMovieData = this.formatMovieData(
        originalsMoviesData.results,
      )
      this.setState({
        apiStatusOriginalsMovies: apiStatusConstant.success,
        originalsMoviesData: formattedOriginalsMovieData,
      })
    } else {
      this.setState({apiStatusOriginalsMovies: apiStatusConstant.failure})
    }
  }

  renderDetails = () => {
    const {apiStatusOriginalsMovies} = this.state
    switch (apiStatusOriginalsMovies) {
      case apiStatusConstant.success:
        return this.renderLandingPageDetails()
      case apiStatusConstant.inprogress:
        return this.renderLoader()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderLandingPageDetails = () => <div>success</div>

  renderLandingPageView = () => {
    const {apiStatusOriginalsMovies} = this.state
    const randomSelectedMovie = this.randomImage()
    const randomImage =
      apiStatusOriginalsMovies === apiStatusConstant.success
        ? randomSelectedMovie.backdropPath
        : ''
    return (
      <div
        style={{
          backgroundImage: `
    url(${randomImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          width: '100%',
          minHeight: '605px',
          backgroundColor: '#131313',
        }}
      >
        <Header />
        <div className="landing-page-container">
          {this.renderDetails()}
          {apiStatusOriginalsMovies === apiStatusConstant.success && (
            <div className="image-shadow"> ""</div>
          )}
        </div>
      </div>
    )
  }

  renderLandingPage = () => (
    <div className="home-bg-container">{this.landingPage()}</div>
  )

  landingPage = () => {
    const {apiStatusOriginalsMovies} = this.state
    console.log(apiStatusOriginalsMovies)
    switch (apiStatusOriginalsMovies) {
      case apiStatusConstant.success:
        return this.renderLandingPageView()
      case apiStatusConstant.inprogress:
        return this.renderLoader()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderOriginalsMoviesSlick = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    }
    const {originalsMoviesData} = this.state
    return (
      <Slider {...settings}>
        {originalsMoviesData.map(eachItem => (
          <div className="slick-image-container" key={eachItem.id}>
            <img
              alt={eachItem.title}
              className="slick-image"
              src={eachItem.backdropPath}
            />
          </div>
        ))}
      </Slider>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <GoAlert color="#D81F26" size={44} />
      <p className="failure-description">
        Something went wrong. Please try again later
      </p>
      <button type="button" className="failure-button">
        Try Again
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  render() {
    return (
      <>
        {this.renderLandingPageView()}
        <div className="video-items-bg-container">
          <div className="video-items-container">
            <h1 className="trending-now">Trending Now</h1>
            {this.renderOriginalsMoviesSlick()}
            <h1 className="trending-now">Originals</h1>
            {this.renderOriginalsMoviesSlick()}
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

export default Home
