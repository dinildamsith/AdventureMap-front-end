import Layout from "../../layout";
import MainImage from '../../assets/beautiful-summer-beach-free-photo.webp'

export default function Home() {
    return (
        <>
            <Layout>
                <div>
                    {/* Overlay with Opacity */}
                    <div className="absolute top-0 w-full h-full bg-black opacity-25 z-50"></div>

                    {/* Full-Screen Image with Subtle Blur */}
                    <div className="absolute top-0 left-0 w-full h-full">
                        <img
                            src={MainImage}
                            alt="Full Screen"
                            className="w-full h-full object-cover blur-[1.88px]"
                        />
                    </div>
                </div>

            </Layout>
        </>
    )
}