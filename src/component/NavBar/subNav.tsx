import Logo from "../../assets/logo.png";
import SETTINGS from "../../assets/settings.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SubNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function
  const [showPopup, setShowPopup] = useState(false); // State to toggle popup visibility
  const [lastLoginUser, setLastLoginUser] = useState<any>();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") as string);
    console.log(user);
    setLastLoginUser(user);
  }, []);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleChange = (event: any) => {
    const selectedValue = event.target.value;

    // Check if "Sign Up" is selected, then navigate
    if (selectedValue === "option1") {
      navigate("/sign-up"); // Replace '/sign-up' with the actual route path of your sign-up page
    }

    if (selectedValue === "option2") {
      navigate("/sign-in"); // Replace '/sign-up' with the actual route path of your sign-up page
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    setShowPopup(false); // Close the popup after logging out
  };

  const handleCancel = () => {
    setShowPopup(false); // Close the popup without logging out
  };

  return (
    <div className="fixed flex justify-between items-center opacity-[0.90] top-0 left-0 w-full h-[100px] p-4 z-[999]">
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={Logo} className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Adventure Map
            </span>
          </div>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {lastLoginUser ? (
              <>
                <button
                  onClick={() => setShowPopup(true)} // Show the popup on button click
                  type="button"
                  className="inline-flex items-center p-2  justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                  <img
                    src={SETTINGS} // Specify the path to your image
                    alt="User Account"
                    className="w-[32px]" // Adjust image size to match your design
                  />
                </button>
              </>
            ) : (
              <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <select
                  onChange={handleChange}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <option value="start">Get started</option>
                  <option value="option1">Sign Up</option>
                  <option value="option2">Sign In</option>
                </select>
                <button
                  onClick={toggleMenu} // Toggle the menu when clicked
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-sticky"
                  aria-expanded={isMenuOpen ? "true" : "false"}
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Popup Window */}
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 dark:bg-gray-800">
            <p className="text-center text-gray-800 dark:text-gray-200 mb-6 text-lg font-semibold">
              Do you want to log out?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubNav;
