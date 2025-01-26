import { useState } from "react";
import SignInBackgroundImage from "../../assets/signupBackground.jpg";
// @ts-ignore
import { postRequest } from "../../services/httpServices";
// @ts-ignore
import {
  BASE_URL,
  BUYER_SIGN_IN_URL,
  GUIDE_SIGN_IN_URL,
  VEHICLE_SIGN_IN_URL,
} from "../../config&Varibles/endPointUrls.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Import the background image

const SignInPage = () => {
  const navigation = useNavigate();

  //------buyer or seller
  const [accountType, setAccountType] = useState<any>("buyer");
  const [email, setEmail] = useState<any>(null);
  const [password, setPassword] = useState<any>(null);
  const [sellerType, setSellerType] = useState<any>("guide");
  const [loading, setLoading] = useState<any>(false);

  const signInHandel = async () => {
    if (email != null && password != null) {
      if (accountType == "buyer") {
        setLoading(true);
        const res = await postRequest({
          url: BASE_URL + BUYER_SIGN_IN_URL,
          data: {
            accEmail: email,
            accPassword: password,
          },
        });

        if (res.status === "SUCCESS") {
          setLoading(false);
          localStorage.setItem("loginUserEmail", res.data.accEmail);
          localStorage.setItem("user", JSON.stringify(res.data));
          navigation("/buyer-profile");
        } else {
          setLoading(false);
        }
      }

      if (accountType == "seller") {
        if (sellerType != null) {
          if (sellerType == "guide") {
            setLoading(true);
            const res = await postRequest({
              url: BASE_URL + GUIDE_SIGN_IN_URL,
              data: {
                accEmail: email,
                accPassword: password,
              },
            });
            console.log(res);
            if (res.status == "SUCCESS") {
              setLoading(false);
              localStorage.setItem("loginUserEmail", res.data.accEmail);
              localStorage.setItem("user", JSON.stringify(res.data));
              if (res.data.guideCode == null) {
                navigation("/guide-save");
              } else {
                navigation("/guide-manage");
              }
            } else {
              setLoading(false);
              toast.error("Login Failed");
            }
          }

          if (sellerType == "rent_vehicle") {
            setLoading(true);
            const res = await postRequest({
              url: BASE_URL + VEHICLE_SIGN_IN_URL,
              data: {
                accEmail: email,
                accPassword: password,
              },
            });

            if (res.status == "SUCCESS") {
              setLoading(false);
              localStorage.setItem("loginUserEmail", res.data.accEmail);
              localStorage.setItem("user", JSON.stringify(res.data));

              if (res.data.vehicleCode == null) {
                navigation("/vehicle-save");
              } else {
                navigation("/vehicle-manage");
              }
            } else {
              setLoading(false);
              toast.error("Login Failed");
              // if (res.data.vehicleCode != null){
              //     navigation("/vehicle-manage")
              // } else {
              //     navigation("/vehicle-save")
              // }
            }
          }
        } else {
          toast.error("Select Seller Type");
        }
      }
    } else {
      toast.error("Input Data");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${SignInBackgroundImage})` }}
    >
      {loading && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-[9999] bg-opacity-50 bg-gray-200">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#3bd7f7] rounded-full animate-spin"></div>
        </div>
      )}
      {/* Background overlay with opacity */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md opacity-80">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Sign In to Your Account
        </h2>

        {/* Account Type Selection */}
        <div className="flex justify-between mb-6">
          <button
            className={`px-4 py-2 rounded-md w-full ${
              accountType === "buyer" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setAccountType("buyer")}
          >
            Buyer
          </button>
          <button
            className={`px-4 py-2 rounded-md w-full ${
              accountType === "seller"
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setAccountType("seller")}
          >
            Seller
          </button>
        </div>

        {/* Form Fields */}
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          {accountType === "seller" && (
            <div className="mb-4">
              <label
                htmlFor="sellerType"
                className="block text-sm font-semibold"
              >
                Select Your Seller Type
              </label>
              <select
                id="sellerType"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                value={sellerType}
                onChange={(event) => setSellerType(event.target.value)}
              >
                <option value="" disabled selected>
                  Choose a seller type
                </option>
                <option value="guide">Guide</option>
                <option value="rent_vehicle">Rent Vehicle</option>
              </select>
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={signInHandel}
            className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <a href="/sign-up" className="text-blue-500">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
