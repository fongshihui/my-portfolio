import React from "react";
import { motion } from "framer-motion";
import projects from "../data/ProjectsData";

export default function Projects() {
    const featuredProject = projects[0];
    const otherProjects = projects.slice(1);

    const ProjectCard = ({ project, featured = false }) => (
        <motion.article
            whileHover={{ y: -6 }}
            className={`project-card group rounded-2xl border border-slate-200 bg-white shadow-lg elevate-on-hover min-w-0 ${
                featured ? "p-6 md:p-8" : "p-6"
            }`}
        >
            <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 text-2xl shadow-sm">
                        {project.icon}
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                            {featured ? "Featured project" : "Project"}
                        </p>
                        <h3
                            className={`mt-2 font-bold text-gray-950 ${
                                featured ? "text-3xl md:text-4xl" : "text-2xl"
                            }`}
                        >
                            {project.name}
                        </h3>
                    </div>
                </div>
                {project.status && (
                    <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600">
                        {project.status}
                    </span>
                )}
            </div>

            <p className="text-base leading-relaxed text-gray-600">
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
                className="project-link mt-6 inline-flex w-fit items-center rounded-full bg-gray-950 px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
                {project.linkLabel || "View Details"}
            </a>
        </motion.article>
    );

    return (
        <section className="mb-16">
            <div className="mx-auto mb-10 max-w-3xl text-center">
                <h2 className="text-3xl font-bold text-gray-950 sm:text-4xl md:text-5xl">
                    Selected Projects
                </h2>
                <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
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
