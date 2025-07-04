import Layout from "../../../layout/mainLayout.tsx";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
// @ts-ignore
import {getRequest} from "../../../services/httpServices.js";
// @ts-ignore
import {BASE_URL, GET_SELECTED_VEHICLE} from "../../../configAndVaribles/endPointUrls.js";


export default function VehicleProfile() {

    const navigation = useNavigate()
    const { vehicleEmail } = useParams();

    // State to track the selected tab
    const [activeTab, setActiveTab] = useState("about");
    const [vehicleDetails, setVehicleDetails] = useState<any>({})
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getVehicle = async () => {
            setLoading(true)
            const res = await getRequest({url: BASE_URL + GET_SELECTED_VEHICLE + vehicleEmail})

            if (res.status === "SUCCESS") {
                setVehicleDetails(res.data)
                setLoading(false)
            } else {
                setLoading(false)
            }
        }

        getVehicle()
    }, []);


    const handelHireButton = async (accEmail:any) => {
        navigation("/order/"+accEmail)
    }

    return (
        <>
            {loading && (
                <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-[9999] bg-opacity-50 bg-gray-200">
                    <div className="w-10 h-10 border-4 border-gray-200 border-t-[#3bd7f7] rounded-full animate-spin"></div>
                </div>
            )}
            <Layout>
                <div className={"mt-28"}>
                    <div>
                        <div className="container mx-auto py-8">
                            <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                                {/* Profile Information */}
                                <div className="col-span-4 sm:col-span-3">
                                    <div className="bg-white rounded-lg p-6" style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' }}>
                                        <div className="flex flex-col items-center">
                                            <img
                                                src={vehicleDetails?.vehicleImage?.[0] || 'default-image-url.jpg'}
                                                className="w-32 h-32 mx-auto rounded-full border border-gray-300 object-cover"
                                            />
                                            <h1 className="text-xl font-bold uppercase">{vehicleDetails.vehicleBrand}</h1>
                                            <h1 className="text-[16px] font-bold">[{vehicleDetails.rentType}]</h1>
                                            <h1 className="text-[16px] font-bold">Rs: {vehicleDetails.rentAmount}.00</h1>

                                            <span className="text-gray-500 text-sm">Vehicle Rating:</span>
                                            {/* Star Rating */}
                                            <div className="flex space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        className={`w-5 h-5 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            d="M10 15l5.09 3-1.45-6.3L18 8.27l-6.4-.56L10 2l-1.6 5.71L2 8.27l4.36 3.43L4.91 18z"/>
                                                    </svg>
                                                ))}
                                            </div>
                                            <span className="text-gray-600 text-sm">(4.8)</span>

                                            <button type="button"
                                                    onClick={()=> handelHireButton(vehicleDetails.accEmail)}
                                                    className=" justify-center w-full mt-6 text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                                                {/* Heroicon: User Plus Icon */}
                                                <svg className="w-4 h-4 me-2" aria-hidden="true"
                                                     xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                     viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd"
                                                          d="M16 9a4 4 0 1 0-8 0 4 4 0 0 0 8 0ZM7 4a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm8 6a6 6 0 1 0-12 0 6 6 0 0 0 12 0ZM14 13h-2v-2a1 1 0 1 0-2 0v2H8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2v2a1 1 0 0 0 2 0v-2h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1z"
                                                          clip-rule="evenodd"/>
                                                </svg>
                                                Hire
                                            </button>
                                        </div>
                                        <hr className="my-6 border-t border-gray-300"/>
                                        <div className="flex flex-col">
                                            <span
                                                className="text-gray-700 uppercase font-bold tracking-wider mb-2">Details</span>
                                            <ul>
                                                <li className="mb-2 text-black">Vehicle Number
                                                    : {vehicleDetails.vehicleNumber}</li>
                                                <li className="mb-2 text-black">Vehicle Type
                                                    : {vehicleDetails.vehicleType}</li>
                                                <li className="mb-2 text-black">Sheet Count
                                                    : {vehicleDetails.sheetCount}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Main Content (Tabs and Sections) */}
                                <div className="col-span-4 sm:col-span-9">
                                    <div className="bg-white rounded-lg p-6"
                                         style={{boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'}}>
                                        {/* Navigation Tabs */}
                                        <div className="flex space-x-4 mb-6">
                                            <button
                                                onClick={() => setActiveTab("reviews")}
                                                className={`text-xl font-bold ${activeTab === "reviews" ? "text-blue-500" : "text-gray-700"}`}
                                            >
                                                Reviews
                                            </button>
                                            <button
                                                onClick={() => setActiveTab("vehicle")}
                                                className={`text-xl font-bold ${activeTab === "vehicle" ? "text-blue-500" : "text-gray-700"}`}
                                            >
                                                Vehicle
                                            </button>
                                            <button
                                                onClick={() => setActiveTab("driver")}
                                                className={`text-xl font-bold ${activeTab === "driver" ? "text-blue-500" : "text-gray-700"}`}
                                            >
                                               Driver
                                            </button>
                                        </div>


                                        {/* Reviews Section */}
                                        {activeTab === "reviews" && (
                                            <>
                                                <div className="flex flex-col space-y-4">
                                                    <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md">
                                                        <img
                                                            src="https://randomuser.me/api/portraits/women/85.jpg"
                                                            alt="reviewer"
                                                            className="w-12 h-12 rounded-full mr-4"
                                                        />
                                                        <div>
                                                            <h3 className="text-lg font-semibold">Alice Johnson</h3>
                                                            <p className="text-gray-700">"It was an amazing experience! Highly recommended."</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md">
                                                        <img
                                                            src="https://randomuser.me/api/portraits/men/92.jpg"
                                                            alt="reviewer"
                                                            className="w-12 h-12 rounded-full mr-4"
                                                        />
                                                        <div>
                                                            <h3 className="text-lg font-semibold">Bob Smith</h3>
                                                            <p className="text-gray-700">"Very professional and knowledgeable. Would definitely book again."</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {/* vehicle Section */}
                                        {activeTab === "vehicle" && (
                                            <>

                                                <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                                    {vehicleDetails?.vehicleImage?.length > 0 ? (
                                                        vehicleDetails.vehicleImage.map((image: any, index: number) => (
                                                            <img
                                                                key={index} // Add a unique key for each image
                                                                src={image || "https://via.placeholder.com/150"} // Fallback to a placeholder if the image is null/undefined
                                                                alt={`gallery image ${index + 1}`} // Provide a descriptive alt text
                                                                className="w-full h-48 object-cover rounded-lg"
                                                            />
                                                        ))
                                                    ) : (
                                                        <p>No images available</p> // Fallback UI when there are no images
                                                    )}
                                                </div>
                                            </>
                                        )}


                                        {/* driver Section */}
                                        {activeTab === "driver" && (
                                            <>
                                                {
                                                    vehicleDetails.driverCode ? (
                                                        <>
                                                            <div
                                                                className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">

                                                                {/* Driver Image */}
                                                                <img
                                                                    src={vehicleDetails.driverImage}
                                                                    alt="driver profile"
                                                                    className="w-32 h-32 object-cover rounded-full mb-4 shadow-lg"
                                                                />

                                                                {/* Driver Info */}
                                                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                                                    {vehicleDetails.driverName}
                                                                </h2>
                                                                <div className="flex items-center space-x-2">
                                                                    <span className="text-gray-500 text-sm">Driver Rating:</span>
                                                                    {/* Star Rating */}
                                                                    <div className="flex space-x-1">
                                                                        {[...Array(5)].map((_, i) => (
                                                                            <svg
                                                                                key={i}
                                                                                className={`w-5 h-5 ${
                                                                                    i < 4 ? "text-yellow-400" : "text-gray-300"
                                                                                }`}
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                fill="currentColor"
                                                                                viewBox="0 0 20 20"
                                                                            >
                                                                                <path
                                                                                    d="M10 15l5.09 3-1.45-6.3L18 8.27l-6.4-.56L10 2l-1.6 5.71L2 8.27l4.36 3.43L4.91 18z"/>
                                                                            </svg>
                                                                        ))}
                                                                    </div>
                                                                    <span className="text-gray-600 text-sm">(4.8)</span>
                                                                </div>

                                                                <p className="text-gray-600 mt-4">
                                                                    <span
                                                                        className="font-bold">Experience:</span> {vehicleDetails.driverExperience}
                                                                </p>
                                                                <p className="text-gray-600 mt-2">
                                                                    <span
                                                                        className="font-bold">Languages:</span> {vehicleDetails.driverLanguages}
                                                                </p>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                          <h1>No Driver</h1>
                                                        </>
                                                    )
                                                }
                                            </>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
