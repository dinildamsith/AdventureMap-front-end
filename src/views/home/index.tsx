import Layout from "../../layout";
// import MainImage from '../../assets/beautiful-summer-beach-free-photo.webp'
// import BackgroundImage from '../../assets/bacground.avif'
import Background from "../../assets/bacgroudnImage.jpeg"
import {useEffect, useState} from "react";

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
                    <div className="absolute inset-0 flex flex-col justify-center items-start p-8">
                        <h1 className="text-black text-[100px] font-bona leading-tight">
                            NEVER STOP <br/>
                            EXPLORING THE <br/>
                            WORLD.
                        </h1>
                        <p className="text-black w-[50%] mt-4 ml-2">
                            Discover breathtaking destinations, immerse yourself in new cultures,
                            and create unforgettable memories. Your next adventure awaits!
                        </p>
                    </div>

                    {/* Image Slider */}
                    <div className="absolute right-44 top-44">
                        <div className="relative w-[430px] h-[550px] mb-4 transition-all duration-700">
                            <img
                                src={images[activeIndex]}
                                alt={`Thumbnail ${activeIndex + 1}`}
                                className="w-full h-full object-cover rounded-[40px] shadow-md"
                            />
                        </div>
                    </div>
                </div>


                {/*----------About Section---------*/}
                <div className={"relative w-40 h-20 bg-black"}>

                </div>
            </Layout>
        </>
    )
}