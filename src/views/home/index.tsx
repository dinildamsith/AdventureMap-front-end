import Layout from "../../layout/mainLayout.tsx";
import Background from "../../assets/bacgroudnImage.jpeg"
import {useEffect, useState} from "react";
import Card from "../../component/offerCard";

export default function Home() {

    const images = [
        "src/assets/1.webp",
        "src/assets/2.jpeg",
        "src/assets/9.jpeg",
        "src/assets/10.jpg",
        "src/assets/3.jpg",
        "src/assets/8.jpg",
        "src/assets/11.jpg",
        "src/assets/7.jpg.webp",
    ];


    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-slide to the next image every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2500);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <>
            <Layout>

                {/*----------Home Section---------*/}
                <div className="relative w-full h-[821px]">
                    {/* Background Image */}
                    <img
                        src={Background}
                        alt="Full Screen"
                        className="w-full h-full object-cover blur-[1.88px]"
                    />

                    {/* Overlay Text */}
                    <div className="absolute inset-0 flex flex-col justify-center items-start p-8 max-[1000px]:-top-[200px] ">
                        <h1 className="text-black text-[100px] font-bona leading-tight max-[1338px]:text-[70px] max-[1000px]:text-[50px] max-[380px]:text-[30px]">
                            NEVER STOP <br/>
                            EXPLORING THE <br/>
                            WORLD.
                        </h1>
                        <p className="text-black  w-[50%] mt-4 ml-2 max-[790px]:w-[100%]">
                            Discover breathtaking destinations, immerse yourself in new cultures,
                            and create unforgettable memories. Your next adventure awaits!
                        </p>
                    </div>

                    {/* Image Slider */}
                    <div className="absolute right-44 top-44 max-[1520px]:right-11   max-[790px]:top-[462px] max-[790px]:right-5 max-[534px]:top-[542px] max-[435px]:top-[542px]">
                        <div className="relative w-[430px] h-[550px] mb-4 transition-all duration-700 max-[1338px]:w-[350px] max-[1338px]:h-[450px] max-[1000px]:w-[300px] max-[1000px]:h-[400px]     max-[790px]:w-[500px] max-[790px]:h-[350px]  max-[534px]:w-[400px] max-[534px]:h-[250px] max-[435px]:w-[300px] max-[435px]:h-[250px]">
                            <img
                                src={images[activeIndex]}
                                alt={`Thumbnail ${activeIndex + 1}`}
                                className="w-full h-full object-cover rounded-[40px] shadow-md"
                            />
                        </div>
                    </div>
                </div>


                {/*----------About Section---------*/}
                <div className={"relative"}>

                    {/*-----------I-----------*/}
                    <div>
                        <h6 className={"text-center  text-black text-[50px]  mt-10 font-bona leading-tight"}>ABOUT
                            US</h6>
                        <h6 className={"text-center pl-20 pr-20 mt-7 "}>
                            Welcome to Adventure Map, your one-stop
                            destination for exploring the best of Sri Lanka.
                            Our platform is designed to provide travelers with everything they need to create
                            unforgettable
                            experiences, all in one place. Whether you're looking to book a guided tour, rent a vehicle,
                            discover top locations, find the best hotels, or explore exciting festivals, we have you
                            covered!
                        </h6>
                    </div>

                    {/*--------------II-------------*/}
                    <div>
                        <h6 className={"text-center  text-black text-[30px]  mt-10 font-bona leading-tight"}>Our
                            Mission</h6>
                        <h6 className={"text-center pl-20 pr-20 mt-3"}>
                            At Adventure Map, our mission is to make traveling easier, more enjoyable, and
                            stress-free for every traveler. We believe that travel should be a seamless experience,
                            and our goal is to provide all the resources you need to plan your trip with ease. We bring
                            together the best services and experiences, helping you make the most of your time in
                            Sri Lanka.
                        </h6>
                    </div>

                    {/*--------------III-------------*/}
                    <div>
                        <h6 className={"text-center  text-black text-[30px]  mt-10 font-bona leading-tight"}>What We
                            Offer</h6>
                        <div className={"flex flex-wrap justify-center mt-5 p-14"}>
                            <Card title={"Guided Tours"}
                                  desc={"Explore the rich culture, history, and beauty of Sri Lanka with our experienced " + "guides who offer personalized tours to suit your interests."}
                                  image={"src/assets/guide.jpg"}/>
                            <Card title={"Vehicle Rentals"}
                                  desc={"Whether you need a car, van, or specialized vehicle, our vehicle rental service ensures you have the freedom to explore at your own pace."}
                                  image={"src/assets/rentVehicle.avif"}/>
                            <Card title={"Locations & Attractions"}
                                  desc={"Discover the must-see sights, hidden gems, and popular attractions that make Sri Lanka a top destination for travelers."}
                                  image={"src/assets/locations.jpg"}/>
                            <Card title={"Hotels & Accommodations"}
                                  desc={"Choose from a wide range of hotels and accommodations to suit every budget, from luxurious resorts to budget-friendly options."}
                                  image={"src/assets/hotels.png"}/>
                            <Card title={"Festivals & Events"}
                                  desc={"Immerse yourself in the vibrant culture of Sri Lanka by attending local festivals, concerts, and events throughout the year."}
                                  image={"src/assets/festival.jpg"}/>
                        </div>
                    </div>

                    {/*--------------IV-------------*/}
                    <div>
                        <h6 className={"text-center  text-black text-[30px]  mt-10 font-bona leading-tight"}>Why Choose Us?</h6>
                            <div className="flex justify-center container mx-auto py-12 px-4">
                                <ul className="space-y-6 text-gray-600 text-lg">
                                    <li className="flex items-start">
                                        <span className="mr-4 text-blue-500">✔</span>
                                        <span className={"text-black"}>Comprehensive Services: From booking a guide to reserving a hotel room, we offer a complete travel solution for your needs.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-4 text-blue-500">✔</span>
                                        <span className={"text-black"}>Trusted Partners: We collaborate with reputable providers to offer the highest quality services and experiences.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-4 text-blue-500">✔</span>
                                        <span className={"text-black"}>Convenient Booking: Our easy-to-use platform allows you to book everything from one place, saving you time and effort.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-4 text-blue-500">✔</span>
                                        <span className={"text-black"}>Expert Recommendations: Our team is dedicated to helping you find the best options to make your trip memorable.</span>
                                    </li>
                                </ul>
                            </div>
                    </div>


                    {/*---------------------V----------------------*/}
                    <div>
                        <h6 className={"text-center  text-black text-[30px]  mt-10 font-bona leading-tight"}>Our Vision</h6>
                        <h6 className={"text-center pl-20 pr-20 mt-5"}>
                            We aim to be the leading travel platform for those looking to explore
                            Sri Lanka and beyond. Through innovative technology, exceptional
                            customer service, and partnerships with local businesses, we strive to make
                            travel easier, more accessible, and more enjoyable for all.

                            Thank you for choosing Adventure Map as your trusted travel companion.
                            We look forward to helping you plan the trip of a lifetime!
                        </h6>
                    </div>


                </div>

            </Layout>
        </>
    )
}