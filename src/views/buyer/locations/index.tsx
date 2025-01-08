import popularPlaces, { Place } from "./places";
import Layout from "../../../layout/mainLayout.tsx";

export default function Locations() {
    return(
        <>
            <Layout>
                <div className="bg-gray-100 py-10 mt-28">
                    <div className="container mx-auto px-4">
                        {/*<h1 className="text-4xl font-bold text-center mb-8">Popular Places in Sri Lanka</h1>*/}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {popularPlaces.map((place: Place, index: number) => (
                                <div
                                    key={index}
                                    className="bg-white shadow-md rounded-lg overflow-hidden"
                                >
                                    <img
                                        src={place.image}
                                        alt={place.name}
                                        className="h-56 w-full object-cover"
                                    />
                                    <div className="p-4">
                                        <h2 className="text-2xl font-bold text-gray-800">{place.name}</h2>
                                        <p className="text-gray-600 mt-2">{place.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}