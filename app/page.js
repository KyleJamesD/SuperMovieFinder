"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function LandingPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

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
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {!user ? (
        <div className="flex flex-col items-center">
        <p className="text-lg mb-4 text-black">
          Welcome, please login to continue.
        </p>
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Login with GitHub
        </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-lg mb-4 text-black">
            Welcome, {user.displayName} ({user.email})
          </p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 mb-4 bg-red-500 text-white rounded"
          >
            Logout
          </button>
          <Link href="/" className="px-4 py-2 bg-green-500 text-white rounded">
              Go to Movie List
          </Link>
        </div>
      )}
    </div>
  );
}