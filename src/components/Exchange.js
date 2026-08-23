import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    exchangeOverview,
    exchangeCategories,
    travelDestinations,
    exchangeAcademicHighlights,
    exchangeTips,
    liveTravelDispatches,
} from "../data/exchangeData";

export default function Exchange() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [activeDispatchIdx, setActiveDispatchIdx] = useState(0);

    const hasDispatches = liveTravelDispatches && liveTravelDispatches.length > 0;
    const currentDispatch = hasDispatches ? liveTravelDispatches[activeDispatchIdx] : null;

    const filteredDestinations = travelDestinations.filter((item) => {
        const matchesCategory =
            selectedCategory === "all" || item.category === selectedCategory;
        const matchesSearch =
            item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.tag.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const nextDispatch = () => {
        if (!hasDispatches) return;
        setActiveDispatchIdx((prev) => (prev + 1) % liveTravelDispatches.length);
    };

    const prevDispatch = () => {
        if (!hasDispatches) return;
        setActiveDispatchIdx((prev) => (prev - 1 + liveTravelDispatches.length) % liveTravelDispatches.length);
    };

    return (
        <section className="mx-auto max-w-6xl px-2 py-4 sm:px-4">
            {/* Header Banner */}
            <div className="relative mb-10 overflow-hidden rounded-3xl border border-pink-100 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-8 shadow-sm md:p-12">
                <div className="relative z-10 mx-auto max-w-3xl text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-purple-700 backdrop-blur-md">
                        <span>✈️</span> {exchangeOverview.period}
                    </span>
                    <h2 className="mt-4 text-3xl font-black text-gray-950 md:text-5xl">
                        {exchangeOverview.university}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-gray-700 md:text-lg">
                        {exchangeOverview.tagline}
                    </p>

                    {/* Quick Stats Grid */}
                    <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                        {exchangeOverview.stats.map((stat, idx) => (
                            <div
                                key={idx}
                                className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-1"
                            >
                                <span className="text-2xl">{stat.icon}</span>
                                <div className="mt-2 text-2xl font-black text-gray-900">
                                    {stat.value}
                                </div>
                                <div className="text-xs font-semibold text-gray-600">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Live Travel Dispatch / Today's Postcard Section */}
            {hasDispatches && currentDispatch && (
                <div className="mb-14 rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-950 p-6 text-white shadow-xl md:p-10">
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <span className="flex h-3 w-3 items-center justify-center">
                                <span className="absolute h-3 w-3 animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                            </span>
                            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                                Live Travel Dispatch
                            </span>
                        </div>

                        {liveTravelDispatches.length > 1 && (
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-300">
                                    Postcard {activeDispatchIdx + 1} of {liveTravelDispatches.length}
                                </span>
                                <button
                                    onClick={prevDispatch}
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm hover:bg-white/20"
                                    aria-label="Previous postcard"
                                >
                                    ‹
                                </button>
                                <button
                                    onClick={nextDispatch}
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm hover:bg-white/20"
                                    aria-label="Next postcard"
                                >
                                    ›
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 md:items-center">
                        <div className="relative h-72 overflow-hidden rounded-2xl border border-white/10 bg-slate-800 shadow-lg md:h-80">
                            <img
                                src={currentDispatch.image}
                                alt={currentDispatch.location}
                                className="h-full w-full object-cover"
                            />
                            {currentDispatch.tag && (
                                <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                                    🏷️ {currentDispatch.tag}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col justify-center space-y-4">
                            <div className="flex items-center gap-2 text-sm font-semibold text-purple-300">
                                <span>📍</span>
                                <span>{currentDispatch.location}</span>
                                <span className="text-slate-500">•</span>
                                <span className="text-slate-400">{currentDispatch.date}</span>
                            </div>

                            <h3 className="text-2xl font-black text-white md:text-3xl">
                                &ldquo;{currentDispatch.caption}&rdquo;
                            </h3>

                            <p className="text-xs text-slate-400">
                                ⚡ Updated live on-the-go from Telegram
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Travel Stories Section */}
            <div className="mb-14">
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h3 className="text-2xl font-black text-gray-950 md:text-3xl">
                            Travel Log &amp; City Highlights
                        </h3>
                        <p className="text-sm text-gray-600 md:text-base">
                            Snapshots and memories from journeys across Europe.
                        </p>
                    </div>

                    {/* Search & Filter Controls */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search city or country..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-48 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-800 placeholder-gray-400 shadow-sm transition-all focus:w-60 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 md:text-sm"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Category Pills */}
                <div className="mb-8 flex flex-wrap gap-2">
                    {exchangeCategories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-200 sm:text-sm ${
                                selectedCategory === cat.id
                                    ? "bg-gray-950 text-white shadow-sm"
                                    : "border border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50/50"
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Destination Cards Grid */}
                <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence>
                        {filteredDestinations.map((dest) => (
                            <motion.article
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.25 }}
                                key={dest.id}
                                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                            >
                                {/* Card Image / Visual Banner */}
                                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                                    <img
                                        src={dest.image}
                                        alt={`${dest.city}, ${dest.country}`}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                                    <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-gray-800 shadow-sm backdrop-blur-md">
                                        <span>{dest.flag}</span>
                                        <span>{dest.country}</span>
                                    </div>
                                    <div className="absolute bottom-3 left-4 right-4">
                                        <h4 className="text-xl font-bold text-white drop-shadow-sm">
                                            {dest.city}
                                        </h4>
                                        <p className="text-xs text-white/90 drop-shadow-sm">
                                            {dest.season} • {dest.tag}
                                        </p>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-1 flex-col p-5">
                                    <p className="text-sm leading-relaxed text-gray-600">
                                        {dest.summary}
                                    </p>

                                    {/* Highlights list */}
                                    <div className="mt-4 flex-1">
                                        <p className="text-xs font-bold uppercase tracking-wider text-purple-700">
                                            Highlights
                                        </p>
                                        <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-gray-700">
                                            {dest.highlights.map((h, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-pink-500" />
                                                    <span>{h}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Favorite Spot / Food */}
                                    {dest.favoriteSpot && (
                                        <div className="mt-4 rounded-xl border border-pink-100 bg-pink-50/60 p-2.5 text-xs text-pink-900">
                                            <span className="font-bold">🌟 Highlight: </span>
                                            {dest.favoriteSpot}
                                        </div>
                                    )}
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredDestinations.length === 0 && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
                        No destinations found matching &quot;{searchTerm}&quot;.
                    </div>
                )}
            </div>

            {/* Exchange Academics & Takeaways */}
            <div className="mb-14 rounded-3xl border border-purple-100 bg-white p-6 shadow-md md:p-10">
                <div className="mx-auto mb-8 max-w-2xl text-center">
                    <span className="inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">
                        Academic &amp; Cultural Growth
                    </span>
                    <h3 className="mt-2 text-2xl font-black text-gray-950 md:text-3xl">
                        Key Exchange Takeaways
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 md:text-base">
                        What studying abroad added to my technical and professional journey.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {exchangeAcademicHighlights.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col rounded-2xl border border-slate-100 bg-slate-50/60 p-6 transition-all hover:bg-white hover:shadow-md"
                        >
                            <span className="text-3xl">{item.icon}</span>
                            <h4 className="mt-3 text-lg font-bold text-gray-950">
                                {item.title}
                            </h4>
                            <p className="mt-2 text-sm leading-relaxed text-gray-600">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Travel Essentials & Tips */}
            <div className="rounded-3xl border border-pink-100 bg-gradient-to-r from-pink-50/50 to-purple-50/50 p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-950 md:text-2xl">
                    💡 Exchange Travel Notes &amp; Tips
                </h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    {exchangeTips.map((tip, idx) => (
                        <div
                            key={idx}
                            className="rounded-2xl border border-white bg-white/90 p-4 shadow-sm"
                        >
                            <h4 className="text-sm font-bold text-gray-900">
                                {tip.title}
                            </h4>
                            <p className="mt-1 text-xs leading-relaxed text-gray-600">
                                {tip.tip}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
