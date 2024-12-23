import { useState } from "react";
import SignInBackgroundImage from '../../assets/signupBackground.jpg'; // Import the background image

const SignInPage = () => {
    const [accountType, setAccountType] = useState<any>(null);

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
             style={{ backgroundImage: `url(${SignInBackgroundImage})` }}>

            {/* Background overlay with opacity */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md opacity-80">
                <h2 className="text-2xl font-semibold text-center mb-6">Sign In to Your Account</h2>

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
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-semibold">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-center mt-4 text-sm">
                    Don't have an account? <a href="/sign-up" className="text-blue-500">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default SignInPage;
