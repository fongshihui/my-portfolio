import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { liveTravelDispatches } from "../data/exchangeData";

export default function Exchange() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState("all");
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const posts = liveTravelDispatches || [];

    // Extract unique tags that are non-empty
    const availableTags = [
        "all",
        ...Array.from(new Set(posts.map((p) => p.tag).filter(Boolean))),
    ];

    const filteredPosts = posts.filter((post) => {
        const matchesTag = selectedTag === "all" || post.tag === selectedTag;
        const matchesSearch =
            (post.location || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (post.caption || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (post.tag || "").toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTag && matchesSearch;
    });

    const latestPost = posts.length > 0 ? posts[0] : null;

    return (
        <section className="mx-auto max-w-6xl px-2 py-4 sm:px-4">
            {/* Header Banner */}
            <div className="relative mb-10 overflow-hidden rounded-3xl border border-pink-100 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-8 text-center shadow-xs md:p-12">
                <div className="flex flex-wrap items-center justify-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-purple-700 backdrop-blur-md">
                        <span>✈️</span> Europe Exchange
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-100/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 backdrop-blur-md shadow-2xs">
                        <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                        🚧 WIP
                    </span>
                </div>
                <h2 className="mt-4 text-3xl font-black text-gray-950 md:text-5xl">
                    Live Travel Postcards
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-base font-medium leading-relaxed text-gray-700 md:text-lg">
                    Documenting my 4-month exchange
                </p>

                {posts.length > 0 && (
                    <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold text-gray-800 shadow-2xs">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{posts.length} {posts.length === 1 ? "Postcard" : "Postcards"} Published</span>
                    </div>
                )}
            </div>

            {/* Featured Latest Post (if exists) */}
            {latestPost && (
                <div className="mb-12 rounded-3xl border border-purple-200 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 p-6 text-white shadow-xl md:p-8">
                    <div className="mb-4 flex items-center gap-2">
                        <span className="flex h-3 w-3 items-center justify-center">
                            <span className="absolute h-3 w-3 animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                        </span>
                        <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                            Latest Dispatch
                        </span>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 md:items-center">
                        <div
                            onClick={() => setSelectedPhoto(latestPost)}
                            className="group relative h-72 cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-slate-800 shadow-lg md:h-80"
                        >
                            <img
                                src={latestPost.image}
                                alt={latestPost.location || latestPost.caption || "Travel postcard"}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {latestPost.tag && (
                                <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                                    🏷️ {latestPost.tag}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col justify-center space-y-4">
                            <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-purple-300">
                                {latestPost.location && (
                                    <>
                                        <span>📍 {latestPost.location}</span>
                                        <span className="text-slate-500">•</span>
                                    </>
                                )}
                                <span className="text-slate-400">{latestPost.date}</span>
                            </div>

                            {latestPost.caption && (
                                <h3 className="text-2xl font-black leading-snug text-white md:text-3xl">
                                    {latestPost.caption}
                                </h3>
                            )}

                            <p className="text-xs text-slate-400">
                                ⚡ Updated live on-the-go via Telegram
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Filter and Search Bar (when multiple tags exist) */}
            {availableTags.length > 2 && (
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {/* Tag Filter */}
                    <div className="flex flex-wrap gap-2">
                        {availableTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all ${
                                    selectedTag === tag
                                        ? "bg-gray-950 text-white shadow-xs"
                                        : "border border-gray-200 bg-white text-gray-700 hover:border-purple-300"
                                }`}
                            >
                                {tag === "all" ? "All Postcards" : tag}
                            </button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search postcards..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs text-gray-800 placeholder-gray-400 shadow-2xs focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 sm:w-56"
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
            )}

            {/* Postcards Grid */}
            {filteredPosts.length > 0 ? (
                <div>
                    <h3 className="mb-6 text-xl font-bold text-gray-950 md:text-2xl">
                        All Travel Postcards ({filteredPosts.length})
                    </h3>
                    <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <AnimatePresence>
                            {filteredPosts.map((post) => (
                                <motion.article
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.25 }}
                                    key={post.id}
                                    onClick={() => setSelectedPhoto(post)}
                                    className="group cursor-pointer overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                                >
                                    <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                                        <img
                                            src={post.image}
                                            alt={post.location || post.caption || "Travel postcard"}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
                                        
                                        {post.location && (
                                            <div className="absolute left-3.5 top-3.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-gray-800 shadow-2xs backdrop-blur-md">
                                                📍 {post.location}
                                            </div>
                                        )}
                                        {post.tag && (
                                            <span className="absolute bottom-3 left-3.5 rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-md">
                                                🏷️ {post.tag}
                                            </span>
                                        )}
                                    </div>

                                    <div className="p-5">
                                        {post.caption && (
                                            <p className="text-sm font-semibold leading-relaxed text-gray-800">
                                                {post.caption}
                                            </p>
                                        )}
                                        <p className="mt-3 text-xs font-medium text-gray-400">
                                            {post.date}
                                        </p>
                                    </div>
                                </motion.article>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            ) : (
                <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center">
                    <span className="text-4xl">📸</span>
                    <h3 className="mt-3 text-lg font-bold text-gray-900">
                        No postcards yet
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Send a photo to your Telegram bot to publish your first travel postcard!
                    </p>
                </div>
            )}

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedPhoto(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-3xl overflow-hidden rounded-3xl border border-white/20 bg-slate-900 text-white shadow-2xl"
                        >
                            <img
                                src={selectedPhoto.image}
                                alt={selectedPhoto.location || selectedPhoto.caption || "Travel postcard"}
                                className="max-h-[70vh] w-full object-contain bg-black"
                            />
                            <div className="p-6">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-semibold text-purple-300">
                                            {selectedPhoto.location ? `📍 ${selectedPhoto.location} • ` : ""}{selectedPhoto.date}
                                        </p>
                                        {selectedPhoto.caption && (
                                            <h4 className="mt-1 text-lg font-bold">
                                                {selectedPhoto.caption}
                                            </h4>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => setSelectedPhoto(null)}
                                        className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold hover:bg-white/20"
                                    >
                                        Close ✕
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
