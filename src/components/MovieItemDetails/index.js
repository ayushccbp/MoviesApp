import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {lightFormat} from 'date-fns'
import './index.css'
import Header from '../Header'
import Footer from '../Footer'

const apiStatusConstant = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MovieItemDetails extends Component {
  state = {apiStatus: apiStatusConstant.initial, movieData: []}

  componentDidMount() {
    this.fetchMovieItemDetails()
  }

  formatMovieData = data => {
    const formattedData = {
      adult: data.adult,
      backdropPath: data.backdrop_path,
      budget: data.budget,
      genres: data.genres,
      id: data.id,
      overview: data.overview,
      posterPath: data.poster_path,
      releaseDate: data.release_date,
      runtime: data.runtime,
      similarMovies: data.similar_movies,
      spokenLanguage: data.spoken_languages,
      title: data.title,
      voteAverage: data.vote_average,
      voteCount: data.vote_count,
    }
    return formattedData
  }

  fetchMovieItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.inprogress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
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
      const formattedData = this.formatMovieData(data.movie_details)
      this.setState({
        apiStatus: apiStatusConstant.success,
        movieData: formattedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderSimilarMovies = () => {
    const {movieData} = this.state
    const {similarMovies} = movieData
    return (
      <div className="similar-movie-container">
        <h1 className="similar-movie-heading">More like this</h1>
        <ul className="similar-movie-list-container">
          {similarMovies.map(eachMovie => (
            <li key={eachMovie.id}>
              <img
                className="similar-movie-image"
                alt={eachMovie.title}
                src={eachMovie.backdrop_path}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderSuccessView = () => {
    const {movieData} = this.state
    const {
      backdropPath,
      title,
      runtime,
      releaseDate,
      overview,
      genres,
      spokenLanguage,
      voteCount,
      voteAverage,
      budget,
    } = movieData
    const hour = parseInt(runtime / 60)
    const minutes = runtime % 60
    const date = new Date(releaseDate)
    const year = lightFormat(date, 'yyyy')
    return (
      <>
        <div
          style={{
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(24, 24, 24, 0.546875) 38.26%, #181818 92.82%, #181818 98.68%, #181818 108.61%),
            linear-gradient(90.33deg, #181818 -6.5%, rgba(24, 24, 24, 0.6) 57.15%, rgba(24, 24, 24, 0) 99.77%),
    url(${backdropPath})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
          className="movie-item-details-landing-page"
        >
          <Header />
          <div className="movie-item-details-info-container">
            <h1 className="movie-title">{title}</h1>
            <div className="movie-runtime-container">
              <p className="movie-time">{`${hour}h ${minutes}m`}</p>
              <div className="ua">U/A</div>
              <p className="movie-release-year">{year}</p>
            </div>
            <p className="overview">{overview}</p>
            <button className="play-button" type="button">
              Play
            </button>
          </div>
        </div>
        <div className="movie-genre-container">
          <ul className="movie-item-details-list">
            <h1 className="movie-item-info-heading">Genres</h1>
            {genres.map(eachGenre => (
              <li key={eachGenre.id}>
                <p className="movie-item-info-list">{eachGenre.name}</p>
              </li>
            ))}
          </ul>
          <ul className="movie-item-details-list">
            <h1 className="movie-item-info-heading">Audio Available</h1>
            {spokenLanguage.map(eachLanguage => (
              <li key={eachLanguage.id}>
                <p className="movie-item-info-list">
                  {eachLanguage.english_name}
                </p>
              </li>
            ))}
          </ul>
          <div>
            <p className="movie-item-info-heading">Rating Count</p>
            <p className="movie-item-info-list">{voteCount}</p>
            <p className="movie-item-info-heading">Rating Average</p>
            <p className="movie-item-info-list">{voteAverage}</p>
          </div>

          <div>
            <p className="movie-item-info-heading">Budget</p>
            <p className="movie-item-info-list">{budget}</p>
            <p className="movie-item-info-heading">Release Date</p>
            <p className="movie-item-info-list">{releaseDate}</p>
          </div>
        </div>
        {this.renderSimilarMovies()}
        <Footer />
      </>
    )
  }

  renderLoader = () => (
    <div className="movie-details-loader-container" data-testid="loader">
      <Header />
      <Loader
        type="TailSpin"
        color="#D81F26"
        height={50}
        width={50}
        radius={0}
        style={{marginTop: '200px'}}
      />
    </div>
  )

  renderFailureVIew = () => (
    <div className="movie-details-failure-container">
      <Header />
      <img
        className="popular-page-failure"
        alt="failure"
        src="https://res.cloudinary.com/ddkfpnw7u/image/upload/v1684156199/movie%20app/Background-Complete_vldnun.png"
        style={{marginTop: '100px'}}
      />
      <p className="failure-description">
        Something went wrong. Please try again later
      </p>
      <button className="failure-button" type="button">
        Try Again
      </button>
    </div>
  )

  renderMovieDetails = () => {
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
      <div className="movie-item-details-container">
        {this.renderMovieDetails()}
      </div>
    )
  }
}

export default MovieItemDetails
