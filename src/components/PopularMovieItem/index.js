import {Link} from 'react-router-dom'
import './index.css'

const PopularMovieItem = props => {
  const {movieData} = props
  const {id, posterPath, title} = movieData
  return (
    <Link className="movie-item-link" to={`/movies/${id}`}>
      <li className="popular-movie-item-container">
        <img
          className="popular-movie-item-image"
          alt={title}
          src={posterPath}
        />
      </li>
    </Link>
  )
}

export default PopularMovieItem
