export interface Festival {
    name: string;
    image: string;
    description: string;
    month: string;
    reason: string;
    date: string; // Add date field
    year: number; // Automatically set the current year
}

const currentYear = new Date().getFullYear(); // Get current year

const sriLankaFestivals: Festival[] = [
    {
        name: "Thai Pongal",
        image: "https://st1.latestly.com/wp-content/uploads/2022/01/Happy-Thai-Pongal-1-380x214.jpg",
        description: "A harvest festival celebrated by the Tamil community, thanking the Sun God and nature for the bountiful harvest.",
        month: "January",
        reason: "To celebrate the harvest and show gratitude to nature and the Sun God.",
        date: `${currentYear}-01-14`, // Example fixed date, adjust as necessary
        year: currentYear
    },
    {
        name: "Duruthu Poya",
        image: "https://media.timeout.com/images/103006266/1024/768/image.webp",
        description: "Marks the Buddha's first visit to Sri Lanka and is celebrated with religious activities.",
        month: "January",
        reason: "To commemorate Buddha’s first visit to Sri Lanka and spread his teachings.",
        date: `${currentYear}-01-06`, // Example fixed date
        year: currentYear
    },
    {
        name: "Independence Day",
        image: "https://lankaleader.lk/images/independance_day.png",
        description: "Commemorates Sri Lanka's independence from British colonial rule with national ceremonies and parades.",
        month: "February",
        reason: "To honor Sri Lanka's independence from British rule on February 4th, 1948.",
        date: `${currentYear}-02-04`, // Example fixed date
        year: currentYear
    },
    {
        name: "Sinhala and Tamil New Year",
        image: "https://images.rove.me/w_1920,q_85/cezyvrtnm8yjkcdz4b6r/sri-lanka-avurudu-table.jpg",
        description: "A major celebration marking the New Year for the Sinhala and Tamil communities with traditional foods, games, and rituals.",
        month: "April",
        reason: "To celebrate the traditional New Year of the Sinhala and Tamil people.",
        date: `${currentYear}-04-13`, // Example fixed date
        year: currentYear
    },
    {
        name: "Vesak Poya",
        image: "https://www.lanka-excursions-holidays.com/uploads/4/0/2/1/40216937/4036659_orig.jpg",
        description: "Commemorates the birth, enlightenment, and death of the Buddha, with lantern displays and religious observances.",
        month: "May",
        reason: "To celebrate Buddha's birth, enlightenment, and death, considered the most important Buddhist festival.",
        date: `${currentYear}-05-05`, // Example fixed date, based on full moon
        year: currentYear
    },
    {
        name: "Deepavali",
        image: "https://dtnext-prod.s3.ap-south-1.amazonaws.com/h-upload/2023/11/12/750x450_778890-nation.webp",
        description: "The Festival of Lights celebrated by Hindus, symbolizing the triumph of light over darkness.",
        month: "October/November",
        reason: "To celebrate the victory of light over darkness and good over evil.",
        date: `${currentYear}-10-24`, // Example fixed date
        year: currentYear
    },
    {
        name: "Christmas",
        image: "https://emall.ca/wp-content/uploads/2024/01/christmas.ca_-2048x1365.jpeg.webp",
        description: "Celebrated by Christians with church services, feasts, and the exchange of gifts.",
        month: "December",
        reason: "To celebrate the birth of Jesus Christ.",
        date: `${currentYear}-12-25`, // Example fixed date
        year: currentYear
    }
];

export default sriLankaFestivals;
