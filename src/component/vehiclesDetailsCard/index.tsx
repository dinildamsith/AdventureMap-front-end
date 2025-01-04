import {useState} from "react";

export default function VehicleDetailsCard(props: any) {
    // State for keeping track of the currently displayed image
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Images array from props (make sure to pass an array of image URLs in props)
    const images = props.images; // Expecting an array of image URLs

    const rating = Math.round(props.rate); // Round to the nearest whole number to avoid decimals
    const fullStars = Array(rating).fill(true);
    const emptyStars = Array(5 - rating).fill(false);

    // Function to go to the previous image
    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    // Function to go to the next image
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="relative">
                {/* Display the current image */}
                <a href="vehicle-profile">
                    <img
                        className="p-8 rounded-t-lg w-[650px] h-[250px] object-cover"
                        src={images[currentImageIndex]}
                        alt="vehicle image"
                    />
                </a>


                {/* Left and Right Arrow Buttons */}
                <button
                    onClick={prevImage}
                    className="absolute top-1/2 left-1 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
                >
                    &#60;
                </button>
                <button
                    onClick={nextImage}
                    className="absolute top-1/2 right-1 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
                >
                    &#62;
                </button>
            </div>

            <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white uppercase">
                    {props.name}
                </h5>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white uppercase">
                    {props.vehicleNumber}
                </h5>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    Specifications: {props.spec.join(", ")}
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
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">Rs:{props.price}.00</span>
                    <a
                        href="vehicle-profile"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        View More
                    </a>
                </div>
            </div>
        </div>
    );
}
