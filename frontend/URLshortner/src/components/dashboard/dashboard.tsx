import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ArrowRightCircle, Menu, User } from "lucide-react";
import {
  checkUserloggedIn,
  checkUserloggedOut,
} from "../../redux/slice/auth/authSlice";
import cookies from "js-cookie";
import "../../App.css";
import arrowsvg from "../../assets/arrow.svg";
import Popup from "../utils/Popup";
import deleteTrash from "../../assets/deleteTrash.svg";
import Footer from "./footer/Footer";
import { deleteUserHandle, logOutUserHandle } from "../../connections";
import {
  checkLoadingIn,
  checkLoadingOut,
} from "../../redux/slice/usersSlice/usersSlice";
import QuickLinkLoader from "../utils/loader";

const Dashboard = () => {
  const [Open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [Msg, setMsg] = useState("");
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.authentication.isloggedIn);


  useEffect(() => {
    const checklogIn = async () => {
      const token = cookies.get("token");
      if (!token) {
        dispatch(checkUserloggedOut());
      } else {
        dispatch(checkUserloggedIn());
      }
      setIsCheckingToken(false);
    };
    checklogIn();
  }, [dispatch]);

  if (isCheckingToken) {
    return <QuickLinkLoader />;
  }

  async function deleteUser() {
    dispatch(checkLoadingIn());
    try {
      const result = await deleteUserHandle();
      if (result) {
        setMsg(result.msg);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } finally {
      dispatch(checkLoadingOut());
    }
  }
  async function userLogout() {
    dispatch(checkLoadingIn());
    try {
      const result = await logOutUserHandle();
      if (result) {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } finally {
      dispatch(checkLoadingOut());
    }
  }
  return (
    <>
      <Popup
        title="Delete Account"
        content={`${deleteTrash}`}
        firstOption="Cancel"
        secondOption="Delete"
        isOpen={Open}
        onclose={() => setOpen(false)}
        onfirstOption={() => console.log("Cancelled")}
        onsecondOption={deleteUser}
        firstOptionColor="bg-gray-300"
        firstOptionTextColor="text-black"
        firstOptionHoverColor="hover:bg-gray-400"
        secondOptionColor="bg-red-600"
        secondOptionHoverColor="hover:bg-red-700"
        titleColor="text-red-600"
        msg={Msg}
      />

      <div className="min-h-screen flex flex-col bg-gradient-to-tr from-sky-50 via-white to-blue-100 text-gray-800 font-sans">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-20 rounded-b-xl">
          <div className="flex items-center gap-4">
            {/* Mobile Toggle */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu className="w-6 h-6 text-blue-600" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/logo-removebg-preview.png"
                alt="Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-2xl font-bold text-sky-600 tracking-wide">
                QuickLink
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium relative">
            {!isLoggedIn && !isCheckingToken ? (
              <>
                <Link
                  to="/user/login"
                  className="text-blue-700 hover:text-blue-800 transition font-bold text-md"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-blue-700 hover:text-blue-800 transition font-bold text-md"
                >
                  Register
                </Link>
              </>
            ) : isLoggedIn && !isCheckingToken ? (
              <>
                <Link
                  to="/url/analytics"
                  className="text-blue-700 font-bold text-md hover:text-blue-800 transition"
                >
                  Analytics
                </Link>

                {/* Show Account Dropdown only when logged in */}
                <div className="relative">
                  <button
                    onClick={() => setAccountOpen(!accountOpen)}
                    className="flex items-center gap-2 hover:bg-sky-50 hover:cursor-pointer text-blue-700 hover:text-blue-800 font-bold text-md"
                  >
                    <User className="w-5 h-5" />
                    Account
                  </button>
                  {accountOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <Link
                        to="/user/update"
                        className="block px-4 py-2 text-sm hover:bg-sky-50 hover:cursor-pointer text-blue-700 hover:text-blue-800 font-bold"
                      >
                        Update Account
                      </Link>
                      <p
                        className="block px-4 py-2 text-sm hover:bg-sky-50 hover:cursor-pointer text-blue-700 hover:text-blue-800 font-bold"
                        onClick={() => setOpen(true)}
                      >
                        Delete Account
                      </p>
                      <p
                        className="block px-4 py-2 text-sm hover:bg-sky-50 hover:cursor-pointer text-blue-700 hover:text-blue-800 font-bold"
                        onClick={userLogout}
                      >
                        Log Out
                      </p>
                    </div>
                  )}
                </div>
              </>
            ) : null} {/* Render nothing while checking */}

            <Link to="/url">
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-bold transition hover:cursor-pointer">
                Shorten URL <ArrowRightCircle size={18} />
              </button>
            </Link>
          </nav>
        </header>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white/90 backdrop-blur-md shadow-md px-6 py-4 space-y-4 relative z-10">
            {!isLoggedIn && !isCheckingToken ? (
              <>
                <Link
                  to="/user/login"
                  className="block text-blue-600 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block text-blue-600 font-medium"
                >
                  Register
                </Link>
              </>
            ) : isLoggedIn && !isCheckingToken ? (
              <>
                <Link
                  to="/url/analytics"
                  className="block text-blue-600 font-medium"
                >
                  Analytics
                </Link>

                {/* Show Account Dropdown only when logged in */}
                <div className="w-full">
                  <button
                    onClick={() => setAccountOpen(!accountOpen)}
                    className="w-full flex items-center justify-start gap-2 text-blue-600 font-medium py-2 hover:bg-blue-50 rounded-md"
                  >
                    Account
                  </button>
                  {accountOpen && (
                    <div className="w-full bg-white rounded-md border border-gray-200 shadow-md transition-all animate-fade-in">
                      <Link
                        to="/account/update"
                        className="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 transition"
                      >
                        Update Account
                      </Link>
                      <Link
                        to="/account/delete"
                        className="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 transition"
                        onClick={() => setOpen(true)}
                      >
                        Delete Account
                      </Link>
                      <p
                        className="block px-4 py-2 text-sm hover:bg-sky-50 hover:cursor-pointer text-blue-700 hover:text-blue-800 font-bold"
                        onClick={userLogout}
                      >
                        Log Out
                      </p>
                    </div>
                  )}
                </div>
              </>
            ) : null}

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
            <h1 className="text-5xl md:text-8xl font-extrabold text-sky-600 ">
              Welcome to QuickLink
            </h1>
            <p className="text-lg mt-4 text-gray-600">
              Transform long links into sleek, shareable URLs in seconds.
            </p>
            {isLoggedIn && (
              <p className="text-md mt-2 text-green-600 font-semibold">
                Welcome back! You're logged in.
              </p>
            )}
          </section>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
            <div className="space-y-6 text-center md:text-left">
              <h2 className="text-4xl font-bold text-gray-900">
                Simplify Your Links
              </h2>
              <p className="text-lg text-gray-600">
                Clean, quick, and efficient URL shortening. Make your links more
                shareable and professional.
              </p>
              <div className="text-center md:text-left">
                <Link to="/url">
                  <button className="greener-button ">
                    Get Started
                    <span className="icon" aria-hidden="true">
                      <img src={arrowsvg} alt="" />
                    </span>
                  </button>
                </Link>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-lg border border-blue-100 rounded-2xl shadow-xl p-8 space-y-5 text-center">
              <h3 className="text-2xl font-semibold text-blue-700">
                How It Works
              </h3>
              <ol className="text-left space-y-3 text-gray-700">
                <li>
                  <strong>1.</strong> Paste your long URL into the input box.
                </li>
                <li>
                  <strong>2.</strong> Click "Shorten URL" to generate a clean
                  link.
                </li>
                <li>
                  <strong>3.</strong> Copy and share your new short URL with
                  anyone!
                </li>
              </ol>
            </div>
          </div>

          <section className="mt-24 text-center px-6">
            <h3 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-700">
              About Us
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto text-base leading-relaxed">
              We are a team of one passionate about simplifying the web. QuickLink was
              built with ease and speed in mind—perfect for everyone from
              students to startups looking to keep their URLs short and elegant.
            </p>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;