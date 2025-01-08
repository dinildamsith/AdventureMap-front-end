import Layout from "../../../layout/mainLayout.tsx";
import VehicleDetailsCard from "../../../component/vehiclesDetailsCard";
import {useEffect, useState} from "react";
import NoData  from '../../../assets/noData.png'
// @ts-ignore
import {getRequest} from "../../../services/httpServices.js";
// @ts-ignore
import {ALL_AVAILABLE_VEHICLES_GET_URL, BASE_URL} from "../../../config&Varibles/endPointUrls.js";

export default function Vehicles(){

    const [allAvailableVehicles, setAllAvailableVehicles] = useState([])

    useEffect(() => {

        const getAllAvailableVehicles = async () => {
            const res = await getRequest({url: BASE_URL + ALL_AVAILABLE_VEHICLES_GET_URL})
            console.log(res)

            setAllAvailableVehicles(res.data)
        }

        getAllAvailableVehicles()
    }, []);

    return (
        <>
            <Layout>
                <div className={"mt-36"}>

                    {/*--------------------serch bar---------------*/}

                    <form className="flex items-center max-w-lg mx-auto">
                        <label htmlFor="voice-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"/>
                                </svg>
                            </div>
                            <input type="text" id="voice-search"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Search..." required/>
                        </div>
                        <button type="submit"
                                className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                            Search
                        </button>
                    </form>


                    {/*-------------------vehicles-----------------*/}
                    <div className="flex flex-wrap justify-center mt-20 gap-10">  {/* Added gap-4 for spacing */}
                        {allAvailableVehicles && allAvailableVehicles.length > 0 ? (
                            allAvailableVehicles.map((vehicle: any) => (
                                <VehicleDetailsCard
                                    key={vehicle._id} // Unique key for each vehicle
                                    email={vehicle.accEmail}
                                    name={vehicle.vehicleBrand || "Unknown Brand"} // Fallback for vehicle brand
                                    vehicleNumber={vehicle.vehicleNumber || "N/A"} // Fallback for vehicle number
                                    rate={vehicle.rate || "4.99"} // Fallback for rate
                                    price={`RS.${vehicle.rentAmount || "0"}`} // Fallback for rent amount
                                    spec={[vehicle.vehicleType || "Unknown Type"]} // Fallback for vehicle type
                                    images={
                                        vehicle.vehicleImage ||
                                        "https://via.placeholder.com/300x200?text=No+Image+Available"
                                    } // Fallback for image
                                />
                            ))
                        ) : (
                            <div className="no-data flex flex-col items-center justify-center mt-10">
                                <img
                                    src={NoData}
                                    alt="No Data"
                                    className="no-data-image w-64 mb-4"
                                />
                                <p className="no-data-message text-center text-lg text-gray-600">
                                    No vehicles available at the moment.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </Layout>
        </>
    )
}