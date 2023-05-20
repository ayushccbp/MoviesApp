import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
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
    offset: 0,
    currentPage: 1,
    pageLimit: 16,
    totalPage: 0,
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
    const {searchText, offset, pageLimit} = this.state
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
        const totalData = formattedData.length
        const totalPage = Math.ceil(totalData / 16)
        console.log(totalData)
        console.log(totalPage)
        const sliceData = formattedData.slice(offset, pageLimit)
        this.setState({
          apiStatus: apiStatusConstant.success,
          movieData: sliceData,
          totalPage,
        })
      } else {
        this.setState({apiStatus: apiStatusConstant.failure})
      }
    } else {
      this.setState({apiStatus: apiStatusConstant.success, movieData: []})
    }
  }

  handleNextPageClick = () => {
    const {currentPage, totalPage} = this.state
    if (currentPage < totalPage) {
      this.setState(
        prevState => ({
          offset: prevState.offset + 16,
          currentPage: prevState.currentPage + 1,
          pageLimit: prevState.pageLimit + 16,
        }),
        this.fetchSearchInputResult,
      )
    }
  }

  handlePrevPageClick = () => {
    const {currentPage, totalPage} = this.state
    console.log(currentPage)
    console.log(totalPage)
    if (currentPage > 1) {
      this.setState(
        prevState => ({
          offset: prevState.offset - 16,
          currentPage: prevState.currentPage - 1,
          pageLimit: prevState.pageLimit - 16,
        }),
        this.fetchSearchInputResult,
      )
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
    const {movieData, searchText, currentPage, totalPage} = this.state
    if (movieData.length !== 0 && searchText !== '') {
      return (
        <>
          <ul className="search-movie-items-container">
            {movieData.map(eachMovieData => (
              <PopularMovieItem
                key={eachMovieData.id}
                movieData={eachMovieData}
              />
            ))}
          </ul>
          <div className="pagination-container">
            <button
              type="button"
              className="pagination-button"
              onClick={this.handlePrevPageClick}
            >
              <IoIosArrowBack />
            </button>
            <p className="pagination-details">
              {currentPage} of {totalPage}
            </p>
            <button
              type="button"
              className="pagination-button"
              onClick={this.handleNextPageClick}
            >
              <IoIosArrowForward />
            </button>
          </div>
        </>
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
