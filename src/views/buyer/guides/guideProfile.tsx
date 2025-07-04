import Layout from "../../../layout/mainLayout.tsx";
import { useEffect, useState } from "react";
// @ts-ignore
import { getRequest } from "../../../services/httpServices.js";
// @ts-ignore
import {
  BASE_URL,
  SELECTED_GUIDE_GET_URL,
} from "../../../configAndVaribles/endPointUrls.js";
import { useNavigate, useParams } from "react-router-dom";

export default function GuideProfile() {
  // State to track the selected tab
  const navigation = useNavigate();
  const [activeTab, setActiveTab] = useState("about");
  const [guideDetails, setGuideDetails] = useState<any>({});
  const { guideEmail } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGuide = async () => {
      setLoading(true);
      const res = await getRequest({
        url: BASE_URL + SELECTED_GUIDE_GET_URL + guideEmail,
      });

      if (res.status === "SUCCESS") {
        console.log(res);
        setGuideDetails(res.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    getGuide();
  }, []);

  const handelHireButton = async (email: any) => {
    navigation("/order-guide/" + email);
  };

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
                  <div
                    className="bg-white rounded-lg p-6"
                    style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
                  >
                    <div className="flex flex-col items-center">
                      <img
                        src={guideDetails.guideImage}
                        className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                        alt="profile"
                      />
                      <h1 className="text-xl font-bold">
                        {guideDetails.guideName}
                      </h1>
                      <h1 className="text-xl font-bold">
                        Rs.{guideDetails.guidePrice}.00
                      </h1>
                      <button
                        type="button"
                        onClick={() => handelHireButton(guideDetails.accEmail)}
                        className=" justify-center w-full mt-6 text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
                      >
                        {/* Heroicon: User Plus Icon */}
                        <svg
                          className="w-4 h-4 me-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16 9a4 4 0 1 0-8 0 4 4 0 0 0 8 0ZM7 4a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm8 6a6 6 0 1 0-12 0 6 6 0 0 0 12 0ZM14 13h-2v-2a1 1 0 1 0-2 0v2H8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2v2a1 1 0 0 0 2 0v-2h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        Hire
                      </button>
                    </div>
                    <hr className="my-6 border-t border-gray-300" />
                    <div className="flex flex-col">
                      <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                        Details
                      </span>
                      <ul>
                        <li className="mb-2 text-black">
                          Guide Age: {guideDetails.guideAge}
                        </li>
                        <li className="mb-2 text-black">
                          Languages:{" "}
                          {guideDetails.languages && guideDetails.languages[0]
                            ? guideDetails.languages[0].split("#").join(", ")
                            : "Not available"}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Main Content (Tabs and Sections) */}
                <div className="col-span-4 sm:col-span-9">
                  <div
                    className="bg-white rounded-lg p-6"
                    style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
                  >
                    {/* Navigation Tabs */}
                    <div className="flex space-x-4 mb-6">
                      <button
                        onClick={() => setActiveTab("about")}
                        className={`text-xl font-bold ${
                          activeTab === "about"
                            ? "text-blue-500"
                            : "text-gray-700"
                        }`}
                      >
                        About Me
                      </button>
                      <button
                        onClick={() => setActiveTab("reviews")}
                        className={`text-xl font-bold ${
                          activeTab === "reviews"
                            ? "text-blue-500"
                            : "text-gray-700"
                        }`}
                      >
                        Reviews
                      </button>
                      <button
                        onClick={() => setActiveTab("gallery")}
                        className={`text-xl font-bold ${
                          activeTab === "gallery"
                            ? "text-blue-500"
                            : "text-gray-700"
                        }`}
                      >
                        Gallery
                      </button>
                    </div>

                    {/* About Me Section */}
                    {activeTab === "about" && (
                      <>
                        <p className="text-gray-700">
                          {guideDetails.guideAbout}
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
                              <h3 className="text-lg font-semibold">
                                Alice Johnson
                              </h3>
                              <p className="text-gray-700">
                                "It was an amazing experience! Highly
                                recommended."
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md">
                            <img
                              src="https://randomuser.me/api/portraits/men/92.jpg"
                              alt="reviewer"
                              className="w-12 h-12 rounded-full mr-4"
                            />
                            <div>
                              <h3 className="text-lg font-semibold">
                                Bob Smith
                              </h3>
                              <p className="text-gray-700">
                                "Very professional and knowledgeable. Would
                                definitely book again."
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Gallery Section */}
                    {activeTab === "gallery" && (
                      <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                          {guideDetails.imageGallery.map((image: any) => (
                            <>
                              <img
                                src={image}
                                alt="gallery image"
                                className="w-full h-48 object-cover rounded-lg"
                              />
                            </>
                          ))}
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
