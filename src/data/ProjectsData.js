const projects = [
    {
        id: 1,
        name: "Codex Hackathon",
        description:
            "Built a rapid prototype with OpenAI Codex as an AI engineering partner, using fast iteration loops to turn an idea into a working product experience during the hackathon.",
        image: "/codex-hackathon.svg",
        link: "https://interview-prep-studio.onrender.com/#context",
        icon: "⚡",
        status: "Hackathon build",
        tags: ["OpenAI Codex", "React", "Rapid prototyping", "Product thinking"],
        highlights: [
            "Used AI-assisted development to move from concept to implementation quickly.",
            "Focused on clear user flows, practical automation, and demo-ready polish.",
        ],
    },
    {
        id: 2,
        name: "AWS Serverless Portfolio Analytics",
        description:
            "Designed and deployed a serverless AWS project with static hosting, API integration, and event-driven processing to track portfolio interactions with scalable, cost-efficient architecture.",
        image: "/logo512.png",
        link: "https://github.com/fongshihui",
        icon: "☁️",
        status: "Cloud architecture",
        tags: ["AWS", "Serverless", "Analytics", "APIs"],
        highlights: [
            "Tracked portfolio interactions through an event-driven architecture.",
            "Prioritized low-cost deployment and scalable infrastructure patterns.",
        ],
    },
    {
        id: 3,
        name: "quizDaddy",
        description:
            "quizDaddy is a web application for students to upload their notes and materials to generate flashcards and quizzes using ChatGPT API for their enhanced learning.",
        image: "/quizDaddy.png",
        link: "http://quizdaddy-live.s3-website-ap-southeast-1.amazonaws.com",
        icon: "📅",
        status: "AI learning tool",
        tags: ["ChatGPT API", "Study tools", "Quizzes", "Flashcards"],
        highlights: [
            "Generated learning material from uploaded notes.",
            "Created a more active revision workflow for students.",
        ],
    },
    {
        id: 4,
        name: "Voyager",
        description:
            "Voyager is a smart travel planning app that helps users discover and shortlist places of interest based on community recommendations, all in one convenient feed.",
        image: "/Voyager.png",
        link: "https://voyager-bay-six.vercel.app/",
        icon: "🏖️",
        status: "Travel planning app",
        tags: ["React", "Recommendations", "Travel", "Vercel"],
        highlights: [
            "Helped users discover and shortlist places from a single feed.",
            "Balanced exploration, recommendations, and trip planning in one flow.",
        ],
    },
];

export default projects;
