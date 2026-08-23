import React from "react";
import { motion } from "framer-motion";
import { skillCategories, certifications } from "../data/skillsData";

export default function Skills() {
    return (
        <section className="mx-auto max-w-5xl px-2 py-4 sm:px-4">
            {/* Header */}
            <div className="mx-auto mb-10 max-w-3xl text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-purple-700">
                    🛠️ Core Competencies
                </span>
                <h2 className="mt-3 text-3xl font-black text-gray-950 md:text-5xl">
                    Technical Skills &amp; Stack
                </h2>
                <p className="mt-4 text-base leading-relaxed text-gray-700 md:text-lg">
                    I am especially focused on concurrency, operating systems, distributed architectures,
                    and building high-throughput backend infrastructure.
                </p>
            </div>

            {/* Categorized Skills Grid */}
            <div className="space-y-8">
                {skillCategories.map((cat, catIdx) => (
                    <motion.div
                        key={cat.title}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: catIdx * 0.1 }}
                        className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-md md:p-8"
                    >
                        <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-2xl">
                                {cat.icon}
                            </span>
                            <div>
                                <h3 className="text-xl font-bold text-gray-950">
                                    {cat.title}
                                </h3>
                                <p className="text-xs text-gray-500 md:text-sm">
                                    {cat.description}
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {cat.skills.map((skill) => (
                                <div
                                    key={skill.name}
                                    className="group flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-200 hover:bg-white hover:shadow-sm"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-lg shadow-xs ring-1 ring-slate-100">
                                            {skill.icon}
                                        </span>
                                        <div>
                                            <span className="text-sm font-bold text-gray-900 group-hover:text-purple-700">
                                                {skill.name}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-500 shadow-2xs">
                                        {skill.tag}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Certifications Section */}
            <div className="mt-10 rounded-3xl border border-pink-100 bg-gradient-to-br from-white via-purple-50/20 to-pink-50/30 p-6 shadow-md md:p-8">
                <div className="mb-6 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-100 text-2xl">
                        📜
                    </span>
                    <div>
                        <h3 className="text-xl font-bold text-gray-950">
                            Certifications
                        </h3>
                        <p className="text-xs text-gray-500 md:text-sm">
                            Official industry cloud credentials
                        </p>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    {certifications.map((cert) => (
                        <div
                            key={cert.name}
                            className="flex items-center justify-between rounded-2xl border border-purple-100 bg-white p-4 shadow-xs transition-all hover:shadow-md"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{cert.badge}</span>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900">
                                        {cert.name}
                                    </h4>
                                    <p className="text-xs text-purple-600">{cert.issuer}</p>
                                </div>
                            </div>
                            <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-200">
                                {cert.tag}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
