import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import PopularMovieItem from '../PopularMovieItem'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Search extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    searchText: '',
    movieData: [],
  }

  componentDidMount() {
    this.fetchSearchInputResult()
  }

  onChangeSearchInput = event => {
    this.setState({searchText: event.target.value}, this.fetchSearchInputResult)
  }

  formatMovieData = data => {
    const formattedData = data.map(eachData => ({
      backdropPath: eachData.backdrop_path,
      id: eachData.id,
      posterPath: eachData.poster_path,
      title: eachData.title,
    }))
    return formattedData
  }

  fetchSearchInputResult = async () => {
    this.setState({apiStatus: apiStatusConstant.inprogress})
    const {searchText} = this.state
    if (searchText !== '') {
      const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchText}`
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
    } else {
      this.setState({apiStatus: apiStatusConstant.success, movieData: []})
    }
  }

  renderLoader = () => (
    <div className="search-loader-container" data-testid="loader">
      <Loader
        type="TailSpin"
        color="#D81F26"
        height={50}
        width={50}
        radius={0}
      />
    </div>
  )

  renderFailureVIew = () => {
    const {searchText} = this.state
    return (
      <div className="search-page-failure-container">
        <img
          className="popular-page-failure"
          alt="failure"
          src="https://res.cloudinary.com/ddkfpnw7u/image/upload/v1684328008/movie%20app/Group_7394_bxtohv.png"
        />
        <p className="search-failure-description">
          Your search for {searchText} did not find any matches.
        </p>
      </div>
    )
  }

  renderSuccessView = () => {
    const {movieData, searchText} = this.state
    console.log(searchText)
    if (movieData.length !== 0 && searchText !== '') {
      return (
        <ul className="search-movie-items-container">
          {movieData.map(eachMovieData => (
            <PopularMovieItem
              key={eachMovieData.id}
              movieData={eachMovieData}
            />
          ))}
        </ul>
      )
    }
    if (searchText === '') {
      return null
    }
    return this.renderFailureVIew()
  }

  renderResult = searchInput => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessView(searchInput)
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
      <div className="search-input-bg-container">
        <Header search onChangeSearchInput={this.onChangeSearchInput} />
        <div className="search-result-container">{this.renderResult()}</div>
      </div>
    )
  }
}

export default Search
