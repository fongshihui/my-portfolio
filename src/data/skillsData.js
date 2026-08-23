export const skillCategories = [
    {
        title: "Programming Languages",
        icon: "💻",
        description: "Core languages used for systems, backend services, and data pipelines.",
        skills: [
            { name: "Python", level: 95, icon: "🐍", color: "#3776AB", tag: "Advanced" },
            { name: "Java", level: 92, icon: "☕", color: "#ED8B00", tag: "Advanced" },
            { name: "C++", level: 85, icon: "⚡", color: "#00599C", tag: "Proficient" },
            { name: "Golang", level: 85, icon: "🔷", color: "#00ADD8", tag: "Proficient" },
            { name: "JavaScript / TypeScript", level: 88, icon: "🚀", color: "#F7DF1E", tag: "Proficient" },
            { name: "SQL", level: 90, icon: "💾", color: "#CC292B", tag: "Advanced" },
        ],
    },
    {
        title: "Backend & Systems Frameworks",
        icon: "⚙️",
        description: "Frameworks and streaming technologies for resilient scalable platforms.",
        skills: [
            { name: "Spring Boot / Cloud", level: 90, icon: "🌱", color: "#6DB33F", tag: "Advanced" },
            { name: "Apache Kafka", level: 88, icon: "📨", color: "#231F20", tag: "Proficient" },
            { name: "Apache Flink", level: 85, icon: "🌊", color: "#E6526F", tag: "Proficient" },
            { name: "Vert.x", level: 82, icon: "⚡", color: "#782A90", tag: "Proficient" },
            { name: "FastAPI", level: 88, icon: "⚡", color: "#059669", tag: "Proficient" },
            { name: "React", level: 80, icon: "⚛️", color: "#61DAFB", tag: "Proficient" },
        ],
    },
    {
        title: "Cloud & Infrastructure",
        icon: "☁️",
        description: "Cloud-native deployments, container orchestration, and monitoring.",
        skills: [
            { name: "AWS (ECS, MSK, Step Functions)", level: 85, icon: "☁️", color: "#FF9900", tag: "Certified" },
            { name: "Docker & Containerization", level: 88, icon: "🐳", color: "#2496ED", tag: "Proficient" },
            { name: "Redis & Caching", level: 86, icon: "⚡", color: "#DC382D", tag: "Proficient" },
            { name: "CI/CD & GitHub Actions", level: 85, icon: "🔄", color: "#2088FF", tag: "Proficient" },
            { name: "OpenSearch / Elastic", level: 80, icon: "🔍", color: "#005571", tag: "Familiar" },
            { name: "ZooKeeper & Curator", level: 80, icon: "🐘", color: "#D22128", tag: "Familiar" },
        ],
    },
];

export const certifications = [
    {
        name: "AWS Certified Solutions Architect – Associate",
        issuer: "Amazon Web Services",
        badge: "🏛️",
        tag: "Active",
    },
    {
        name: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        badge: "☁️",
        tag: "Active",
    },
];

const skills = skillCategories.flatMap((category) => category.skills);

export default skills;
