import Layout from "../../../layout/mainLayout.tsx";
import sriLankaFestivals, { Festival } from "../festivels/festivel.ts"; // Assuming this is where your festivals data is

export default function FestivalsView() {
    return (
        <Layout>
            <div className="bg-gray-100 py-10 mt-28">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sriLankaFestivals.map((festival: Festival, index: number) => (
                            <div
                                key={index}
                                className="bg-white shadow-md rounded-lg overflow-hidden"
                            >
                                <img
                                    src={festival.image}
                                    alt={festival.name}
                                    className="h-56 w-full object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-2xl font-bold text-gray-800">{festival.name}</h2>
                                    <p className="text-gray-600 mt-2">{festival.description}</p>
                                    <p className="text-gray-500 mt-2"><strong>Month:</strong> {festival.month}</p>
                                    <p className="text-gray-500 mt-2"><strong>Reason:</strong> {festival.reason}</p>
                                    <p className="text-gray-500 mt-2"><strong>Date:</strong> {festival.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}