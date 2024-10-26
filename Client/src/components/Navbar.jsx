import { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { BlogContext } from "../Context/UserContext.jsx";
import YourBlogs from "../pages/YourBlogs.jsx";

function Navbar() {
  const { loggedIn, userdata } = useContext(BlogContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-blue-500 w-screen p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          {loggedIn ? `Welcome ${userdata.username}!!` : `Welcome User`}
        </div>

        <div className="flex space-x-6 text-white text-lg">
          <div className="hidden md:flex space-x-6">
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive ? "text-black font-semibold" : ""
                } hover:text-blue-300`
              }
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive ? "text-black font-semibold" : ""
                } hover:text-blue-300`
              }
              to="/all-blog"
            >
              All Blogs
            </NavLink>
            {loggedIn ? (
              <NavLink
                className={({ isActive }) =>
                  `${
                    isActive ? "text-black font-semibold" : ""
                  } hover:text-blue-300`
                }
                to="/yourblog"
              >
                Your Blogs
              </NavLink>
            ) : (
              ""
            )}
            {loggedIn ? (
              <NavLink
                className={({ isActive }) =>
                  `${
                    isActive ? "text-black font-semibold" : ""
                  } hover:text-blue-300`
                }
                to="/create-blog"
              >
                Write a Blog
              </NavLink>
            ) : (
              ""
            )}
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive ? "text-black font-semibold" : ""
                } hover:text-blue-300`
              }
              to="/about"
            >
              About Us
            </NavLink>
            {loggedIn ? (
              <NavLink className="hover:text-blue-300" to="/logout">
                Logout
              </NavLink>
            ) : (
              <>
                <NavLink className="hover:text-blue-300" to="/login">
                  Login
                </NavLink>
                <NavLink className="hover:text-blue-300" to="/signup">
                  Register
                </NavLink>
              </>
            )}
          </div>
          <div className="md:hidden text-white text-xl">
            <button onClick={handleMenuToggle} className="focus:outline-none">
              {isMenuOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="flex flex-col items-center mt-4 space-y-4 text-white text-lg md:hidden">
          <NavLink
            className={({ isActive }) =>
              `${
                isActive ? "text-black font-semibold" : ""
              } hover:text-blue-300`
            }
            to="/"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${
                isActive ? "text-black font-semibold" : ""
              } hover:text-blue-300`
            }
            to="/all-blog"
            onClick={() => setIsMenuOpen(false)}
          >
            All Blogs
          </NavLink>
          {loggedIn ? (
            <>
              <NavLink
                className={({ isActive }) =>
                  `${
                    isActive ? "text-black font-semibold" : ""
                  } hover:text-blue-300`
                }
                to="/yourblog"
                onClick={() => setIsMenuOpen(false)}
              >
                Your Blogs
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `${
                    isActive ? "text-black font-semibold" : ""
                  } hover:text-blue-300`
                }
                to="/create-blog"
                onClick={() => setIsMenuOpen(false)}
              >
                Create Blog
              </NavLink>
            </>
          ) : (
            ""
          )}
          <NavLink
            className={({ isActive }) =>
              `${
                isActive ? "text-black font-semibold" : ""
              } hover:text-blue-300`
            }
            to="/about"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </NavLink>
          {loggedIn ? (
            <NavLink
              className="hover:text-blue-300"
              to="/logout"
              onClick={() => setIsMenuOpen(false)}
            >
              Logout
            </NavLink>
          ) : (
            <>
              <NavLink
                className="hover:text-blue-300"
                to="/login"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                className="hover:text-blue-300"
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
