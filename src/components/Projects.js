import React from "react";
import { motion } from "framer-motion";
import projects from "../data/ProjectsData";

export default function Projects() {
    const featuredProject = projects[0];
    const otherProjects = projects.slice(1);

    const ProjectCard = ({ project, featured = false }) => (
        <motion.article
            whileHover={{ y: -6 }}
            className={`group overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-lg elevate-on-hover ${
                featured ? "md:grid md:grid-cols-[1.05fr_0.95fr]" : ""
            }`}
        >
            <div className={`relative ${featured ? "min-h-80" : "h-64"}`}>
                <img
                    src={project.image}
                    alt={project.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4 rounded-2xl bg-white/90 px-4 py-3 text-3xl shadow-md backdrop-blur">
                    {project.icon}
                </div>
                {project.status && (
                    <p className="absolute bottom-4 left-4 rounded-full bg-gray-900/85 px-4 py-2 text-sm font-semibold text-white shadow-md backdrop-blur">
                        {project.status}
                    </p>
                )}
            </div>
            <div className="flex h-full flex-col p-6 md:p-8">
                <h3
                    className={`font-bold text-gray-950 ${
                        featured ? "text-3xl md:text-4xl" : "text-2xl"
                    }`}
                >
                    {project.name}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-gray-600">
                    {project.description}
                </p>
                {project.tags?.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full bg-purple-50 px-3 py-1 text-sm font-semibold text-purple-700 ring-1 ring-purple-100"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                {project.highlights?.length > 0 && (
                    <ul className="mt-5 space-y-3 text-sm leading-relaxed text-gray-700">
                        {project.highlights.map((highlight) => (
                            <li key={highlight} className="flex gap-3">
                                <span className="mt-2 h-2 w-2 flex-none rounded-full bg-pink-400" />
                                <span>{highlight}</span>
                            </li>
                        ))}
                    </ul>
                )}
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-fit items-center rounded-full bg-gray-950 px-5 py-3 text-sm font-bold text-white transition-colors duration-300 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-300"
                >
                    View Details
                </a>
            </div>
        </motion.article>
    );

    return (
        <section className="mb-16">
            <div className="mx-auto mb-10 max-w-3xl text-center">
                <h2 className="text-4xl font-bold text-gray-950 md:text-5xl">
                    Selected Projects
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                    A mix of hackathon builds, cloud architecture, AI learning
                    tools, and product-focused web apps.
                </p>
            </div>
            <div className="mb-8">
                <ProjectCard project={featuredProject} featured />
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                {otherProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </section>
    );
}
