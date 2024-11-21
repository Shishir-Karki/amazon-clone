import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../utils/firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailPasswordSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (error) {
      console.error('Google Sign In Error:', error);
      setError(error.message || 'Failed to sign in with Google');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-8">
      <Link to="/home">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon Logo"
          className="h-8 mb-8"
        />
      </Link>

      <div className="w-full max-w-[350px] p-4">
        <div className="border border-gray-300 p-4 rounded-lg">
          <h1 className="text-3xl font-normal mb-4">Sign in</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailPasswordSignIn}>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#e77600] focus:shadow-amazonInput focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#e77600] focus:shadow-amazonInput focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#f0c14b] hover:bg-[#e8b835] text-sm py-2 px-3 rounded-sm border border-[#a88734] focus:outline-none focus:ring-2 focus:ring-[#e77600]"
            >
              Sign In
            </button>
          </form>

          <button
            onClick={handleGoogleSignIn}
            className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-sm text-white py-2 px-3 rounded-sm border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign in with Google
          </button>

          <div className="mt-4 text-xs">
            By continuing, you agree to Amazon's{' '}
            <a href="#" className="text-[#0066c0] hover:text-[#c45500] hover:underline">
              Conditions of Use
            </a>{' '}
            and{' '}
            <a href="#" className="text-[#0066c0] hover:text-[#c45500] hover:underline">
              Privacy Notice
            </a>
            .
          </div>
        </div>

        <div className="mt-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">New to Amazon?</span>
            </div>
          </div>

          <Link to="/signup">
            <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-sm py-2 px-3 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e77600]">
              Create your Amazon account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
