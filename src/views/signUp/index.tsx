import {useState} from "react";
import SingUpBackgroundImage from '../../assets/signupBackground.jpg'
// @ts-ignore
import {postRequest} from '../../services/httpServices.js'
// @ts-ignore
import {BASE_URL, BUYER_SIGNUP_URL, GUIDE_SIGNUP_URL, VEHICLE_SIGNUP_URL} from "../../config&Varibles/endPointUrls";
import toast, {Toaster} from "react-hot-toast";



const SignUpPage = () => {

  const [accountType, setAccountType] = useState<any>('buyer');
  const [email, setEmail] = useState<any>(null);
  const [username, setUsername] = useState<any>(null);
  const [password, setPassword] = useState<any>(null);
  const [sellerType, setSellerType] = useState<any>('guide');
  const [currency, setCurrency] = useState<any>('usd');



  const handelSignUp = async () => {

    if (accountType == 'buyer') {
      if (email != null && username != null && password != null){
        await postRequest({
          url: BASE_URL + BUYER_SIGNUP_URL,
          data: {
            accEmail: email,
            accUserName: username,
            accPassword: password,
            currency,
            accType: accountType
          }
        })
      } else {
        toast.error("Please Input Details..")
      }
    }

    if (accountType == 'seller' && sellerType == 'guide'){
      if (email != null && username != null && password != null){
        await postRequest({
          url: BASE_URL + GUIDE_SIGNUP_URL,
          data: {
            accEmail: email,
            accUserName: username,
            accPassword: password,
            accType: accountType
          }
        })
      } else {
        toast.error("Please Input Details..")
      }
    }


    if (accountType == 'seller' && sellerType == 'rent_vehicle'){
      if (email != null && username != null && password != null){
        await postRequest({
          url: BASE_URL + VEHICLE_SIGNUP_URL,
          data: {
            accEmail: email,
            accUserName: username,
            accPassword: password,
            accType: accountType
          }
        })
      } else {
        toast.error("Please Input Details..")
      }
    }
  }

  return (

      <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
           style={{ backgroundImage: `url(${SingUpBackgroundImage})` }}>
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
        {/* Background overlay with opacity */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md opacity-80">
          <h2 className="text-2xl font-semibold text-center mb-6">Create Your Account</h2>

          {/* Account Type Selection */}
          <div className="flex justify-between mb-6">
            <button
                className={`px-4 py-2 rounded-md w-full ${accountType === 'buyer' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setAccountType('buyer')}
            >
              Buyer
            </button>
            <button
                className={`px-4 py-2 rounded-md w-full ${accountType === 'seller' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setAccountType('seller')}
            >
              Seller
            </button>
          </div>

          {/* Form Fields */}
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold">Email</label>
              <input
                  id="email"
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-semibold">Username</label>
              <input
                  type="text"
                  id="username"
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-semibold">Password</label>
              <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Dynamic Fields based on Account Type */}
            {accountType === 'buyer' && (
                <div className="mb-4">
                  <label
                      htmlFor="currency"
                      className="block text-sm font-semibold"
                  >
                    Select Your Currency
                  </label>
                  <select
                      id="currency"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="" disabled>
                      Choose a currency
                    </option>
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                    <option value="gbp">GBP</option>
                    <option value="inr">INR</option>
                  </select>
                </div>
            )}

            {accountType === 'seller' && (
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
                      onChange={(e) => setSellerType(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Choose a seller type
                    </option>
                    <option value="guide">Guide</option>
                    <option value="rent_vehicle">Rent Vehicle</option>
                  </select>
                </div>
            )}

            {/* Submit Button */}
            <button
                type={"button"}
                className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handelSignUp}
            >
              Sign Up
            </button>
          </form>

          <p className="text-center mt-4 text-sm">
            Already have an account? <a href="/sign-in" className="text-blue-500">Sign In</a>
          </p>
        </div>
      </div>
  );
};

export default SignUpPage;
