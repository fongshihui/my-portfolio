import React from "react";
import { motion } from "framer-motion";
import projects from "../data/ProjectsData";

export default function Projects() {
    return (
        <section className="mb-16">
            <h2 className="text-4xl font-bold text-center text-purple-500 mb-8">
                My Cute Creations 🎨
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white rounded-3xl overflow-hidden shadow-lg"
                    >
                        <div className="relative h-64">
                            <img
                                src={project.image}
                                alt={project.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-0 left-0 bg-pink-400 text-white text-4xl p-2 rounded-br-2xl">
                                {project.icon}
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-pink-500 mb-2">
                                {project.name}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {project.description}
                            </p>
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-purple-400 text-white rounded-full px-6 py-3 hover:bg-purple-500 transition-colors duration-300 text-lg font-semibold"
                            >
                                View Project
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
