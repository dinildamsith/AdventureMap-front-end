import { useState } from "react";
import Layout from "../../../layout";

export default function VehicleSaveView() {
    const [images, setImages] = useState<any[]>([]);
    const [step, setStep] = useState(1);
    const [rentType, setRentType] = useState<string>("without-driver");
    const [driverDetails, setDriverDetails] = useState({
        image: "",
        name: "",
        age: "",
        license: "",
        languages: "",
        rentWithDriver: "",
    });

    const handleImageChange = (event: any) => {
        const files = event.target.files;
        if (files) {
            const imageUrls = Array.from(files).map((file: any) => URL.createObjectURL(file));
            setImages((prevImages) => [...prevImages, ...imageUrls].slice(0, 5)); // Limit to 5 images
        }
    };

    const handleDriverImageChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setDriverDetails((prev) => ({ ...prev, image: imageUrl }));
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = event.target;
        if (rentType === "with-driver") {
            setDriverDetails((prev) => ({ ...prev, [id]: value }));
        }
    };

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

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
                            <span className="ml-2">Upload Images</span>
                        </li>
                        <li className={`flex items-center ${step > 2 ? "text-blue-600" : "text-gray-400"}`}>
                            <span className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? "bg-blue-100" : "bg-gray-200"}`}>
                                2
                            </span>
                            <span className="ml-2">Vehicle Info</span>
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
                            <label htmlFor="vehicleImages" className="cursor-pointer">
                                <div className="flex flex-wrap justify-center grid-cols-3 gap-4">
                                    {images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Vehicle ${index + 1}`}
                                            className="w-24 h-24 object-cover rounded-md shadow-lg"
                                        />
                                    ))}
                                    {images.length < 5 && (
                                        <div
                                            className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-md shadow-md">
                                            <span className="text-gray-500">Add Image</span>
                                        </div>
                                    )}
                                </div>
                            </label>
                            <input
                                type="file"
                                id="vehicleImages"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <small className="text-gray-500 mt-2">You can upload up to 5 images.</small>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="vehicleBrand" className="block text-sm font-semibold text-gray-700">
                                    Vehicle Brand
                                </label>
                                <select
                                    id="vehicleBrand"
                                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="toyota">Toyota</option>
                                    <option value="alto">Alto</option>
                                    <option value="benz">Benz</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="vehicleType" className="block text-sm font-semibold text-gray-700">
                                    Vehicle Type
                                </label>
                                <select
                                    id="vehicleType"
                                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="ac">AC</option>
                                    <option value="non-ac">Non-AC</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="rentType" className="block text-sm font-semibold text-gray-700">
                                    Rent Type
                                </label>
                                <select
                                    id="rentType"
                                    value={rentType}
                                    onChange={(e) => setRentType(e.target.value)}
                                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="with-driver">With Driver</option>
                                    <option value="without-driver">Without Driver</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="rentWithDriver" className="block text-sm font-semibold text-gray-700">
                                    Rent Amount
                                </label>
                                <input
                                    type="number"
                                    id="rentWithDriver"
                                    value={driverDetails.rentWithDriver}
                                    onChange={handleInputChange}
                                    placeholder="Enter daily rent amount"
                                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="rentWithDriver" className="block text-sm font-semibold text-gray-700">
                                    Passenger Sheet Count
                                </label>
                                <input
                                    type="number"
                                    id="rentWithDriver"
                                    onChange={handleInputChange}
                                    placeholder="Enter daily rent amount"
                                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            {rentType === "with-driver" && (
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="driverImage"
                                               className="block text-sm font-semibold text-gray-700">
                                            Driver Image
                                        </label>
                                        <input
                                            type="file"
                                            id="driverImage"
                                            accept="image/*"
                                            onChange={handleDriverImageChange}
                                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        {driverDetails.image && (
                                            <img
                                                src={driverDetails.image}
                                                alt="Driver"
                                                className="mt-2 w-24 h-24 rounded-md shadow-md object-cover"
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                                            Driver Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={driverDetails.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter driver name"
                                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="age" className="block text-sm font-semibold text-gray-700">
                                            Driver Age
                                        </label>
                                        <input
                                            type="number"
                                            id="age"
                                            value={driverDetails.age}
                                            onChange={handleInputChange}
                                            placeholder="Enter driver age"
                                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="license" className="block text-sm font-semibold text-gray-700">
                                            Driver License
                                        </label>
                                        <input
                                            type="text"
                                            id="license"
                                            value={driverDetails.license}
                                            onChange={handleInputChange}
                                            placeholder="Enter driver license details"
                                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="languages"
                                               className="block text-sm font-semibold text-gray-700">
                                            Driver Languages
                                        </label>
                                        <input
                                            type="text"
                                            id="languages"
                                            value={driverDetails.languages}
                                            onChange={handleInputChange}
                                            placeholder="Enter driver languages"
                                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700">Confirm Details</h3>
                            <p>Review the entered vehicle and driver details before submission.</p>
                            {/* Add your confirmation details here */}
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-6">
                        <button
                            onClick={prevStep}
                            disabled={step === 1}
                            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        >
                            Previous
                        </button>
                        <button
                            onClick={nextStep}
                            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
                        >
                            {step === 3 ? "Save Vehicle" : "Next"}
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
