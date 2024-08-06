// components/MovieCard.js
import { useState, useEffect } from 'react';

const MovieCard = ({ movieId, onDelete, showDeleteButton = false }) => {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`/api/movieDetails?id=${movieId}`);
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 text-black relative">
      <div className="flex flex-wrap items-center space-x-4">
      <a href={movieDetails.poster_path !== 'N/A' ? `https://image.tmdb.org/t/p/original/${movieDetails.poster_path}` : '/placeholder-image.jpg'} target="_blank" rel="noopener noreferrer">
      <img
        src={movieDetails.poster_path !== 'N/A' ? `https://image.tmdb.org/t/p/original/${movieDetails.poster_path}` : '/placeholder-image.jpg'}
        alt={`${movieDetails.original_title} poster`}
        className="w-7 object-cover rounded mb-2"
      />
      </a>
        <h3 className="text-lg font-semibold">{movieDetails.original_title}</h3>
        <p className="text-sm text-gray-600">{movieDetails.genres.slice(0, 2).map(genre => genre.name).join(', ')}</p>
        <p className="text-sm text-gray-600">{movieDetails.release_date}</p>
        
        {showDeleteButton && (
          <button
            onClick={() => onDelete(movieId)}
            className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
          >
            X
          </button>
        )}
      </div>
    </div>
  );
}  

export default MovieCard;