import Layout from "../../../layout";
import {useEffect, useState} from "react";
import {PencilIcon} from "@heroicons/react/16/solid";
// @ts-ignore
import {getRequest} from "../../../services/httpServices.js";
// @ts-ignore
import {BASE_URL, GET_SELECTED_VEHICLE} from "../../../config&Varibles/endPointUrls.js";


export default function VehicleProfileManage() {
    // State to track the selected tab
    const [activeTab, setActiveTab] = useState("about");


    //----------------vehicle
    const [isEditModalOpen, setIsEditModalOpen] = useState<any>(false);

    const [vehicleDetails, setVehicleDetails] = useState<any>({

        //-------------vehicle details
        vehicleBrand: "",
        vehicleNumber: "",
        vehicleImage: [],
        vehicleType: "",
        rentType: "",
        sheetCount: "",
        rentAmount: "",

        //------------- driver details
        driverImage: "",
        driverName: "",
        driverAge: "",
        driverLanguages: ""

    });

    const [newSpec, setNewSpec] = useState<any>(""); // Temporary input for new language

    // Handle modal open and close
    const openEditModal = () => {
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    // Handle form input changes
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setVehicleDetails({ ...vehicleDetails, [name]: value });
    };

    // Handle update button click
    const handleUpdate = () => {
        closeEditModal();
    };


    useEffect(() => {

        const getVehicle = async () => {
            const res = await getRequest({url: BASE_URL + GET_SELECTED_VEHICLE + localStorage.getItem("loginUserEmail")})
            setVehicleDetails({
                vehicleBrand: res.data.vehicleBrand,
                vehicleNumber: res.data.vehicleNumber,
                vehicleImage: res.data.vehicleImage,
                vehicleType: res.data.vehicleType,
                rentType: res.data.rentType,
                sheetCount: res.data.sheetCount,
                rentAmount: res.data.rentAmount,

                driverImage: res.data.driverImage,
                driverName: res.data.driverName,
                driverAge: res.data.driverAge,
                driverLanguages: res.data.driverLanguages
                })
            console.log(res)
        }

        getVehicle()
    }, []);


    //----------------driver
    const [isEditModalOpenII, setIsEditModalOpenII] = useState<any>(false);


    const [updatedDriverData, setUpdateDriverData] = useState<any>({
        name: "James Anderson",
        languages: ["English", "Spanish"],
        experience: "8 years",
        speciality: "Long-distance and city tours.",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
    });

    const [newLanguage, setNewLanguage] = useState<any>(""); // Temporary input for new language

    // Handle modal open and close
    const openEditModalII = () => {
        setIsEditModalOpenII(true);
    };

    const closeEditModalII = () => {
        setIsEditModalOpenII(false);
    };

    // Handle form input changes
    const handleInputChangeII = (e: any) => {
        const { name, value } = e.target;
        setUpdateDriverData({ ...updatedDriverData, [name]: value });
    };

    // Handle update button click
    const handleUpdateII = () => {
        // setDriverData(vehicleDetails); // Update the guide data
        closeEditModalII();
    };

    function capitalizeFirstLetter(str:any) {
        if (!str) return ""; // Handle empty or null strings
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <>
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
                                                src={vehicleDetails.vehicleImage[0]}
                                                className="w-32  bg-gray-300 rounded-full mb-4 shrink-0"
                                                alt="profile"
                                            />
                                            <h1 className="text-xl font-bold">{capitalizeFirstLetter(vehicleDetails.vehicleBrand)}</h1>
                                            <h1 className="text-[16px] font-bold">{vehicleDetails.rentType}</h1>
                                            <h1 className="text-[16px] font-bold">Rs {vehicleDetails.rentAmount}.00</h1>

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

                                            <button type="button" onClick={openEditModal}
                                                    className=" justify-center w-full mt-6 text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                                                {/* Heroicon: User Plus Icon */}
                                                <PencilIcon className="w-4 h-4 me-2 text-current" aria-hidden="true"/>
                                                Edit
                                            </button>
                                        </div>
                                        <hr className="my-6 border-t border-gray-300"/>
                                        <div className="flex flex-col">
                                            <span
                                                className="text-gray-700 uppercase font-bold tracking-wider mb-2">Specification</span>
                                            <ul>
                                                <li className="mb-2 text-black">Vehicle Number: {vehicleDetails.vehicleNumber}</li>
                                                <li className="mb-2 text-black">Vehicle Type: {vehicleDetails.vehicleType.toUpperCase()}</li>
                                                <li className="mb-2 text-black">Sheet Count: {vehicleDetails.sheetCount}</li>
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

                                                {/* Bio */}
                                                <div className="mt-8 bg-gray-100 rounded-lg p-6 mt-10">
                                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Bio</h3>
                                                    <p className="text-gray-700 leading-relaxed">
                                                        James is a highly skilled and experienced driver with a passion
                                                        for ensuring passenger safety and comfort.
                                                        Known for his punctuality and excellent navigation skills, he
                                                        has successfully handled hundreds of trips
                                                        across various terrains. Whether it’s a family vacation or a
                                                        business trip, James is the go-to driver
                                                        for a smooth and enjoyable ride.
                                                    </p>
                                                </div>


                                                <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                                    {
                                                        vehicleDetails.vehicleImage.map((image:any, index:any) => (
                                                            <img
                                                                key={index}
                                                                src= {image}
                                                                alt="gallery image"
                                                                className="w-full h-48 object-cover rounded-lg"
                                                            />
                                                        ))
                                                    }

                                                </div>
                                            </>
                                        )}


                                        {/* driver Section */}
                                        {activeTab === "driver" && (
                                            <>
                                                <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">

                                                    {/* Edit Button Positioned to the Right */}
                                                    <div className="w-full flex justify-end">
                                                        <button
                                                            type="button"
                                                            onClick={openEditModalII}
                                                            className="justify-center w-[100px] mt-6 text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
                                                        >
                                                            {/* Heroicon: User Plus Icon */}
                                                            <PencilIcon
                                                                className="w-4 h-4 me-2 text-current"
                                                                aria-hidden="true"
                                                            />
                                                            Edit
                                                        </button>
                                                    </div>

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
                                                                    <path d="M10 15l5.09 3-1.45-6.3L18 8.27l-6.4-.56L10 2l-1.6 5.71L2 8.27l4.36 3.43L4.91 18z" />
                                                                </svg>
                                                            ))}
                                                        </div>
                                                        <span className="text-gray-600 text-sm">(4.8)</span>
                                                    </div>

                                                    <p className="text-gray-600 mt-4">
                                                        <span className="font-bold">Experience:</span> 8 years driving
                                                        luxury vehicles.
                                                    </p>
                                                    <p className="text-gray-600 mt-2">
                                                        <span className="font-bold">Languages:</span> {vehicleDetails.driverLanguages}
                                                    </p>
                                                    <p className="text-gray-600 mt-2">
                                                        <span className="font-bold">Specialty:</span> Long-distance and
                                                        city tours.
                                                    </p>
                                                </div>

                                                {/* Driver Bio */}
                                                <div className="mt-8 bg-gray-100 rounded-lg p-6">
                                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Bio</h3>
                                                    <p className="text-gray-700 leading-relaxed">
                                                        James is a highly skilled and experienced driver with a passion
                                                        for ensuring passenger safety and comfort. Known for his
                                                        punctuality and excellent navigation skills, he has
                                                        successfully handled hundreds of trips across various terrains.
                                                        Whether it’s a family vacation or a business trip, James is the
                                                        go-to driver for a smooth and enjoyable ride.
                                                    </p>
                                                </div>
                                            </>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*--------------------------- vehicle Edit Modal */}
                    {isEditModalOpen && (
                        <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white rounded-lg p-6 w-96 mt-[5rem]">
                                <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

                                {/* Current Image with "+" Mark */}
                                <div className="relative mb-4">
                                    <img
                                        src={vehicleDetails.image || "https://via.placeholder.com/150"}
                                        alt="Profile"
                                        className="w-32 h-32 mx-auto rounded-full border border-gray-300 object-cover"
                                    />
                                    <label
                                        htmlFor="imageUpload"
                                        className="absolute bottom-0 right-10 bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
                                    >
                                        +
                                    </label>
                                    <input
                                        type="file"
                                        id="imageUpload"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e: any) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onload = () => {
                                                    setVehicleDetails({ ...vehicleDetails, image: reader.result });
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                </div>

                                {/* Name Input */}
                                <label className="block mb-2">
                                    Name
                                    <input
                                        type="text"
                                        name="name"
                                        value={vehicleDetails.brand}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    />
                                </label>

                                {/* Drive */}
                                <label className="block mb-2">
                                    Driver
                                    <input
                                        name="driver"
                                        disabled={true}
                                        value={vehicleDetails.driver}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    />
                                </label>

                                {/* Languages Input with Tags */}
                                <label className="block mb-2">
                                    Specification
                                    <div className="w-full border border-gray-300 rounded-lg px-4 py-2 flex flex-wrap items-center">
                                        {vehicleDetails.spec.map((spec: string, index: number) => (
                                            <span
                                                key={index}
                                                className="bg-blue-500 text-white rounded-full px-3 py-1 mr-2 mb-2 flex items-center"
                                            >
                                                {spec}
                                                <button
                                                    onClick={() =>
                                                        setVehicleDetails({
                                                            ...vehicleDetails,
                                                            spec: vehicleDetails.spec.filter(
                                                                (_lang: string, i: number) => i !== index
                                                            ),
                                                        })
                                                    }
                                                    className="ml-2 text-white text-sm"
                                                >
                                                     ✕
                                                </button>
                                           </span>
                                        ))}
                                        <input
                                            type="text"
                                            value={newSpec}
                                            onChange={(e:any) => setNewSpec(e.target.value)}
                                            onKeyDown={(e:any) => {
                                                if (e.key === "Enter" && newSpec.trim() !== "") {
                                                    setVehicleDetails({
                                                        ...vehicleDetails,
                                                        spec: [...vehicleDetails.spec, newSpec.trim()],
                                                    });
                                                    setNewSpec(""); // Clear the input
                                                }
                                            }}
                                            onBlur={() => {
                                                if (newSpec.trim() !== "") {
                                                    setVehicleDetails({
                                                        ...vehicleDetails,
                                                        spec: [...vehicleDetails.spec, newSpec.trim()],
                                                    });
                                                    setNewSpec(""); // Clear the input
                                                }
                                            }}
                                            placeholder="spec"
                                            className="flex-grow outline-none"
                                        />
                                    </div>
                                </label>




                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={closeEditModal}
                                        className="text-gray-600 border border-gray-300 px-4 py-2 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleUpdate}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}



                    {/*--------------------------- driver Edit Modal */}
                    {isEditModalOpenII && (
                        <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white rounded-lg p-6 w-96 mt-[5rem]">
                                <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

                                {/* Current Image with "+" Mark */}
                                <div className="relative mb-4">
                                    <img
                                        src={updatedDriverData.image || "https://via.placeholder.com/150"}
                                        alt="Profile"
                                        className="w-32 h-32 mx-auto rounded-full border border-gray-300 object-cover"
                                    />
                                    <label
                                        htmlFor="imageUpload"
                                        className="absolute bottom-0 right-10 bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
                                    >
                                        +
                                    </label>
                                    <input
                                        type="file"
                                        id="imageUpload"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e: any) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onload = () => {
                                                    setUpdateDriverData({...updatedDriverData, image: reader.result});
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                </div>

                                {/* Name Input */}
                                <label className="block mb-2">
                                    Name
                                    <input
                                        type="text"
                                        name="name"
                                        value={updatedDriverData.name}
                                        onChange={handleInputChangeII}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    />
                                </label>

                                {/*  */}
                                <label className="block mb-2">
                                    Experience
                                    <input
                                        name="expieince"
                                        value={updatedDriverData.experience}
                                        onChange={handleInputChangeII}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    />
                                </label>


                                <label className="block mb-2">
                                    Speciality
                                    <input
                                        name="expieince"
                                        value={updatedDriverData.speciality}
                                        onChange={handleInputChangeII}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    />
                                </label>


                                {/* Languages Input with Tags */}
                                <label className="block mb-2">
                                    Languages
                                    <div className="w-full border border-gray-300 rounded-lg px-4 py-2 flex flex-wrap items-center">
                                        {updatedDriverData.languages.map((language: string, index: number) => (
                                            <span
                                                key={index}
                                                className="bg-blue-500 text-white rounded-full px-3 py-1 mr-2 mb-2 flex items-center"
                                            >
                                                {language}
                                                <button
                                                    onClick={() =>
                                                        setUpdateDriverData({
                                                            ...updatedDriverData,
                                                            languages: updatedDriverData.languages.filter(
                                                                (_lang: string, i: number) => i !== index
                                                            ),
                                                        })
                                                    }
                                                    className="ml-2 text-white text-sm"
                                                >
                                                     ✕
                                                </button>
                                           </span>
                                        ))}
                                        <input
                                            type="text"
                                            value={newLanguage}
                                            onChange={(e:any) => setNewLanguage(e.target.value)}
                                            onKeyDown={(e:any) => {
                                                if (e.key === "Enter" && newLanguage.trim() !== "") {
                                                    setUpdateDriverData({
                                                        ...updatedDriverData,
                                                        languages: [...updatedDriverData.languages, newLanguage.trim()],
                                                    });
                                                    setNewLanguage(""); // Clear the input
                                                }
                                            }}
                                            onBlur={() => {
                                                if (newLanguage.trim() !== "") {
                                                    setUpdateDriverData({
                                                        ...updatedDriverData,
                                                        languages: [...updatedDriverData.languages, newLanguage.trim()],
                                                    });
                                                    setNewLanguage(""); // Clear the input
                                                }
                                            }}
                                            placeholder="Add a language"
                                            className="flex-grow outline-none"
                                        />
                                    </div>
                                </label>


                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={closeEditModalII}
                                        className="text-gray-600 border border-gray-300 px-4 py-2 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleUpdateII}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Layout>
        </>
    );
}
