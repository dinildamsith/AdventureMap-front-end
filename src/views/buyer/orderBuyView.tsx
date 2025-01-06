import {useEffect, useState} from "react";
import SubLayout from "../../layout/subLayout.tsx";
// @ts-ignore
import {getRequest, postRequest} from "../../services/httpServices.js";
// @ts-ignore
import {BASE_URL, GET_SELECTED_VEHICLE, VEHICLE_ORDER_BUY_URL} from "../../config&Varibles/endPointUrls.js";
import {useNavigate, useParams} from "react-router-dom";

export default function OrderBuyView() {


    const navigation = useNavigate()
    const {orderVehicle} = useParams()
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [totalAmount, setTotalAmount] = useState<any>(0)

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

        setTotalAmount(Number(daysCount) * Number(vehicleDetails.rentAmount))

        console.log(startDate)
    }, [daysCount]);


    const [vehicleDetails, setVehicleDetails] = useState<any>({})

    useEffect(() => {
        const getVehicle = async () => {
            const res = await getRequest({url: BASE_URL + GET_SELECTED_VEHICLE + orderVehicle})
            setVehicleDetails(res.data)
            console.log(res)
        }

        getVehicle()
    }, []);


    const orderConfirmHandel = async () => {
        console.log(localStorage.getItem("loginUserEmail"))
        const res = await postRequest({
            url: BASE_URL + VEHICLE_ORDER_BUY_URL,
            data: {
                orderType: 'RENT_VEHICLE',
                orderPrice: String(totalAmount),
                orderStartDuration: startDate,
                orderEndDuration: endDate,
                buyerEmail: localStorage.getItem("loginUserEmail"),
                vehicle: orderVehicle

            }
        })

        if (res.status === 'SUCCESS') {
            navigation("/buyer-profile")
        }
    }


    return (
        <SubLayout>
            <div className="flex flex-col md:flex-row gap-6 p-6 mt-[4rem]">
                {/* Left Side: Vehicle and Driver Details */}
                <div className="w-full md:w-1/2 bg-gray-100 p-4 rounded-md shadow h-[100%] overflow-y-scroll">
                    {/* Vehicle Details */}
                    <div className="bg-white rounded-lg p-6" style={{boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'}}>
                        <div className="flex flex-col items-center">
                            <img
                                src={vehicleDetails?.vehicleImage?.[0] || 'default-image-url.jpg'}
                                className="w-32 h-32 mx-auto rounded-full border border-gray-300 object-cover"
                            />
                            <h1 className="text-xl font-bold uppercase">{vehicleDetails.vehicleBrand}</h1>
                            <h1 className="text-[16px] font-bold">[{vehicleDetails.rentType}]</h1>
                            <h1 className="text-[16px] font-bold">Rs: {vehicleDetails.rentAmount}.00</h1>
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
                                <li className="mb-2 text-black">Vehicle Number: {vehicleDetails.vehicleNumber}</li>
                                <li className="mb-2 text-black">Vehicle Type: {vehicleDetails.vehicleType}</li>
                                <li className="mb-2 text-black">Sheet Count: {vehicleDetails.sheetCount}</li>
                            </ul>
                        </div>
                    </div>

                    {vehicleDetails.driverCode ? (
                        <div className="bg-white rounded-lg p-6 mt-10"
                             style={{boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'}}>
                            <div className="flex flex-col items-center">
                                <h1 className="text-xl font-bold">Driver Details</h1>
                                <img
                                    src={vehicleDetails?.driverImage || 'default-image-url.jpg'}
                                    className="w-32 h-32 mx-auto rounded-full border border-gray-300 object-cover mt-10"
                                />
                                <h1 className="text-xl font-bold">{vehicleDetails?.driverName || "n/a"}</h1>
                                <h1 className="text-xl font-bold">{vehicleDetails?.driverExperience || "n/a"}</h1>
                                <h1 className="text-xl font-bold">[{vehicleDetails?.driverLanguages || "n/a"}]</h1>
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
                        </div>
                    ) : (
                        <h1>No Driver</h1>
                    )}
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
