const projects = [
    {
        id: 1,
        name: "Order Matching Engine (C++)",
        description:
            "Built a limit-order-book matching engine in modern C++ with a Python client, protobuf transport, and price-time priority execution semantics.",
        image: "/logo512.png",
        link: "https://github.com/fongshihui/order-matching-engine-cpp",
        icon: "⚙️",
        status: "C++ / Python trading core",
        tags: ["C++17", "Protocol Buffers", "TCP", "Python Client", "Matching Engine"],
        highlights: [
            "Implemented a readable limit-order-book with FIFO matching, IOC/FOK/POST_ONLY/STP order flags, and best bid/ask depth reporting.",
            "Built a standalone TCP server and Python client interface for processing execution reports and order commands from Python dictionaries.",
        ],
        linkLabel: "View GitHub",
    },
    {
        id: 2,
        name: "Paper Trading Platform",
        description:
            "Built a real-time paper trading platform using Kafka, Flink, Python, Postgres, and Streamlit to simulate market data, signal generation, order execution, and live risk monitoring.",
        image: "/logo512.png",
        link: "https://github.com/fongshihui/paper-trading-platform",
        icon: "📊",
        status: "Streaming trading platform",
        tags: ["Kafka", "Flink", "Python", "Postgres", "Streamlit", "Docker"],
        highlights: [
            "Implemented a containerized end-to-end trading pipeline with mock and Alpaca market data producers, Flink signal processing, and simulator-backed portfolio snapshots.",
            "Designed a dashboard for live equity curve, P&L, drawdown, and position monitoring, with support for configurable slippage, fees, and risk controls.",
        ],
        linkLabel: "View GitHub",
    },
    {
        id: 3,
        name: "Distributed Rate Limiter",
        description:
            "Built a Spring Boot microservice with Spring Cloud Gateway and a Redis-backed token-bucket limiter to protect upstream APIs from abuse and overuse.",
        image: "/logo512.png",
        link: "https://github.com/fongshihui/rate-limiter",
        icon: "🛡️",
        status: "Spring Cloud Gateway / Redis",
        tags: ["Java 17", "Spring Boot", "Redis", "Gateway", "Token Bucket", "Lua"],
        highlights: [
            "Implemented a global gateway filter that resolves API tiers from request keys and enforces quota checks in Redis using atomic Lua scripting.",
            "Added rate-limit headers, retry metadata, and 429/503 responses so clients can observe quota state and handle service downtime gracefully.",
        ],
        linkLabel: "View GitHub",
    },
    {
        id: 4,
        name: "Shoppo",
        description:
            "Built a Telegram-based AI shopping agent that turns natural language and image inputs into marketplace product discovery and recommendation flows.",
        image: "/logo512.png",
        link: "https://github.com/fongshihui/tinyfish-openai-ecommerce",
        icon: "🛍️",
        status: "2026",
        tags: ["Telegram", "AI Agent", "FastAPI", "LLM", "SSE", "E-commerce"],
        highlights: [
            "Designed a ranking and recommendation flow that combines product relevance, pricing, and review signals to surface better matches from multiple marketplaces.",
            "Developed a FastAPI backend for real-time product search, AI-assisted shopping interactions, and resilient multi-source aggregation.",
        ],
        linkLabel: "View GitHub",
    },
];

export default projects;
