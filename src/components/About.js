import React from "react";
import { motion } from "framer-motion";
import { experiences } from "../data/experiencesData";

export default function About() {
    return (
        <section className="mx-auto max-w-5xl px-2 py-4 sm:px-4">
            {/* Top Bio & Education Grid */}
            <div className="mb-12 grid gap-6 md:grid-cols-3">
                {/* Intro summary card */}
                <div className="rounded-3xl border border-pink-100 bg-white p-7 shadow-md md:col-span-2 md:p-8">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-pink-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-pink-600">
                        <span>👋</span> Hello World
                    </span>
                    <h2 className="mt-4 text-3xl font-black text-gray-950 md:text-4xl">
                        About Me
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-gray-700 md:text-lg">
                        I&apos;m <span className="font-bold text-gray-900">Fong Shi Hui</span>, an undergraduate at <span className="font-semibold text-purple-700">Singapore Management University (SMU)</span> majoring in Information Systems with a specialization in Product Development &amp; Digital Business.
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-gray-700">
                        I like delving deep into technologies, such as Python threading and understanding the internals of Kafka and Flink. I really enjoy building projects from scratch, experimenting with different architectures, and discussing the trade-offs behind engineering decisions—such as latency versus throughput, data consistency models, and system scalability.
                    </p>
                </div>

                {/* Education Card */}
                <div className="flex flex-col justify-between rounded-3xl border border-purple-100 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/40 p-7 shadow-md md:p-8">
                    <div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-purple-700">
                            🎓 Education
                        </span>
                        <h3 className="mt-4 text-xl font-bold text-gray-950">
                            Singapore Management University
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-purple-700">
                            BSc in Information Systems
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-gray-600">
                            Track: Product Development &amp; Digital Business
                        </p>
                    </div>

                    <div className="mt-6 space-y-2.5 border-t border-purple-100 pt-5">
                        <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50/80 px-3 py-2 text-xs font-bold text-amber-900">
                            <span>🏅</span>
                            <span>Lee Kong Chian Scholar</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-xl border border-purple-200 bg-purple-50/80 px-3 py-2 text-xs font-bold text-purple-900">
                            <span>✨</span>
                            <span>Magna Cum Laude</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Experience Timeline Section */}
            <div className="mb-8">
                <div className="mb-8 text-center">
                    <h3 className="text-3xl font-black text-gray-950 md:text-4xl">
                        Work Experience
                    </h3>
                    <p className="mt-2 text-base text-gray-600">
                        Internships and professional software engineering roles.
                    </p>
                </div>

                <div className="space-y-6">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="elevate-on-hover rounded-3xl border border-slate-200/90 bg-white p-6 shadow-md transition-all md:p-8"
                        >
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h4 className="text-xl font-bold text-gray-950 md:text-2xl">
                                            {exp.title}
                                        </h4>
                                    </div>
                                    <p className="mt-1 text-base font-semibold text-purple-700">
                                        {exp.company} <span className="text-gray-400 font-normal">• {exp.location}</span>
                                    </p>
                                </div>
                                <span className="inline-flex w-fit items-center rounded-full bg-slate-100 px-3.5 py-1 text-xs font-bold text-slate-700">
                                    {exp.period}
                                </span>
                            </div>

                            {/* Tech tags */}
                            {exp.tags?.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-1.5">
                                    {exp.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-md bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Bullet points */}
                            <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-gray-700 md:text-base">
                                {exp.description.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <span className="mt-2 h-2 w-2 flex-none rounded-full bg-pink-400" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
