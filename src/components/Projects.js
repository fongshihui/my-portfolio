import React from "react";
import { motion } from "framer-motion";
import projects from "../data/ProjectsData";

export default function Projects() {
    const featuredProject = projects[0];
    const otherProjects = projects.slice(1);

    const ProjectCard = ({ project, featured = false }) => (
        <motion.article
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className={`group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                featured ? "md:p-8 border-purple-200 bg-gradient-to-br from-white via-purple-50/20 to-white" : ""
            }`}
        >
            <div>
                {/* Header row */}
                <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 text-2xl shadow-xs ring-1 ring-white">
                            {project.icon}
                        </div>
                        <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">
                                {featured ? "⭐ Featured Project" : "Project"}
                            </span>
                            <h3
                                className={`mt-0.5 font-bold text-gray-950 ${
                                    featured ? "text-2xl md:text-3xl" : "text-xl"
                                }`}
                            >
                                {project.name}
                            </h3>
                        </div>
                    </div>
                    {project.status && (
                        <span className="inline-flex rounded-full border border-purple-100 bg-purple-50/70 px-3 py-1 text-[11px] font-bold text-purple-800">
                            {project.status}
                        </span>
                    )}
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                    {project.description}
                </p>

                {/* Tags */}
                {project.tags?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-md bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Highlights */}
                {project.highlights?.length > 0 && (
                    <ul className="mt-5 space-y-2 text-xs leading-relaxed text-gray-700 md:text-sm">
                        {project.highlights.map((highlight) => (
                            <li key={highlight} className="flex items-start gap-2.5">
                                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-pink-500" />
                                <span>{highlight}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Bottom link button */}
            <div className="mt-6 pt-2">
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gray-950 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-purple-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-300 sm:text-sm"
                >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 .5c-6.627 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.387.6.113.793-.26.793-.577 0-.286-.01-1.041-.015-2.045-3.338.724-4.042-1.609-4.042-1.609-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.305 3.495.998.108-.775.419-1.305.763-1.605-2.665-.304-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.235-3.221-.123-.304-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.398 3.003-.403 1.02.005 2.047.137 3.005.403 2.29-1.553 3.296-1.23 3.296-1.23.653 1.653.241 2.873.118 3.176.769.84 1.233 1.911 1.233 3.221 0 4.61-2.807 5.623-5.479 5.921.43.369.814 1.096.814 2.209 0 1.596-.015 2.883-.015 3.275 0 .319.192.694.801.577 4.765-1.588 8.202-6.086 8.202-11.387 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>{project.linkLabel || "View Code on GitHub"}</span>
                    <span>→</span>
                </a>
            </div>
        </motion.article>
    );

    return (
        <section className="mx-auto max-w-6xl px-2 py-4 sm:px-4">
            <div className="mx-auto mb-10 max-w-3xl text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-purple-700">
                    💻 Engineering Portfolio
                </span>
                <h2 className="mt-3 text-3xl font-black text-gray-950 md:text-5xl">
                    Featured Systems &amp; Projects
                </h2>
                <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
                    Low-latency trading engines, real-time streaming architectures, distributed rate limiters, and AI product services.
                </p>
            </div>

            <div className="mb-8">
                <ProjectCard project={featuredProject} featured />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {otherProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </section>
    );
}
