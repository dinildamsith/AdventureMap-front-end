import {ArrowRightCircleIcon} from "@heroicons/react/16/solid";
import Layout from "../../layout/mainLayout.tsx";
import {useEffect, useState} from "react";
// @ts-ignore
import {getRequest} from "../../services/httpServices.js";
// @ts-ignore
import {BASE_URL, BUYER_SELECTED_ORDERS_GET, SIGN_IN_BUYER_DETAILS_GET_URL} from "../../config&Varibles/endPointUrls.js";
import NotifyII from "../../component/orderNotify/notifyII.tsx";
import { useNavigate } from "react-router-dom";


export default function BuyerProfile() {


    const navigate = useNavigate(); // Initialize navigate function
    const [activeTab, setActiveTab] = useState("about");
    const [showPopup, setShowPopup] = useState(false); // State to toggle popup visibility
    const [loading, setLoading] = useState(true);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
        setShowPopup(false); // Close the popup after logging out
      };
    
      const handleCancel = () => {
        setShowPopup(false); // Close the popup without logging out
      };

    const [filterOrders, setFilterOrders] = useState([])
    const [buyerData, setBuyerData] = useState<any>({})

    useEffect(() => {

        const signInBuyerGet = async () => {
            setLoading(true);
            const res = await getRequest({
                url: BASE_URL + SIGN_IN_BUYER_DETAILS_GET_URL + localStorage.getItem("loginUserEmail")
            })

            if (res.status === "SUCCESS") {
                console.log(res);
                setBuyerData(res.data);
                setLoading(false);
            } else {
                setLoading(false);
            }
        }


        const buyerPendingOrdersGet = async () => {
            setLoading(true);
            const res = await getRequest({
                url : BASE_URL + BUYER_SELECTED_ORDERS_GET + localStorage.getItem("loginUserEmail") +"/"+ "PENDING"
            })

            if (res.status === "SUCCESS") {
                console.log(res);
                setFilterOrders(res.data);
                setLoading(false);
            } else {
                setLoading(false);
            }
        }

        buyerPendingOrdersGet()
        signInBuyerGet()
    }, []);


    const handelStatusThroughGet = async (status:any) => {
        setLoading(true);
        const res = await getRequest({
            url : BASE_URL + BUYER_SELECTED_ORDERS_GET + localStorage.getItem("loginUserEmail") +"/"+ status
        })

        if (res.status === "SUCCESS") {
            console.log(res);
            setLoading(false);
            setFilterOrders(res.data)
        } else {
            setLoading(false);
        }

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
                                                src={"https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"}
                                                className="w-32 h-28 mx-auto rounded-full  object-cover"
                                                alt="profile"
                                            />
                                            <h1 className="text-xl font-bold">{buyerData.accUserName}</h1>
                                            <h1 className="text-[16px] font-bold">{buyerData.accEmail}</h1>
                                        </div>
                                        <hr className="my-6 border-t border-gray-300"/>
                                        <div className="flex flex-col">
                                            <span
                                                className="text-gray-700 uppercase font-bold tracking-wider mb-2">Details</span>
                                            <ul>
                                                <li className="mb-2 text-black">Acc Type: {buyerData.accType}</li>
                                                <li className="mb-2 text-black">Acc Currency: {buyerData.currency}</li>
                                                <li className="mb-2 text-black">Last Login Date: {new Date().toLocaleDateString()}</li>
                                            </ul>
                                        </div>
                                        
                                        <button type="button"
                                            onClick={handleLogout}
                                                    className=" justify-center w-full mt-6 text-white bg-[#ff1b1b] hover:bg-[#ff1b1b]/90 focus:ring-4 focus:outline-none focus:ring-[#ff1b1b]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                                                {/* Heroicon: User Plus Icon */}
                                                <ArrowRightCircleIcon className="w-4 h-4 me-2 text-current" aria-hidden="true"/>
                                                Log out
                                            </button>
                                    </div>
                                </div>

                                {/* Main Content (Tabs and Sections) */}
                                <div className="col-span-4 sm:col-span-9">
                                    <div className="bg-white rounded-lg p-6"
                                         style={{boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'}}>
                                        {/* Navigation Tabs */}
                                        <div className="flex space-x-4 mb-6">
                                            <button
                                                onClick={() => setActiveTab("orders")}
                                                className={`text-xl font-bold ${activeTab === "orders" ? "text-blue-500" : "text-gray-700"}`}
                                            >
                                                Orders
                                            </button>
                                            <button
                                                onClick={() => setActiveTab("dashBord")}
                                                className={`text-xl font-bold ${activeTab === "dashBord" ? "text-blue-500" : "text-gray-700"}`}
                                            >
                                                Dash Bord
                                            </button>
                                        </div>


                                        {/* Reviews Section */}
                                        {activeTab === "orders" && (
                                            <>
                                                <div className="mb-6">
                                                    {/* Filter by Order Status */}
                                                    <div className="flex flex-wrap space-x-4 mb-4">
                                                        <label className="block">
                                                            <span className="text-gray-700 font-medium">Filter by Status</span>
                                                            <select
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                onChange={(e) => handelStatusThroughGet(e.target.value)}
                                                            >
                                                                <option value="ALL">All Orders</option>
                                                                <option value="PENDING" selected={true}>Pending Orders</option>
                                                                <option value="ACCEPT">Accept Orders</option>
                                                                <option value="COMPLETED">Completed Orders</option>
                                                                <option value="ONGOING">Ongoing Orders</option>
                                                            </select>
                                                        </label>
                                                        {/* Filter by Buy Time */}
                                                        <label className="block">
                                                            <span className="text-gray-700 font-medium">Buy Time</span>
                                                            <select
                                                                className="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                onChange={(e) => console.log("Selected Buy Time:", e.target.value)}
                                                            >
                                                                <option value="last-24-hours">Last 24 Hours</option>
                                                                <option value="last-7-days">Last 7 Days</option>
                                                                <option value="last-30-days">Last 30 Days</option>
                                                            </select>
                                                        </label>
                                                    </div>

                                                    {/* Filtered Orders */}
                                                    <div className="flex flex-col space-y-4">
                                                        {
                                                            filterOrders.map((order:any) => (
                                                                <>
                                                                    <NotifyII order={order}/>
                                                                </>
                                                            ))
                                                        }

                                                    </div>
                                                </div>
                                            </>
                                        )}


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

{/* Popup Window */}
{showPopup && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 dark:bg-gray-800">
            <p className="text-center text-gray-800 dark:text-gray-200 mb-6 text-lg font-semibold">
              Do you want to log out?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                No
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
