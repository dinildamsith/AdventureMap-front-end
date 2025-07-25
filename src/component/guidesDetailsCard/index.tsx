import {useNavigate} from "react-router-dom";

export default function GuidesDetailsCard(props: any) {
    // Create an array of stars for the rating
    const rating = Math.round(props.rate); // Round to the nearest whole number to avoid decimals
    const fullStars = Array(rating).fill(true);
    const emptyStars = Array(5 - rating).fill(false);


    const navigate = useNavigate()

    const navigateGuide = async (email:any) => {
        navigate("/guide-profile/"+email)
    }

    return (
        <>
            <div
                className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <button  onClick={() => navigateGuide(props.email)}>
                    <img  className="p-8 rounded-t-lg w-[650px] h-[250px] object-cover" src={props.image} alt="Guide Image"/>
                </button>
                <div className="px-5 pb-5">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {props.name}
                    </h5>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        Languages: {props.languages.join(", ")}
                    </h5>
                    <div className="flex items-center mt-2.5 mb-5">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            {/* Render the full stars */}
                            {fullStars.map((_, index) => (
                                <svg
                                    key={`full-${index}`}
                                    className="w-4 h-4 text-yellow-300"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 20"
                                >
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                                    />
                                </svg>
                            ))}

                            {/* Render the empty stars */}
                            {emptyStars.map((_, index) => (
                                <svg
                                    key={`empty-${index}`}
                                    className="w-4 h-4 text-gray-200 dark:text-gray-600"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 20"
                                >
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                                    />
                                </svg>
                            ))}
                        </div>
                        <span
                            className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
              {props.rate}
            </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">{props.price}</span>
                        <button
                            onClick={() => navigateGuide(props.email)}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            View More
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
