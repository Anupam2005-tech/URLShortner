import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightCircle, Menu } from 'lucide-react';

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  function getCookie(token: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${token}=`);
    if (parts.length === 2) {
      const part = parts.pop();
      return part ? part.split(';').shift() : null;
    }
    return null;
  }

  const token = getCookie("token");
  const isLoggedIn = !!token;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-sky-50 via-white to-blue-100 text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-20 rounded-b-xl">
        <div className="flex items-center gap-4">
          {/* Mobile Toggle - Now on the left */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu className="w-6 h-6 text-blue-600" />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src="/logo-removebg-preview.png" alt="Logo" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-bold text-sky-600 tracking-wide">QuickLink</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
          <Link to="/user/login" className="text-blue-700 hover:text-blue-800 transition font-bold text-md">Login</Link>
          <Link to="/register" className="text-blue-700 hover:text-blue-800 transition font-bold text-md">Register</Link>
          {isLoggedIn && (
            <Link to="/url/analytics" className="text-blue-700 font-bold text-md hover:text-blue-800 transition">Analytics</Link>
          )}
          <Link to="/url">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-bold transition hover:cursor-pointer">
              Shorten URL <ArrowRightCircle size={18} />
            </button>
          </Link>
        </nav>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md shadow-md px-6 py-4 space-y-4">
          <Link to="/user/login" className="block text-blue-600 font-medium">Login</Link>
          <Link to="/register" className="block text-blue-600 font-medium">Register</Link>
          {isLoggedIn && <Link to="/url/analytics" className="block text-blue-600 font-medium">Analytics</Link>}
          <Link to="/url">
            <button className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold transition">
              Shorten URL <ArrowRightCircle size={18} />
            </button>
          </Link>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow px-6 py-12 md:px-20">
        <section className="text-center mb-20">
          <h1 className="text-5xl md:text-8xl font-extrabold text-sky-600">Welcome to QuickLink</h1>
          <p className="text-lg mt-4 text-gray-600">Transform long links into sleek, shareable URLs in seconds.</p>
        </section>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-4xl font-bold text-gray-900">Simplify Your Links</h2>
            <p className="text-lg text-gray-600">
              Clean, quick, and efficient URL shortening. Make your links more shareable and professional.
            </p>
            <Link to="/url">
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg transition hover:cursor-pointer">
                Get Started
              </button>
            </Link>
          </div>

          <div className="bg-white/60 backdrop-blur-lg border border-blue-100 rounded-2xl shadow-xl p-8 space-y-5 text-center">
            <h3 className="text-2xl font-semibold text-blue-700">How It Works</h3>
            <ol className="text-left space-y-3 text-gray-700">
              <li><strong>1.</strong> Paste your long URL into the input box.</li>
              <li><strong>2.</strong> Click "Shorten URL" to generate a clean link.</li>
              <li><strong>3.</strong> Copy and share your new short URL with anyone!</li>
            </ol>
          </div>
        </div>

        <section className="mt-24 text-center px-6">
          <h3 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-700">About Us</h3>
          <p className="text-gray-600 max-w-3xl mx-auto text-base leading-relaxed">
            We are a team passionate about simplifying the web. QuickLink was built with ease and speed in mind—perfect for everyone from students to startups looking to keep their URLs short and elegant.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 text-center text-sm text-gray-500 mt-auto">
        &copy; {new Date().getFullYear()} <span className='font-bold' >QuickLink</span>. Crafted with ❤️ by <span className='font-extrabold' >Anupam</span>.
      </footer>
    </div>
  );
};

export default Dashboard;
