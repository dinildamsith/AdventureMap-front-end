export interface Place {
    name: string;
    image: string;
    description: string;
    location: {
        lat: number;
        lng: number;
    };
}

const popularPlaces: Place[] = [
    {
        name: "Sigiriya",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Sigiriya_%28141688197%29.jpeg",
        description:
            "Sigiriya, also known as the Lion Rock, is a UNESCO World Heritage site. It is a massive rock fortress with ancient frescoes and stunning views from the top.",
        location: { lat: 7.9579, lng: 80.7603 },
    },
    {
        name: "Ella",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/47/Ella_railway_station.jpg",
        description:
            "Ella is a charming hill town surrounded by lush greenery and tea plantations. Popular attractions include the Nine Arches Bridge and Ella Rock.",
        location: { lat: 6.8667, lng: 81.0461 },
    },
    {
        name: "Temple of the Sacred Tooth Relic",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/eb/SL_Kandy_asv2020-01_img33_Sacred_Tooth_Temple.jpg",
        description:
            "Located in Kandy, this sacred Buddhist temple houses the relic of the tooth of Buddha. It is a major pilgrimage site.",
        location: { lat: 7.2938, lng: 80.6385 },
    },
    {
        name: "Galle Fort",
        image: "https://ceylontoday.lk/wp-content/uploads/2023/11/11-19.jpg",
        description:
            "Galle Fort, a UNESCO World Heritage site, is a colonial-era fort that offers a mix of European architecture and stunning coastal views.",
        location: { lat: 6.0328, lng: 80.2167 },
    },
    {
        name: "Nuwara Eliya",
        image: "https://www.travelmapsrilanka.com/destinations/destinationimages/historical-background-in-nuwara-eliya.jpg",
        description:
            "Nuwara Eliya, also known as 'Little England,' is a hill station famous for tea plantations, cool climate, and colonial architecture.",
        location: { lat: 6.9708, lng: 80.7829 },
    },
    {
        name: "Yala National Park",
        image: "https://lk.lakpura.com/cdn/shop/products/LK710A2062-02-E.jpg?v=1679654714&width=600",
        description:
            "Yala National Park is a wildlife sanctuary home to leopards, elephants, and a wide variety of birds. A must-visit for nature lovers.",
        location: { lat: 6.3612, lng: 81.5102 },
    },
    {
        name: "Adams Peak (Sri Pada)",
        image: "https://d3t1etsbz33tc1.cloudfront.net/wp-content/uploads/2023/04/Sri-Pada-Adams-Peak-A-Guide-to-Sri-Lanka-Sacred-Mountain.jpg",
        description:
            "Adam's Peak is a sacred mountain with religious significance for Buddhists, Hindus, Christians, and Muslims, offering breathtaking sunrise views.",
        location: { lat: 6.8096, lng: 80.4990 },
    },
    {
        name: "Mirissa Beach",
        image: "https://travelaway.nl/wp-content/uploads/2023/03/Algemeen-1-1024x577.jpg",
        description:
            "Mirissa Beach is a tropical paradise known for its stunning sunsets, whale watching tours, and relaxing atmosphere.",
        location: { lat: 5.9496, lng: 80.4543 },
    },
    {
        name: "Jaffna Fort",
        image: "https://mahaweli.lk/wp-content/uploads/2023/10/Jaffna-Fort-Sri-Lanka-1140x530.jpg",
        description:
            "Jaffna Fort is an iconic historical site in northern Sri Lanka that reflects the island’s colonial history.",
        location: { lat: 9.6629, lng: 80.0255 },
    },
    {
        name: "Horton Plains National Park",
        image: "https://s1.wklcdn.com/image_60/1828648/16251979/10184572Master.jpg",
        description:
            "Horton Plains National Park is a protected area in the central highlands of Sri Lanka, known for its panoramic landscapes and 'World’s End' viewpoint.",
        location: { lat: 6.8018, lng: 80.8484 },
    },
    {
        name: "Polonnaruwa Ancient City",
        image: "https://www.lankatourexperts.com/wp-content/uploads/2018/12/Polonnaruwa-Ancient-City-Sri-Lanka-Economy-Tours.png.webp",
        description:
            "Polonnaruwa, a UNESCO World Heritage site, is an ancient city featuring well-preserved ruins of palaces, temples, and Buddha statues.",
        location: { lat: 7.9408, lng: 81.0185 },
    },
    {
        name: "Anuradhapura",
        image: "https://media.tacdn.com/media/attractions-content--1x-1/13/34/e5/34.jpg",
        description:
            "Anuradhapura is an ancient city known for its well-preserved ruins of ancient Sri Lankan civilization, including stupas and temples.",
        location: { lat: 8.3110, lng: 80.4037 },
    },
    {
        name: "Dambulla Cave Temple",
        image: "https://cfimages.mercuryholidays.co.uk/3vgdkcmqrnp2/77AF3EGPZfAcf7yGWwN47j/6efa5f03171cd4acbd3d51fefd09871b/43440887_l.jpg?w=960&fm=jpg&fl=progressive&q=80",
        description:
            "The Dambulla Cave Temple is a complex of caves filled with Buddhist statues and frescoes, perched atop a rock.",
        location: { lat: 7.8574, lng: 80.6422 },
    },
    {
        name: "Trincomalee",
        image: "https://www.arabiers.lk/resources/guides/images/trincomalee/koneshwaram-1.png",
        description:
            "Trincomalee is a coastal town known for its beautiful beaches, ancient temples, and a natural deep-water harbor.",
        location: { lat: 8.5656, lng: 81.2330 },
    },
    {
        name: "Bentota",
        image: "https://www.travellankaconnection.com/images/destinations/gallery_Bentota-Sri-Lanka.jpg",
        description:
            "Bentota is a popular beach destination known for its water sports, luxury resorts, and golden beaches.",
        location: { lat: 6.4167, lng: 79.9833 },
    },
    {
        name: "Negombo",
        image: "https://content.r9cdn.net/rimg/dimg/16/71/1bacba85-city-46478-169110981a8.jpg?width=2160&height=1215&xhint=1958&yhint=842&crop=true&outputtype=webp",
        description:
            "Negombo is a beach town near Colombo, famous for its fishing industry, seafood, and relaxed coastal vibe.",
        location: { lat: 7.2077, lng: 79.9786 },
    },
    {
        name: "Weligama",
        image: "https://thesurferweligama.com/wp-content/uploads/2023/07/surfing-in-weligama-1536x1024.jpg",
        description:
            "Weligama is a small coastal town famous for its long sandy beaches and being a hotspot for surfing.",
        location: { lat: 5.9672, lng: 80.3958 },
    },
    {
        name: "Kandy Lake",
        image: "https://www.trawell.in/admin/images/upload/472864282Kandy_Lake.jpg",
        description:
            "Kandy Lake, also known as Kiri Muhuda, is a scenic man-made lake located in the heart of Kandy city.",
        location: { lat: 7.2944, lng: 80.6367 },
    },
    {
        name: "Pinnawala Elephant Orphanage",
        image: "https://cdn.getyourguide.com/img/tour/3da49af2e758a626dd3dad1b7bf153c6f22d85558c2032bdf37760ccdd28a412.jpg/98.jpg",
        description:
            "Pinnawala Elephant Orphanage is a sanctuary for orphaned elephants, where visitors can watch the elephants being bathed in the river.",
        location: { lat: 7.2992, lng: 80.4057 },
    },
    {
        name: "Arugam Bay",
        image: "https://www.thecoastalcampaign.com/wp-content/uploads/2019/06/P3290197-1080x675.jpg",
        description:
            "Arugam Bay is a popular surfing destination with golden beaches, crystal-clear water, and a relaxed atmosphere.",
        location: { lat: 6.8514, lng: 81.8271 },
    },
    {
        name: "Kalu Diya Pokuna",
        image: "https://www.srilankanexpeditions.com/images/sri-lanka-travel-guide/history-archaeology-sri-lanka/ancient-temple/kaludiya-pokuna-forest/kaludiya-pokuna-forest-02.jpg",
        description:
            "Kalu Diya Pokuna is a historical site known for its ancient stone pond and impressive surroundings.",
        location: { lat: 7.7073, lng: 81.0599 },
    },
];

export default popularPlaces;
