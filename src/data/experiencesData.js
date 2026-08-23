export const experiences = [
  {
    title: "Engineering Summer Analyst (Intern)",
    company: "Goldman Sachs",
    location: "Singapore",
    period: "May 2026 – Jul 2026",
    tags: ["Java", "Vert.x", "Amazon ECS Fargate", "AWS MSK", "Kafka", "OpenSearch", "ZooKeeper", "Distributed Tracing"],
    description: [
      "Contributed to the cloud migration of the FICC trading platform's distributed tracing library to Amazon ECS Fargate, enabling OTel trace ingestion through Amazon MSK (Kafka) and Zipkin trace indexing with OpenSearch.",
      "Implemented Apache Curator for ZooKeeper-based service discovery within the distributed tracing library, enabling dynamic service registration for cloud-deployed tracing services.",
      "Developed a high-throughput email parsing service in Vert.x, automating extraction and routing of trading-related requests into downstream workflows.",
    ],
  },
  {
    title: "Backend Software Engineer (Intern)",
    company: "TikTok",
    location: "Singapore",
    period: "Feb 2026 – May 2026",
    tags: ["C++", "Python", "Apache Kafka", "Apache Flink", "Distributed Systems", "Recommendation Engines"],
    description: [
      "Built end-to-end distributed data pipelines (using Python, Kafka, Flink) processing TB-scale daily user interaction and query logs, enabling candidate generation for multiple search and recommendation services.",
      "Engineered and productionized user and content features for ranking models, improving candidate recall and training data quality for downstream personalization systems.",
      "Integrated multi-source data (RDBMS, key-value stores, distributed storage) into unified feature pipelines, reducing data latency and improving pipeline reliability and scalability.",
      "Implemented C++ retrieval and joiner services to support low-latency candidate generation, contributing to real-time search infrastructure serving millions of users.",
    ],
  },
  {
    title: "Software Engineer in Test (Intern)",
    company: "TikTok Live Money Platform",
    location: "Singapore",
    period: "Aug 2025 – Feb 2026",
    tags: ["Python", "API Automation", "FX Reconciliation", "Financial Systems", "Internal Tooling"],
    description: [
      "Built API automation test suites validating 50+ endpoints across payment, payout, and account services, catching 20+ critical defects prior to production releases.",
      "Leveraged Fund Sniffer (internal financial reconciliation tool) to validate cross-country price consistency, ensuring accurate FX rate application and decimal precision across 10+ regions.",
      "Developed internal testing tools to automate reconciliation checks, test execution, and failure reporting, reducing investigation and debugging time by ~40%.",
    ],
  },
  {
    title: "Software Engineer (Intern)",
    company: "Accenture",
    location: "Singapore",
    period: "May 2025 – Aug 2025",
    tags: ["Spring Boot", "React", "TypeScript", "AWS CloudWatch", "AWS Step Functions", "Cypress"],
    description: [
      "Identified, debugged, and resolved issues across Spring Boot backend services and React (TypeScript) frontend, improving system stability and end-user experience across multiple enterprise modules.",
      "Developed and maintained Cypress end-to-end automation tests for critical user flows, reducing manual regression testing effort by ~50% and accelerating UAT cycles.",
      "Utilized AWS CloudWatch to analyze application logs, metrics, and error traces across distributed services, enabling faster root cause analysis and reducing recurring production issues.",
      "Traced AWS Step Functions workflows to diagnose failures in multi-step backend processes, identifying bottlenecks and misconfigurations across integrated services.",
    ],
  },
];
