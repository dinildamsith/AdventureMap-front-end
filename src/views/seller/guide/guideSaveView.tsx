import React, { useState } from "react";
import Layout from "../../../layout";
// @ts-ignore
import {postRequest} from "../../../services/httpServices";
// @ts-ignore
import {BASE_URL, GUIDE_SAVE_URL} from "../../../config&Varibles/endPointUrls";

export default function GuideSaveView() {

    const [step, setStep] = useState(1);

    const [base64Image, setBase64Image] = useState<string | null>(null);
    const [guideName, setGuideName] = useState<any>(null)
    const [guideAge, setGuideAge] = useState<any>(null)
    const [guidePrice, setGuidePrice] = useState<any>(null)
    const [languages, setLanguages] = useState<any>(null)


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();

            // Convert file to base64 string
            reader.onload = () => {
                setBase64Image(reader.result as string); // Base64 string
            };

            reader.readAsDataURL(file); // Read file as Data URL
        }
    };

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // Convert the selectedOptions to an array and join them with #
        const selectedLanguages = Array.from(event.target.selectedOptions)
            .map(option => option.value)
            .join("#");
        setLanguages(selectedLanguages);
    };

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));


    const guideDetailsSaveHandel = async () => {
        await postRequest({
            url: BASE_URL + GUIDE_SAVE_URL,
            data: {
                accEmail: localStorage.getItem("loginUserEmail"),
                guideImage: base64Image,
                guideName,
                guideAge,
                guidePrice,
                languages
            }
        })
        console.log(base64Image)
        console.log(guideName,guideAge,guidePrice,languages)
    }

    return (
        <Layout>
            <div className="flex justify-center items-center min-h-screen px-4">
                <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6 mt-10">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Verify Details
                    </h2>

                    {/* Stepper */}
                    <ol className="flex items-center justify-between w-full mb-8">
                        <li className={`flex items-center ${step > 1 ? "text-blue-600" : "text-gray-400"}`}>
              <span className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? "bg-blue-100" : "bg-gray-200"}`}>
                1
              </span>
                            <span className="ml-2">Upload Image</span>
                        </li>
                        <li className={`flex items-center ${step > 2 ? "text-blue-600" : "text-gray-400"}`}>
              <span className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? "bg-blue-100" : "bg-gray-200"}`}>
                2
              </span>
                            <span className="ml-2">Details</span>
                        </li>
                        <li className={`flex items-center ${step === 3 ? "text-blue-600" : "text-gray-400"}`}>
              <span className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 3 ? "bg-blue-100" : "bg-gray-200"}`}>
                3
              </span>
                            <span className="ml-2">Confirm</span>
                        </li>
                    </ol>

                    {/* Step Content */}
                    {step === 1 && (
                        <div className="flex flex-col items-center mb-6">
                            <label htmlFor="guideImage" className="cursor-pointer">
                                {base64Image ? (
                                    <img
                                        src={base64Image}
                                        alt="Selected Guide"
                                        className="w-32 h-32 object-cover rounded-full shadow-lg"
                                    />
                                ) : (
                                    <div
                                        className="w-32 h-32 flex items-center justify-center bg-gray-200 rounded-full shadow-md">
                                        <span className="text-gray-500">Upload Image</span>
                                    </div>
                                )}
                            </label>
                            <input
                                type="file"
                                id="guideImage"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="guideName" className="block text-sm font-semibold text-gray-700">
                                    Guide Name
                                </label>
                                <input
                                    type="text"
                                    id="guideName"
                                    placeholder="Enter guide name"
                                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(event) => setGuideName(event.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="guideAge" className="block text-sm font-semibold text-gray-700">
                                    Guide Age
                                </label>
                                <input
                                    type="number"
                                    id="guideAge"
                                    placeholder="Enter guide age"
                                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(event) => setGuideAge(event.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="guideAge" className="block text-sm font-semibold text-gray-700">
                                    Guide Amount
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter guide amount"
                                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(event) => setGuidePrice(event.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="guideLanguages" className="block text-sm font-semibold text-gray-700">
                                    Languages
                                </label>
                                <select
                                    id="guideLanguages"
                                    multiple
                                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={handleLanguageChange}
                                >
                                    <option value="english">English</option>
                                    <option value="spanish">Spanish</option>
                                    <option value="french">French</option>
                                    <option value="german">German</option>
                                </select>
                                <small className="text-gray-500">Hold Ctrl (Cmd on Mac) to select multiple.</small>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div>
                            <p className="text-gray-600 mb-4">Confirm all the details before saving.</p>
                            {/* Add confirmation summary if needed */}
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="mt-6 flex justify-between">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400"
                            >
                                Previous
                            </button>
                        )}
                        {step < 3 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
                                onClick={guideDetailsSaveHandel}
                            >
                                Save Guide
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
