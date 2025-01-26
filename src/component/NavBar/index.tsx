import { useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import ACCOUNT from "../../assets/user.jpeg";
import { useNavigate } from "react-router-dom";

function NavBar() {
  // State to handle the menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const navigate = useNavigate(); // Initialize navigate function

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

  const navigateAccountUser = () => {
    if (lastLoginUser.accUserType === "VEHICLE") {
      navigate("/vehicle-manage/");
    }

    if (lastLoginUser.accUserType === "GUIDE") {
      navigate("/guide-manage/");
    }

    if (lastLoginUser.accType === "buyer") {
      navigate("/buyer-profile");
    }
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

          {lastLoginUser ? (
            // Show user account icon if lastLoginUser is not null
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <button
                onClick={() => navigateAccountUser()} // Handle account-related actions
                type="button"
                className="inline-flex items-center p-2  justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">User Account</span>
                {/* Replace SVG with image */}
                <img
                  src={ACCOUNT} // Specify the path to your image
                  alt="User Account"
                  className="w-[32px]" // Adjust image size to match your design
                />
              </button>
            </div>
          ) : (
            // Show dropdown if lastLoginUser is null
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

          <div
            className={`items-center justify-between ${
              isMenuOpen ? "flex" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="/"
                  className="block py-2 px-3 text-black rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 hover:bg-blue-500 hover:text-white"
                  aria-current="page"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/guides"
                  className="block py-2 px-3 text-black rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 hover:bg-blue-500 hover:text-white"
                  aria-current="page"
                >
                  Guides
                </a>
              </li>
              <li>
                <a
                  href="/vehicles"
                  className="block py-2 px-3 text-black rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 hover:bg-blue-500 hover:text-white"
                  aria-current="page"
                >
                  Vehicles
                </a>
              </li>
              <li>
                <a
                  href="/locations"
                  className="block py-2 px-3 text-black rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500  hover:bg-blue-500 hover:text-white"
                  aria-current="page"
                >
                  Locations
                </a>
              </li>
              <li>
                <a
                  href="/festivels"
                  className="block py-2 px-3 text-black rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 hover:bg-blue-500 hover:text-white"
                  aria-current="page"
                >
                  Festivals
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
