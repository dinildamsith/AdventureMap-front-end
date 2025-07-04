// @ts-ignore
import {getRequest, postRequest} from "../../services/httpServices.js";
// @ts-ignore
import {BASE_URL, SELECTED_GUIDE_GET_URL, ORDER_BUY_URL} from "../../configAndVaribles/endPointUrls.js";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import SubLayout from "../../layout/subLayout.tsx";
import toast from "react-hot-toast";

export default function OrderBuyViewGuide() {


    const navigation = useNavigate()
    const navigate = useNavigate();
    const { orderGuide }:any = useParams()
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [totalAmount, setTotalAmount] = useState<any>(0)
    const [lastLoginUser, setLastLoginUser] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [notifyMassage, setNotifyMassage] = useState<any>(null);
    const [notifyType , setNonitfyType] = useState<any>(null)

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user") as string);
      console.log(user);
      setLastLoginUser(user);
    }, []);

    // Function to calculate the number of days between two dates
    const calculateDays = (start: string | null, end: string | null) => {
        if (!start || !end) return 0;
        const startDateObj = new Date(start);
        const endDateObj = new Date(end);
        const diffTime = endDateObj.getTime() - startDateObj.getTime();
        return diffTime > 0 ? diffTime / (1000 * 60 * 60 * 24) : 0; // Calculate days
    };

    const daysCount = calculateDays(startDate, endDate);


    useEffect(() => {

        setTotalAmount(Number(daysCount) * Number(guideDetails.guidePrice))

        console.log(startDate)
    }, [daysCount]);


    const [guideDetails, setGuideDetails] = useState<any>({})

    useEffect(() => {
        const getGuide = async () => {
            setLoading(true);
            const res = await getRequest({url: BASE_URL + SELECTED_GUIDE_GET_URL + orderGuide})

            if (res.status === "SUCCESS") {
                setLoading(false);
                setGuideDetails(res.data)
                console.log(res)
            } else {
                setLoading(false);
            }
        }

        getGuide()
    }, []);


    const [showConfirmation, setShowConfirmation] = useState(false);

    const orderConfirmHandel = async () => {
        if(lastLoginUser !== null){
            if(lastLoginUser.accType === 'BUYER'){
                if(startDate !== null && endDate !== null){
                    setLoading(true)
                    const res = await postRequest({
                        url: BASE_URL + ORDER_BUY_URL,
                        data: {
                            orderType: 'RENT_GUIDE',
                            orderPrice: String(totalAmount),
                            orderStartDuration: startDate,
                            orderEndDuration: endDate,
                            buyerEmail: localStorage.getItem("loginUserEmail"),
                            guide: orderGuide
            
                        }
                    })
            
                    if (res.status === 'SUCCESS') {
                        setShowConfirmation(true)
                        setNonitfyType(2)
                        setNotifyMassage("Your order has been successfully placed. Please wait while your order is being picked up by the Guide. Check your pending orders under the Order tab.")
                        setLoading(false)
                    } else {
                        setShowConfirmation(true)
                        setLoading(false)
                        setNonitfyType(2)
                        setNotifyMassage("Your order has been Failed. Please Try Again")
                    }
                } else {
                    toast.error("Please Select Start and End Date")
                }

            }else{
               setShowConfirmation(true)
                setNotifyMassage("You need to log in as a buyer to Account.First Login Buyer Account")
                setNonitfyType(1)
            }
        } else {
            setShowConfirmation(true)
            setNotifyMassage("You need to log in as a buyer to Account.First Login Buyer Account")
            setNonitfyType(1)
        }
    }


    const handleConfirm = () => {
        setShowConfirmation(false);

        if (notifyType === 1) {
            navigate("/sign-in");
        }

        if (notifyType === 2) {
            navigation("/buyer-profile")
        }
    };

    return (
        <SubLayout>

            {showConfirmation && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-5 rounded shadow-lg text-center">
                        <p className="mb-4">{notifyMassage}</p>
                        <button
                            onClick={handleConfirm}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

            {loading && (
                <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-[9999] bg-opacity-50 bg-gray-200">
                    <div className="w-10 h-10 border-4 border-gray-200 border-t-[#3bd7f7] rounded-full animate-spin"></div>
                </div>
            )}  
            <div className="flex flex-col md:flex-row gap-6 p-6 mt-[4rem]">
                {/* Left Side: Vehicle and Driver Details */}
                <div className="w-full md:w-1/2 bg-gray-100 p-4 rounded-md shadow h-[100%] overflow-y-scroll">
                    {/* Vehicle Details */}
                    <div className="bg-white rounded-lg p-6" style={{boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'}}>
                        <div className="flex flex-col items-center">
                            <img
                                src={guideDetails?.guideImage || 'default-image-url.jpg'}
                                className="w-32 h-32 mx-auto rounded-full border border-gray-300 object-cover"
                            />
                            <h1 className="text-xl font-bold uppercase">{guideDetails.guideName}</h1>
                            <h1 className="text-[16px] font-bold">Rs: {guideDetails.guidePrice}.00</h1>
                            <span className="text-gray-500 text-sm">Vehicle Rating:</span>
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
                        </div>
                        <hr className="my-6 border-t border-gray-300"/>
                        <div className="flex flex-col">
                            <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Details</span>
                            <ul>
                                <li className="mb-2 text-black">Age: {guideDetails.guideAge}</li>
                                <li className="mb-2 text-black">About: {guideDetails.guideAbout}</li>
                            </ul>
                        </div>
                    </div>

                </div>

                {/* Right Side: Order Details */}
                <div className="w-full md:w-1/2 bg-gray-100 p-4 rounded-md shadow h-[550px]">
                    <h2 className="text-xl font-bold mb-4">Order Details</h2>

                    {/* Order Start Date */}
                    <div className="mb-4">
                        <label className="block font-medium mb-2">Order Start Date:</label>
                        <input
                            type="date"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={startDate || ""}
                            onChange={(e) => {
                                setStartDate(e.target.value);
                                setEndDate(null); // Reset end date if start date changes
                            }}
                        />
                    </div>

                    {/* Order End Date */}
                    <div className="mb-4">
                        <label className="block font-medium mb-2">Order End Date:</label>
                        <input
                            type="date"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={endDate || ""}
                            onChange={(e) => setEndDate(e.target.value)}
                            min={startDate || ""}
                            disabled={!startDate} // Disable if start date is not selected
                        />
                    </div>

                    {/* Total Days */}
                    <h2 className="text-xl font-bold mb-4">Total</h2>
                    <div className="mb-4">
                        <label className="block font-medium mb-2">Total Days:</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={daysCount}
                            placeholder="Calculated days"
                            disabled
                        />
                    </div>


                    {/* Total Days */}
                    <div className="mb-4">
                        <label className="block font-medium mb-2">Total Amount:</label>
                        <input
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={totalAmount}
                            placeholder="Calculated days"
                            disabled
                        />
                    </div>

                    <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-900 transition" onClick={ () => orderConfirmHandel()}>
                        Confirm Order
                    </button>
                </div>
            </div>
        </SubLayout>
    );
}
