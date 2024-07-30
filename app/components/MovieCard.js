// components/MovieCard.js
import { useState, useEffect } from 'react';

const MovieCard = ({ imdbID, onDelete, showDeleteButton = false }) => {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`/api/movieDetails?id=${imdbID}`);
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 text-black relative">
      <img
        src={movieDetails.Poster !== 'N/A' ? movieDetails.Poster : '/placeholder-image.jpg'}
        alt={`${movieDetails.Title} poster`}
        className="w-full h-48 object-cover rounded-t-lg mb-2"
      />
      <h3 className="text-lg font-semibold mb-1">{movieDetails.Title}</h3>
      <p className="text-sm text-gray-600 mb-1">{movieDetails.Year}</p>
      <p className="text-sm text-gray-600">{movieDetails.Genre}</p>
      {showDeleteButton && (
        <button
          onClick={() => onDelete(imdbID)}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
        >
          X
        </button>
      )}
    </div>
  );
};

export default MovieCard;