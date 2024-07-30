import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query, deleteDoc, writeBatch, doc  } from "firebase/firestore";

// Function to get liked movies for a specific user
export const getLikedMovies = async (userId) => {
    try {
      const movies = [];
      const q = query(collection(db, `users/${userId}/likedMovies`));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        movies.push({ doc, ...doc.data() });
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
  export const deleteLikedMovie = async (userId, movie) => {
    try {
      const docRef = doc(db, `users/${userId}/likedMovies/${movie}`);
      // Attempt to delete the document
      await deleteDoc(docRef);

    } catch (error) {
      console.error("Error deleting liked movie: ", error);
      throw new Error("Failed to delete liked movie");
    }
  }

  // Function to remove all liked movies for a specific user
  export const removeAllLikedMovies = async (userId) => {
    try {
      const batch = writeBatch(db);
      const q = query(collection(db, `users/${userId}/likedMovies`));
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      console.log("All liked movies removed successfully");
    } catch (error) {
      console.error("Error removing all liked movies: ", error);
      throw new Error("Failed to remove all liked movies");
    }
  }

  // Function to get saved movies for a specific user
  export const getSavedMovies = async (userId) => {
    try {
      const movies = [];
      const q = query(collection(db, `users/${userId}/savedMovies`));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        movies.push({ doc, ...doc.data() });
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
  export const deleteSavedMovie = async (userId, movie) => {
    try {
      const docRef = doc(db, `users/${userId}/savedMovies/${movie}`);
      // Attempt to delete the document
      await deleteDoc(docRef);

    } catch (error) {
      console.error("Error deleting Saved movie: ", error);
      throw new Error("Failed to delete Saved movie");
    }
  }


  // Function to remove all saved movies for a specific user
  export const removeAllSavedMovies = async (userId) => {
    try {
      const batch = writeBatch(db);
      const q = query(collection(db, `users/${userId}/savedMovies`));
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      console.log("All saved movies removed successfully");
    } catch (error) {
      console.error("Error removing all saved movies: ", error);
      throw new Error("Failed to remove all saved movies");
    }
  }
    
