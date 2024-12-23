import Layout from "../../layout";
import { useState } from "react";

export default function GuideProfile() {
    // State to track the selected tab
    const [activeTab, setActiveTab] = useState("about");

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
                                                src="https://randomuser.me/api/portraits/men/94.jpg"
                                                className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                                                alt="profile"
                                            />
                                            <h1 className="text-xl font-bold">John Doe</h1>

                                            <button type="button"
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
                                                className="text-gray-700 uppercase font-bold tracking-wider mb-2">Languages</span>
                                            <ul>
                                                <li className="mb-2 text-black">JavaScript</li>
                                                <li className="mb-2 text-black">English</li>
                                                <li className="mb-2 text-black">Spanish</li>
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
                                                <h2 className="text-xl font-bold mb-4">About Me</h2>
                                                <p className="text-gray-700">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae tortor ullamcorper, ut vestibulum velit convallis.
                                                </p>
                                            </>
                                        )}

                                        {/* Reviews Section */}
                                        {activeTab === "reviews" && (
                                            <>
                                                <h2 className="text-xl font-bold mt-6 mb-4">Reviews</h2>
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
                                                <h2 className="text-xl font-bold mt-6 mb-4">Gallery</h2>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                                    <img
                                                        src="https://via.placeholder.com/150"
                                                        alt="gallery image"
                                                        className="w-full h-48 object-cover rounded-lg"
                                                    />
                                                    <img
                                                        src="https://via.placeholder.com/150"
                                                        alt="gallery image"
                                                        className="w-full h-48 object-cover rounded-lg"
                                                    />
                                                    <img
                                                        src="https://via.placeholder.com/150"
                                                        alt="gallery image"
                                                        className="w-full h-48 object-cover rounded-lg"
                                                    />
                                                    <img
                                                        src="https://via.placeholder.com/150"
                                                        alt="gallery image"
                                                        className="w-full h-48 object-cover rounded-lg"
                                                    />
                                                </div>
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
