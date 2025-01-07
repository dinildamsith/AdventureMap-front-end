import {PencilIcon} from "@heroicons/react/16/solid";
import Layout from "../../layout/mainLayout.tsx";
import {useEffect, useState} from "react";
// @ts-ignore
import {getRequest} from "../../services/httpServices.js";
// @ts-ignore
import {BASE_URL, BUYER_SELECTED_ORDERS_GET, SIGN_IN_BUYER_DETAILS_GET_URL} from "../../config&Varibles/endPointUrls.js";
import NotifyII from "../../component/orderNotify/notifyII.tsx";



export default function BuyerProfile() {


    const [activeTab, setActiveTab] = useState("about");
    const [isEditModalOpen, setIsEditModalOpen] = useState<any>(false);

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const [filterOrders, setFilterOrders] = useState([])
    const [buyerData, setBuyerData] = useState<any>({})

    useEffect(() => {

        const signInBuyerGet = async () => {
            const res = await getRequest({
                url: BASE_URL + SIGN_IN_BUYER_DETAILS_GET_URL + localStorage.getItem("loginUserEmail")
            })
            setBuyerData(res.data)
            console.log(res)
        }


        const buyerPendingOrdersGet = async () => {
            const res = await getRequest({
                url : BASE_URL + BUYER_SELECTED_ORDERS_GET + localStorage.getItem("loginUserEmail") +"/"+ "PENDING"
            })
            setFilterOrders(res.data)
        }

        buyerPendingOrdersGet()
        signInBuyerGet()
    }, []);


    const handelStatusThroughGet = async (status:any) => {
        const res = await getRequest({
            url : BASE_URL + BUYER_SELECTED_ORDERS_GET + localStorage.getItem("loginUserEmail") +"/"+ status
        })
        setFilterOrders(res.data)
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
                                                src={"https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"}
                                                className="w-32 h-28 mx-auto rounded-full  object-cover"
                                                alt="profile"
                                            />
                                            <h1 className="text-xl font-bold">{buyerData.accUserName}</h1>
                                            <h1 className="text-[16px] font-bold">{buyerData.accEmail}</h1>

                                            <button type="button"
                                                    className=" justify-center w-full mt-6 text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                                                {/* Heroicon: User Plus Icon */}
                                                <PencilIcon className="w-4 h-4 me-2 text-current" aria-hidden="true"/>
                                                Edit
                                            </button>
                                        </div>
                                        <hr className="my-6 border-t border-gray-300"/>
                                        <div className="flex flex-col">
                                            <span
                                                className="text-gray-700 uppercase font-bold tracking-wider mb-2">Details</span>
                                            <ul>
                                                <li className="mb-2 text-black">Acc Type: {buyerData.accType}</li>
                                                <li className="mb-2 text-black">Acc Currency: {buyerData.currency}</li>
                                                <li className="mb-2 text-black">Last Login Date: {""}</li>
                                                <li className="mb-2 text-black">Last Login Time: {""}</li>
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

                    {/*--------------------------- vehicle Edit Modal */}
                    {isEditModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white rounded-lg p-6 w-96 mt-[5rem]"
                                 style={{height: '600px', width: '700px', overflowY: 'auto'}}>
                                <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

                                {/* Current Image with "+" Mark */}
                                <div className="relative mb-4">
                                    <img
                                        src={"https://via.placeholder.com/150"}
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
                                    />
                                </div>

                                {/* Brand */}
                                <label className="block mb-2">
                                    <label htmlFor="vehicleBrand" className="block text-sm font-semibold text-gray-700">
                                        Vehicle Brand
                                    </label>
                                    <select
                                        id="vehicleBrand"
                                        name="vehicleBrand"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="toyota">Toyota</option>
                                        <option value="alto">Alto</option>
                                        <option value="benz">Benz</option>
                                    </select>
                                </label>

                                {/* Name Input */}
                                <label className="block mb-2">
                                    Vehicle Number
                                    <input
                                        type="text"
                                        name="vehicleNumber"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    />
                                </label>

                                {/* type*/}
                                <label className="block mb-2">
                                    <label htmlFor="vehicleType" className="block text-sm font-semibold text-gray-700">
                                        Vehicle Type
                                    </label>
                                    <select
                                        name="vehicleType"

                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="ac">AC</option>
                                        <option value="non-ac">Non-AC</option>
                                    </select>
                                </label>


                                {/* sheet */}
                                <label className="block mb-2">
                                    Sheet Count
                                    <input
                                        type="text"
                                        name="sheetCount"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    />
                                </label>

                                {/* rent amount */}
                                <label className="block mb-2">
                                    Rent Amount
                                    <input
                                        type="text"
                                        name="rentAmount"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    />
                                </label>



                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={closeEditModal}
                                        className="text-gray-600 border border-gray-300 px-4 py-2 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                    <button
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
