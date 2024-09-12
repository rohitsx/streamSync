import { Link } from 'react-router-dom';
import isLoggedIn from '../utils/isLoggedIn';
import Logo from '../assets/logo/logo';

function LandingPage() {
  isLoggedIn()

  return (
    <div className="min-w-96 min-h-screen bg-gradient-to-br from-purple-900 to-black text-white flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 space-y-8">
        <div className="flex justify-center">
          <Logo />
        </div>

        <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
          Elevate Your Stream Experience
        </h2>

        <div className="flex flex-col space-y-4">
          <Link to="/signup" className="text-base py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105 text-center">
            Sign Up
          </Link>
          <Link to="/login" className="text-base py-3 px-6 bg-transparent border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white font-semibold rounded-lg transition duration-300 text-center">
            Log In
          </Link>
        </div>

        <footer className="text-center text-sm text-gray-400">
          <p>&copy; 2024 StreamSync. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;