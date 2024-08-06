"use client";

import { useState, useEffect } from "react";
import { useUserAuth } from "./_utils/auth-context";
import { getLikedMovies, getSavedMovies, addLikedMovie, addSavedMovie, removeAllLikedMovies, removeAllSavedMovies, deleteLikedMovie, deleteSavedMovie } from "./_services/movie-list-service";
import MovieCard from "./components/MovieCard";

export default function LandingPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const addTestMovies = async () => {
    if (!user) {
      alert("Please log in to add test data");
      return;
    }
    
    const testMovieIds = [
      "52959", // Star!
      "136244", // Star
      "1293992", // Star?
    ];
  
    for (const movieId of testMovieIds) {
      await handleLike(movieId);
      await handleSave(movieId);
    }
  };

  useEffect(() => {
    if (user) {
      fetchLikedAndSavedMovies();
    }
  }, [user]);

  const fetchLikedAndSavedMovies = async () => {
    if (user) {
      const liked = await getLikedMovies(user.uid);
      const saved = await getSavedMovies(user.uid);
      setLikedMovies(liked);
      setSavedMovies(saved);
    }
  };

  const handleLogin = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("Failed to sign in:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
      setLikedMovies([]);
      setSavedMovies([]);
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  const handleSearch = async () => {
    // Implement your API call to search for movies
    // Update searchResults state with the API response
  };

  const handleLike = async (movieId) => {
    if (!user) {
      alert("Please log in to like movies");
      return;
    }
    await addLikedMovie(user.uid, { id: movieId });
    fetchLikedAndSavedMovies();
  };

  const handleSave = async (movieId) => {
    if (!user) {
      alert("Please log in to save movies");
      return;
    }
    await addSavedMovie(user.uid, { id: movieId });
    fetchLikedAndSavedMovies();
  };

  const handleDeleteLikedMovie = async (movieToDelete) => {
    if (!user) {
      alert("Please log in to delete movies");
      return;
    }
    try {
      console.log('liked movie', movieToDelete);
      await deleteLikedMovie(user.uid, movieToDelete.doc.id);
      console.log('movie', movieToDelete);
      setLikedMovies(likedMovies.filter(movie => movie.doc.id !== movieToDelete.doc.id));
      console.log("Movie deleted successfully");
    } catch (error) {
      console.error("Failed to delete liked movie: ", error);
    }
  };

  const handleDeleteSavedMovie = async (movieToDelete) => {
    if (!user) {
      alert("Please log in to delete movies");
      return;
    }
    try {
      console.log('saved movie', movieToDelete);
      await deleteSavedMovie(user.uid, movieToDelete.doc.id);
      setSavedMovies(savedMovies.filter(movie => movie.doc.id !== movieToDelete.doc.id));
    } catch (error) {
      console.error("Failed to delete saved movie:", error);
      alert("Failed to delete saved movie");
    }
  };

  const handleRemoveAllLikedMovies = async () => {
    if (!user) {
      alert("Please log in to remove all liked movies");
      return;
    }
    try {
      await removeAllLikedMovies(user.uid);
      setLikedMovies([]); // Clear the local state
      alert("All liked movies have been removed");
    } catch (error) {
      console.error("Failed to remove all liked movies:", error);
      alert("Failed to remove all liked movies");
    }
  };

  const handleRemoveAllSavedMovies = async () => {
    if (!user) {
      alert("Please log in to remove all saved movies");
      return;
    }
    try {
      await removeAllSavedMovies(user.uid);
      setSavedMovies([]); // Clear the local state
      alert("All saved movies have been removed");
    } catch (error) {
      console.error("Failed to remove all saved movies:", error);
      alert("Failed to remove all saved movies");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 p-4 flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Movie Search</h1>
        <div>
          {!user ? (
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-white text-blue-500 rounded"
            >
              Login with GitHub
            </button>
          ) : (
            <div className="flex items-center">
              <span className="text-white mr-4">{user.displayName}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto mt-8 flex">
        <div className="w-2/3 pr-8">
          <div className="mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Search for movies..."
            />
            <button
              onClick={handleSearch}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Search
            </button>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-black">Search Results</h2>
            {searchResults.map((movie) => (
              <div key={movie.id} className="mb-4 p-4 border rounded">
                <h3>{movie.title}</h3>
                <button onClick={() => handleLike(movie)} className="mr-2">Like</button>
                <button onClick={() => handleSave(movie)}>Save</button>
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/3">
        {likedMovies.length > 0 && (
          <>
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold text-black">Liked Movies</h2>
              <button
                onClick={handleRemoveAllLikedMovies}
                className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Remove All
              </button>
            </div>
            <div className = "overflow-x-auto whitespace-nowrap" style={{ height: 220 }}>
              {likedMovies.map((movie) => (
                <MovieCard
                key={movie.id} 
                movieId={movie.id} 
                showDeleteButton={true}
                onDelete={() => handleDeleteLikedMovie(movie)}/>
              ))}
            </div>
            </>
          )}
          {savedMovies.length > 0 && (
          <>
          <div className="flex justify-between mb-4 mt-4">
          <h2 className="text-xl font-bold text-black">Saved Movies</h2>
          <button
                onClick={handleRemoveAllSavedMovies}
                className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Remove All
              </button>
          </div>
          <div className = "overflow-x-auto whitespace-nowrap" style={{ height: 220 }}>
            {savedMovies.map((movie) => (
              <MovieCard 
              key={movie.id} 
              movieId={movie.id}
              showDeleteButton={true}
              onDelete={() => handleDeleteSavedMovie(movie)} />
            ))}
          </div>
          </>
      )}
          <button
          onClick={addTestMovies}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
          >
          Add Test Liked Movies
          </button>
        </div>
      </main>
    </div>
  );
}