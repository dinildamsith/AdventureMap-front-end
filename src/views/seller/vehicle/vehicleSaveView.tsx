import React, { useState } from "react";
// @ts-ignore
import {BASE_URL, IMAGE_UPLOAD_URL, VEHICLE_DETAILS_SAVE_URL} from "../../../configAndVaribles/endPointUrls.js";
// @ts-ignore
import {postRequest} from "../../../services/httpServices.js";
import SubLayout from "../../../layout/subLayout.tsx";
import {useNavigate} from "react-router-dom";

export default function VehicleSaveView() {

    const navigation = useNavigate()
    const [step, setStep] = useState(1);
    const[loading, setLoading] = useState(false);
    // const [vehicleImages, setVehicleImages] = useState<string[]>([]); // State to store image URLs
    // const [rentType, setRentType] = useState<string>("without-driver");
    const [driverDetails, setDriverDetails] = useState({
        accEmail: localStorage.getItem("loginUserEmail"),
        driverImage: "",
        driverName: "",
        driverAge: "",
        license: "",
        driverExperience: "",
        driverLanguages: "",
        rentWithDriver: "",
        rentAmount: "",
        rentType: "WITH_DRIVER",

        vehicleImage: [],
        vehicleNumber: "",
        vehicleBrand: "toyota",
        vehicleType: "ac",
        sheetCount: ""
    });


    const headers = {
        "Content-Type": "multipart/form-data" // This is usually handled automatically by FormData, but you can include it explicitly if needed
    };




    const handleVehicleImageChange = async (e: any) => {
        const selectedFile = e.target.files[0]; // Get the selected file directly from the event

        if (!selectedFile) return; // If no file is selected, exit the function

        const formData = new FormData();
        formData.append("image", selectedFile); // Append the file to the FormData object

        try {
            // Make the API request to upload the image
            setLoading(true);
            const res = await postRequest({
                url: BASE_URL + IMAGE_UPLOAD_URL,
                data: formData,
                headers: headers,
            });

            if (res && res.filePath) {
                setLoading(false);
                // Assuming `res.filePath` contains the URL of the uploaded image
                setDriverDetails((prevDetails:any) => {
                    const updatedImages = [...prevDetails.vehicleImage, res.filePath]; // Add new URL to the array
                    return {
                        ...prevDetails,
                        vehicleImage: updatedImages.slice(0, 5) // Limit the array to a maximum of 5 images
                    };
                });

            } else {
                setLoading(false);
                console.error("Failed to upload image. Invalid response:", res);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };


    const handleDriverImageChange = async (e: any) => {
        const selectedFile = e.target.files[0]; // Get the selected file directly from the event

        if (!selectedFile) return; // If no file is selected, exit the function

        const formData = new FormData();
        formData.append("image", selectedFile); // Append the file to the FormData object

        try {
            // Make the API request to upload the image\
            setLoading(true);
            const res = await postRequest({
                url: BASE_URL + IMAGE_UPLOAD_URL,
                data: formData,
                headers: headers,
            });

            if (res && res.filePath) {
                setLoading(false);
                // Assuming `res.filePath` contains the URL of the uploaded image
                setDriverDetails((prev) => ({ ...prev, driverImage: res.filePath }));
            } else {
                setLoading(false);
                console.error("Failed to upload image. Invalid response:", res);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = event.target;
         setDriverDetails((prev) => ({ ...prev, [id]: value }));
    };

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const handelSave = async () => {
        setLoading(true);
        const res = await postRequest({
            url: BASE_URL + VEHICLE_DETAILS_SAVE_URL,
            data: driverDetails
        })

        if (res.status === 'SUCCESS') {
            setLoading(false);
            navigation("/vehicle-manage")
        } else {
            setLoading(false);
            navigation("/vehicle-manage")
        }
        console.log(driverDetails)
    }

    return (
        <SubLayout>
                 {loading && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-[9999] bg-opacity-50 bg-gray-200">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#3bd7f7] rounded-full animate-spin"></div>
        </div>
      )}
      
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
                                    {driverDetails.vehicleImage.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Vehicle ${index + 1}`}
                                            className="w-24 h-24 object-cover rounded-md shadow-lg"
                                        />
                                    ))}
                                    {driverDetails.vehicleImage.length < 5 && (
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
                                onChange={handleVehicleImageChange}
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
                                    value={driverDetails.vehicleBrand}
                                    onChange={handleInputChange}
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
                                    value={driverDetails.vehicleType}
                                    onChange={handleInputChange}
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
                                    value={driverDetails.rentType}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="WITH_DRIVER">With Driver</option>
                                    <option value="WITH_OUT_DRIVER">Without Driver</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="rentWithDriver" className="block text-sm font-semibold text-gray-700">
                                    Rent Amount
                                </label>
                                <input
                                    type="number"
                                    id="rentAmount"
                                    value={driverDetails.rentAmount || ""}
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
                                    id="sheetCount"
                                    value={driverDetails.sheetCount || ""}
                                    onChange={handleInputChange}
                                    placeholder="Enter sheet count"
                                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="rentWithDriver" className="block text-sm font-semibold text-gray-700">
                                    Vehicle Number
                                </label>
                                <input
                                    type="text"
                                    id="vehicleNumber"
                                    value={driverDetails.vehicleNumber || ""}
                                    onChange={handleInputChange}
                                    placeholder="Enter sheet count"
                                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            {driverDetails.rentType === "WITH_DRIVER" && (
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
                                        {driverDetails.driverImage && (
                                            <img
                                                src={driverDetails.driverImage}
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
                                            id="driverName"
                                            value={driverDetails.driverName}
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
                                            id="driverAge"
                                            value={driverDetails.driverAge}
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
                                        <label htmlFor="license" className="block text-sm font-semibold text-gray-700">
                                            Driver Experience
                                        </label>
                                        <input
                                            type="text"
                                            id="driverExperience"
                                            value={driverDetails.driverExperience}
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
                                            id="driverLanguages"
                                            value={driverDetails.driverLanguages}
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
                            onClick={() => {
                                if (step === 3) {
                                    handelSave(); // Call save function
                                } else {
                                    nextStep(); // Proceed to the next step
                                }
                            }}
                            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
                        >
                            {step === 3 ? "Save Vehicle" : "Next"}
                        </button>
                    </div>
                </div>
            </div>
        </SubLayout>
    );
}
