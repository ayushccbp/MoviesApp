import {Component} from 'react'
import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

function PrevCustomArrow(props) {
  const {className, style, onClick} = props
  return (
    <IoIosArrowBack
      role="button"
      onClick={onClick}
      className={`${className} slick-arrow`}
      tabIndex={0}
      style={{
        ...style,
        color: '#ffffff',
      }}
    />
  )
}

function NextCustomArrow(props) {
  const {className, style, onClick} = props
  console.log(onClick)
  return (
    <IoIosArrowForward
      role="button"
      onClick={onClick}
      className={`${className} slick-arrow`}
      tabIndex={0}
      style={{
        ...style,
        color: '#ffffff',
      }}
    />
  )
}

const apiStatusConstant = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    apiStatusOriginalsMovies: apiStatusConstant.inprogress,
    originalsMoviesData: [],
    apiStatusTrendingNowMovies: apiStatusConstant.inprogress,
    trendingNowMoviesData: [],
  }

  componentDidMount() {
    this.fetchOriginalsMovesData()
    this.fetchTrendingNowMoviesData()
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

  fetchTrendingNowMoviesData = async () => {
    this.setState({apiStatusTrendingNowMovies: apiStatusConstant.inprogress})
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
    if (responseTrendingNowMovies.ok === true) {
      const formattedTrendingMoviesData = this.formatMovieData(
        trendingMoviesData.results,
      )
      this.setState({
        apiStatusTrendingNowMovies: apiStatusConstant.success,
        trendingNowMoviesData: formattedTrendingMoviesData,
      })
    } else {
      this.setState({apiStatusTrendingNowMovies: apiStatusConstant.failure})
    }
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

  renderDetails = randomSelectedMovie => {
    const {apiStatusOriginalsMovies} = this.state
    switch (apiStatusOriginalsMovies) {
      case apiStatusConstant.success:
        return this.renderLandingPageDetails(randomSelectedMovie)
      case apiStatusConstant.inprogress:
        return this.renderLoader()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderLandingPageDetails = randomSelectedMovie => {
    const {overview, title} = randomSelectedMovie
    return (
      <div className="random-movie-info-container">
        <h1 className="random-movie-title">{title}</h1>
        <p className="random-movie-description">{overview}</p>
        <button className="play-button" type="button">
          Play
        </button>
      </div>
    )
  }

  renderLandingPageView = () => {
    const {apiStatusOriginalsMovies} = this.state
    const randomSelectedMovie = this.randomImage()
    const randomImage =
      apiStatusOriginalsMovies === apiStatusConstant.success
        ? randomSelectedMovie.backdropPath
        : ''
    return (
      <div
        className="landing-page-bg-container"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(24, 24, 24, 0.546875) 38.26%, #181818 92.82%, #181818 98.68%, #181818 108.61%),
    url(${randomImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <Header />
        <div className="landing-page-container">
          {this.renderDetails(randomSelectedMovie)}
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
    const {apiStatusOriginalsMovies} = this.state
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
      ],
      prevArrow: <PrevCustomArrow />,
      nextArrow: <NextCustomArrow />,
    }
    const {originalsMoviesData} = this.state
    switch (apiStatusOriginalsMovies) {
      case apiStatusConstant.inprogress:
        return this.renderLoader()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.success:
        return (
          <Slider {...settings}>
            {originalsMoviesData.map(eachItem => (
              <div className="slick-image-container" key={eachItem.id}>
                <Link className="link" to={`/movies/${eachItem.id}`}>
                  <img
                    alt={eachItem.title}
                    className="slick-image"
                    src={eachItem.posterPath}
                  />
                </Link>
              </div>
            ))}
          </Slider>
        )
      default:
        return null
    }
  }

  renderTrendingNowMoviesSlick = () => {
    const {apiStatusTrendingNowMovies} = this.state
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
      ],
      prevArrow: <PrevCustomArrow />,
      nextArrow: <NextCustomArrow />,
    }
    const {trendingNowMoviesData} = this.state
    console.log(trendingNowMoviesData)
    switch (apiStatusTrendingNowMovies) {
      case apiStatusConstant.inprogress:
        return this.renderLoader()
      case apiStatusConstant.failure:
        return this.renderTrendingNowMoviesFailureView()
      case apiStatusConstant.success:
        return (
          <Slider {...settings}>
            {trendingNowMoviesData.map(eachItem => (
              <div className="slick-image-container" key={eachItem.id}>
                <Link className="link" to={`/movies/${eachItem.id}`}>
                  <img
                    alt={eachItem.title}
                    className="slick-image"
                    src={eachItem.posterPath}
                  />
                </Link>
              </div>
            ))}
          </Slider>
        )
      default:
        return null
    }
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        className="failure-icon"
        alt="failure view"
        src="https://res.cloudinary.com/ddkfpnw7u/image/upload/v1684736072/movie%20app/alert-triangle_xztqca.png"
      />
      <p className="failure-description">
        Something went wrong. Please try again later
      </p>
      <button
        type="button"
        className="failure-button"
        onClick={this.fetchOriginalsMovesData}
      >
        Try Again
      </button>
    </div>
  )

  renderTrendingNowMoviesFailureView = () => (
    <div className="failure-container">
      <img
        className="failure-icon"
        alt="failure view"
        src="https://res.cloudinary.com/ddkfpnw7u/image/upload/v1684736072/movie%20app/alert-triangle_xztqca.png"
      />
      <p className="failure-description">
        Something went wrong. Please try again later
      </p>
      <button
        type="button"
        className="failure-button"
        onClick={this.fetchTrendingNowMoviesData}
      >
        Try Again
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader
        type="TailSpin"
        color="#D81F26"
        height={50}
        width={50}
        radius={0}
      />
    </div>
  )

  render() {
    return (
      <>
        {this.renderLandingPageView()}
        <div className="video-items-bg-container">
          <div className="video-items-container">
            <div className="video-items-slick-container">
              <h1 className="trending-now">Trending Now</h1>
              <div className="slick-container">
                {this.renderTrendingNowMoviesSlick()}
              </div>
              <h1 className="trending-now">Originals</h1>
              <div className="slick-container">
                {this.renderOriginalsMoviesSlick()}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

export default Home
