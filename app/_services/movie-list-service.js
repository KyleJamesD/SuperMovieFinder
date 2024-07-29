import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query, deleteDoc } from "firebase/firestore";

// Function to get liked movies for a specific user
export const getLikedMovies = async (userId) => {
    try {
      const movies = [];
      const q = query(collection(db, `users/${userId}/likedMovies`));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        movies.push({ id: doc.id, ...doc.data() });
      });
      return movies;
    } catch (error) {
      console.error("Error getting liked movies: ", error);
      throw new Error("Failed to get liked movies");
    }
  }

  // Function to add a liked movie for a specific user
  export const addLikedMovie = async (userId, movie) => {
    try {
      const docRef = await addDoc(collection(db, `users/${userId}/likedMovies`), movie);
      return docRef.id;
    } catch (error) {
      console.error("Error adding liked movie: ", error);
      throw new Error("Failed to add liked movie");
    }
  }

  // Function to delete a liked movie for a specific user
  export const deleteLikedMovie = async (userId, movieId) => {
    try {
      await deleteDoc(doc(db, `users/${userId}/likedMovies/${movieId}`));
    } catch (error) {
      console.error("Error deleting liked movie: ", error);
      throw new Error("Failed to delete liked movie");
    }
  }

// Function to get saved movies for a specific user
export const getSavedMovies = async (userId) => {
  try {
    const movies = [];
    const q = query(collection(db, `users/${userId}/savedMovies`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      movies.push({ id: doc.id, ...doc.data() });
    });
    return movies;
  } catch (error) {
    console.error("Error getting saved movies: ", error);
    throw new Error("Failed to get saved movies");
  }
}

// Function to add a saved movie for a specific user
export const addSavedMovie = async (userId, movie) => {
  try {
    const docRef = await addDoc(collection(db, `users/${userId}/savedMovies`), movie);
    return docRef.id;
  } catch (error) {
    console.error("Error adding saved movie: ", error);
    throw new Error("Failed to add saved movie");
  }
}

// Function to delete a saved movie for a specific user
export const deleteSavedMovie = async (userId, movieId) => {
  try {
    await deleteDoc(doc(db, `users/${userId}/savedMovies/${movieId}`));
  } catch (error) {
    console.error("Error deleting saved movie: ", error);
    throw new Error("Failed to delete saved movie");
  }
}
  
