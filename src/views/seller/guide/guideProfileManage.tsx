import Layout from "../../../layout";
import {useEffect, useState} from "react";
import { PencilIcon } from "@heroicons/react/16/solid";
// @ts-ignore
import {getRequest, postRequest, putRequest} from "../../../services/httpServices.js";
// @ts-ignore
import {BASE_URL, GUIDE_GALLERY_UPDATE_URL, GUIDE_UPDATE_URL, IMAGE_UPLOAD_URL, SELECTED_GUIDE_GET_URL} from "../../../config&Varibles/endPointUrls.js";

export default function GuideProfileManage() {
    // State to track the selected tab
    const [activeTab, setActiveTab] = useState<any>("about");

    const [images, setImages] = useState<any>([]);


    // Add new image from device
    const handleAddImage = async (e:any) => {
        const selectedFile = e.target.files[0]; // Get the selected file directly from the event

        if (!selectedFile) return; // If no file is selected, exit the function

        const formData = new FormData();
        formData.append("image", selectedFile); // Append the file directly from the event

        console.log(formData); // Log the FormData object

        // Make the API request to upload the image
        const res = await postRequest({
            url: BASE_URL + IMAGE_UPLOAD_URL,
            data: formData,
            headers: headers,
        });


           setImages([...images, res.filePath]); // Add the image to the gallery



    };

    // Remove image
    const removeImage = (index:any) => {
        setImages(images.filter((_: any, i: any) => i !== index));
    };


    // State to track the selected tab
    const [isEditModalOpen, setIsEditModalOpen] = useState<any>(false);


    const [updatedData, setUpdatedData] = useState<any>({
        accEmail: "",
        name: "",
        about: "",
        image: "",
        age: "",
        price: "",
        languages: ["LKKK"], // Array to store language tags
    });


    const headers = {
        "Content-Type": "multipart/form-data" // This is usually handled automatically by FormData, but you can include it explicitly if needed
    };

    const newProfilePicSelectHandel = async (e: any) => {
        const selectedFile = e.target.files[0]; // Get the selected file directly from the event

        if (!selectedFile) return; // If no file is selected, exit the function

        const formData = new FormData();
        formData.append("image", selectedFile); // Append the file directly from the event

        console.log(formData); // Log the FormData object

        // Make the API request to upload the image
        const res = await postRequest({
            url: BASE_URL + IMAGE_UPLOAD_URL,
            data: formData,
            headers: headers,
        });

        // Set the image URL or file path returned from the response
        setUpdatedData({ ...updatedData, image: res.filePath });
        console.log(res); // Log the response to see the file path
    }

    const [newLanguage, setNewLanguage] = useState<any>(""); // Temporary input for new language

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
        setUpdatedData({ ...updatedData, [name]: value });
    };


    const handleUpdateGallery = async () => {
        await putRequest({
            url: BASE_URL + GUIDE_GALLERY_UPDATE_URL,
            data: {
                accEmail: localStorage.getItem("loginUserEmail"),
                images
            }

        })
    }

    // Handle update button click
    const handleUpdate = async () => {
        await putRequest({
            url: BASE_URL + GUIDE_UPDATE_URL,
            data: updatedData
        })
        console.log(updatedData)
        // closeEditModal();
    };

    useEffect(() => {
        const getGuide = async () => {
            const res = await getRequest({url: BASE_URL + SELECTED_GUIDE_GET_URL + localStorage.getItem("loginUserEmail")})
            const languagesArray = res.data.languages;
            setImages(res.data.imageGallery)
            setUpdatedData({
                accEmail: res.data.accEmail,
                image: res.data.guideImage,
                name:res.data.guideName,
                about: res.data.guideAbout,
                age: res.data.guideAge,
                price: res.data.guidePrice,
                languages: languagesArray || ["N/A"]
            })
            console.log(res)
        }
        getGuide()
    }, []);



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
                                                src={updatedData.image || ""}
                                                className="w-32 h-32 mx-auto rounded-full border border-gray-300 object-cover"
                                            />
                                            <h1 className="text-xl font-bold">{updatedData.name}</h1>

                                            <button type="button" onClick={openEditModal}
                                                    className="justify-center w-full mt-6 text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                                                <PencilIcon className="w-4 h-4 me-2 text-current" aria-hidden="true" />
                                                Edit
                                            </button>

                                        </div>
                                        <hr className="my-6 border-t border-gray-300"/>
                                        <div className="flex flex-col">
                                            <span
                                                className="text-gray-700 uppercase font-bold tracking-wider mb-2">Languages</span>
                                            <ul>
                                                {
                                                    updatedData.languages.map((languages:any, index:any) => (
                                                        <li key={index} className="mb-2 text-black">{languages}</li>
                                                    ))
                                                }

                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Main Content (Tabs and Sections) */}
                                <div className="col-span-4 sm:col-span-9">
                                    <div className="bg-white rounded-lg p-6" style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' }}>
                                        {/* Navigation Tabs */}
                                        <div className="flex space-x-4 mb-6">
                                            <button
                                                onClick={() => setActiveTab("about")}
                                                className={`text-xl font-bold ${activeTab === "about" ? "text-blue-500" : "text-gray-700"}`}
                                            >
                                                About Me
                                            </button>
                                            <button
                                                onClick={() => setActiveTab("reviews")}
                                                className={`text-xl font-bold ${activeTab === "reviews" ? "text-blue-500" : "text-gray-700"}`}
                                            >
                                                Reviews
                                            </button>
                                            <button
                                                onClick={() => setActiveTab("gallery")}
                                                className={`text-xl font-bold ${activeTab === "gallery" ? "text-blue-500" : "text-gray-700"}`}
                                            >
                                                Gallery
                                            </button>
                                        </div>

                                        {/* About Me Section */}
                                        {activeTab === "about" && (
                                            <>
                                                <p className="text-gray-700">
                                                    {updatedData.about}
                                                </p>
                                            </>
                                        )}

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

                                        {/* Gallery Section */}
                                        {activeTab === "gallery" && (
                                            <>
                                                <div>
                                                    {/* Header with "Update" and "Add Image" buttons */}
                                                    <div className="flex justify-end items-center mb-4 gap-4">
                                                        {/* Update Button (Left of Add Image) */}
                                                        {images.length > 0 && (
                                                            <button
                                                                onClick={handleUpdateGallery}
                                                                className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                                            >
                                                                Update
                                                            </button>
                                                        )}

                                                        {/* Add Image Button (Right Side) */}
                                                        <label
                                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600"
                                                        >
                                                            Add Image
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                className="hidden"
                                                                onChange={handleAddImage}
                                                            />
                                                        </label>
                                                    </div>

                                                    {/* Gallery Grid */}
                                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                                        {images.map((image: any, index: any) => (
                                                            <div key={index} className="relative">
                                                                <img
                                                                    src={image}
                                                                    alt={`Gallery image ${index + 1}`}
                                                                    className="w-full h-48 object-cover rounded-lg"
                                                                />
                                                                <button
                                                                    onClick={() => removeImage(index)}
                                                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                                                >
                                                                    ✕
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Edit Modal */}
                    {isEditModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white rounded-lg p-6 w-96 mt-[5rem]" style={{ height: '600px',width:'700px', overflowY: 'auto' }}>
                                <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

                                {/* Current Image with "+" Mark */}
                                <div className="relative mb-4">
                                    <img
                                        src={updatedData.image || "https://via.placeholder.com/150"}
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
                                        onChange={newProfilePicSelectHandel}
                                        // onChange={(e: any) => {
                                        //     const file = e.target.files[0];
                                        //     if (file) {
                                        //         const reader = new FileReader();
                                        //         reader.onload = () => {
                                        //             setUpdatedData({ ...updatedData, image: reader.result });
                                        //         };
                                        //         reader.readAsDataURL(file);
                                        //     }
                                        // }}
                                    />
                                </div>

                                {/* Name Input */}
                                <label className="block mb-2">
                                    Name
                                    <input
                                        type="text"
                                        name="name"
                                        value={updatedData.name || ""}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    />
                                </label>

                                {/* About Me Input */}
                                <label className="block mb-2">
                                    About Me
                                    <textarea
                                        name="about"
                                        value={updatedData.about || ""}
                                        onChange={handleInputChange}
                                        className="w-full h-[60px] border border-gray-300 rounded-lg px-4 py-2"
                                    />
                                </label>

                                <label className="block mb-2">
                                    Age
                                    <input
                                        name="age"
                                        type={"number"}
                                        value={updatedData.age}
                                        onChange={handleInputChange}
                                        className="w-full h-[60px] border border-gray-300 rounded-lg px-4 py-2"
                                    />
                                </label>

                                <label className="block mb-2">
                                    Price
                                    <input
                                        name="price"
                                        type={"number"}
                                        value={updatedData.price}
                                        onChange={handleInputChange}
                                        className="w-full h-[60px] border border-gray-300 rounded-lg px-4 py-2"
                                    />
                                </label>

                                {/* Languages Input with Tags */}
                                <label className="block mb-2">
                                    Languages
                                    <div className="w-full border border-gray-300 rounded-lg px-4 py-2 flex flex-wrap items-center">
                                        {updatedData.languages.map((language: string, index: number) => (
                                            <span
                                                key={index}
                                                className="bg-blue-500 text-white rounded-full px-3 py-1 mr-2 mb-2 flex items-center"
                                            >
                            {language}
                                                <button
                                                    onClick={() =>
                                                        setUpdatedData({
                                                            ...updatedData,
                                                            languages: updatedData.languages.filter(
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
                                            onChange={(e: any) => setNewLanguage(e.target.value)}
                                            onKeyDown={(e: any) => {
                                                if (e.key === "Enter" && newLanguage.trim() !== "") {
                                                    setUpdatedData({
                                                        ...updatedData,
                                                        languages: [...updatedData.languages, newLanguage.trim()],
                                                    });
                                                    setNewLanguage(""); // Clear the input
                                                }
                                            }}
                                            onBlur={() => {
                                                if (newLanguage.trim() !== "") {
                                                    setUpdatedData({
                                                        ...updatedData,
                                                        languages: [...updatedData.languages, newLanguage.trim()],
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

                </div>
            </Layout>
        </>
    );
}
