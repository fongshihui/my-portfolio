import liveDispatches from "./liveTravelDispatches.json";

export const liveTravelDispatches = liveDispatches;

export const exchangeOverview = {
    university: "European Exchange Programme",
    location: "Europe",
    period: "Fall / Spring Semester",
    tagline: "Exploring European tech scenes, historic cities, alpine trails, and intercultural perspectives.",
    stats: [
        { label: "Countries Visited", value: "12+", icon: "🌍" },
        { label: "Cities Explored", value: "25+", icon: "📍" },
        { label: "Academic Modules", value: "5", icon: "📚" },
        { label: "Espressos & Gelatos", value: "100+", icon: "☕" },
    ],
};

export const exchangeCategories = [
    { id: "all", label: "All Destinations" },
    { id: "nature", label: "Alps & Nature" },
    { id: "culture", label: "Historic & Culture" },
    { id: "city", label: "City Getaways" },
];

export const travelDestinations = [
    {
        id: "zurich-swiss",
        city: "Zürich & Interlaken",
        country: "Switzerland",
        flag: "🇨🇭",
        category: "nature",
        season: "Autumn / Winter",
        image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
        summary: "Breathtaking train rides through snow-capped alpine peaks, scenic hikes around Lake Brienz, and Swiss chocolate tastings.",
        highlights: [
            "Jungfraujoch - Top of Europe glacier viewpoint",
            "Panoramic train ride on the GoldenPass line",
            "Old town strolls along Limmat River in Zürich",
        ],
        favoriteSpot: "Lauterbrunnen valley waterfalls & Grindelwald First",
        tag: "Mountain Peaks & Scenic Trains",
    },
    {
        id: "paris-france",
        city: "Paris",
        country: "France",
        flag: "🇫🇷",
        category: "culture",
        season: "Spring",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
        summary: "World-class art galleries, evening walks along the Seine, fresh croissants every morning, and iconic architectural marvels.",
        highlights: [
            "Musée d'Orsay impressionist collections",
            "Golden sunset over the Eiffel Tower from Pont de Bir-Hakeim",
            "Exploring the cobblestone streets of Montmartre",
        ],
        favoriteSpot: "Le Marais bakeries & Luxembourg Gardens",
        tag: "Art & Gastronomy",
    },
    {
        id: "amsterdam-netherlands",
        city: "Amsterdam",
        country: "Netherlands",
        flag: "🇳🇱",
        category: "city",
        season: "Spring",
        image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=800&q=80",
        summary: "Cycling along historic canal rings, world-class museum visits, vibrant tech hubs, and canal-side coffee shops.",
        highlights: [
            "Biking through Jordaan and Vondelpark",
            "Rijksmuseum & Van Gogh Museum collections",
            "Canal cruise during evening twilight",
        ],
        favoriteSpot: "Keukenhof Tulip Gardens & Nine Streets",
        tag: "Canal Walks & Cycling",
    },
    {
        id: "rome-florence-italy",
        city: "Rome & Florence",
        country: "Italy",
        flag: "🇮🇹",
        category: "culture",
        season: "Summer / Autumn",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
        summary: "Immersing in ancient history, renaissance masterpieces, authentic handmade pasta, and sunset vistas from Piazzale Michelangelo.",
        highlights: [
            "Colosseum, Roman Forum, and Pantheon walkthrough",
            "Climbing the Duomo in Florence for sweeping city views",
            "Tasting authentic pistachio gelato and fresh carbonara",
        ],
        favoriteSpot: "Piazzale Michelangelo sunset in Florence",
        tag: "Renaissance & Food",
    },
    {
        id: "prague-czech",
        city: "Prague",
        country: "Czech Republic",
        flag: "🇨🇿",
        category: "culture",
        season: "Autumn",
        image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80",
        summary: "A fairytale cityscape filled with gothic spires, cobblestone bridges, hearty central European cuisine, and lively music halls.",
        highlights: [
            "Early morning crossing on Charles Bridge",
            "Exploring the massive Prague Castle complex",
            "Trdelník pastries in Old Town Square",
        ],
        favoriteSpot: "Letná Park overlook of the Vltava River bridges",
        tag: "Fairytale Architecture",
    },
    {
        id: "vienna-austria",
        city: "Vienna & Salzburg",
        country: "Austria",
        flag: "🇦🇹",
        category: "city",
        season: "Winter",
        image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=800&q=80",
        summary: "Imperial palaces, classical symphonies, traditional coffee house culture, and cozy winter markets with alpine backdrops.",
        highlights: [
            "Schönbrunn Palace gardens and imperial apartments",
            "Traditional Sachertorte & Wiener Melange in a classic cafe",
            "Day trip to Salzburg and the Mirabell Palace gardens",
        ],
        favoriteSpot: "Belvedere Palace & Vienna State Opera",
        tag: "Classical Music & Palaces",
    },
];

export const exchangeAcademicHighlights = [
    {
        title: "Intercultural Collaboration & Teamwork",
        description:
            "Worked alongside peers from across Europe and the Americas in project-based courses, gaining diverse viewpoints on technology design, ethics, and system reliability.",
        icon: "🤝",
    },
    {
        title: "Comparative Tech & Product Approaches",
        description:
            "Explored how European digital privacy regulations (GDPR, AI Act) and sustainability initiatives shape modern software architecture and platform engineering.",
        icon: "⚖️",
    },
    {
        title: "Global Independence & Adaptability",
        description:
            "Navigated independent living, cross-border train logistics, multilingual environments, and quick problem-solving in fast-paced international settings.",
        icon: "🧭",
    },
];

export const exchangeTips = [
    {
        title: "Eurail / Interrail Pass",
        tip: "Invaluable for flexible cross-border travel between neighboring countries. Book seat reservations early for high-speed ICE/TGV trains!",
    },
    {
        title: "Local Student Discounts",
        tip: "Always carry your university student ID or ISIC card — free or deeply discounted entry to almost every museum in the EU.",
    },
    {
        title: "Pack Layered & Light",
        tip: "Weather can change rapidly from Nordic breezes to Mediterranean sun. A lightweight rain shell and comfortable walking shoes are non-negotiable.",
    },
];
