import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function Header() {
    const [typedName, setTypedName] = useState("");
    const name = "Fong Shi Hui";
    const bubbles = useMemo(
        () =>
            [...Array(40)].map(() => ({
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                size: `${Math.random() * 18 + 8}px`,
                duration: `${Math.random() * 8 + 6}s`,
            })),
        []
    );

    useEffect(() => {
        const typeWriter = (text, i = 0) => {
            if (i < text.length) {
                setTypedName(text.substring(0, i + 1));
                setTimeout(() => typeWriter(text, i + 1), 160);
            } else {
                confetti({
                    particleCount: 80,
                    spread: 60,
                    origin: { y: 0.6 },
                });
            }
        };
        typeWriter(name);
    }, []);

    return (
        <header className="relative overflow-hidden px-4 py-14 text-center md:py-20">
            {/* Animated Floating Bubbles Background */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
            >
                {bubbles.map((bubble, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-pink-300/30 backdrop-blur-3xs"
                        style={{
                            top: bubble.top,
                            left: bubble.left,
                            width: bubble.size,
                            height: bubble.size,
                            animation: `float ${bubble.duration} ease-in-out infinite`,
                        }}
                    />
                ))}
            </motion.div>

            {/* Status Pill */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-4 py-1.5 text-xs font-bold text-emerald-800 backdrop-blur-md shadow-2xs"
            >
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Open to 2027 SWE Grad &amp; Internship Roles</span>
            </motion.div>

            {/* Main Heading / Name */}
            <motion.h1
                className="relative z-10 mb-4 text-5xl font-black tracking-tight text-gray-950 md:text-7xl"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.1 }}
            >
                <span className="inline-block bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    {typedName}
                </span>
            </motion.h1>

            {/* Subtitle / Bio summary */}
            <motion.p
                className="relative z-10 mx-auto max-w-3xl rounded-3xl border border-white/80 bg-white/70 px-6 py-4 text-base font-semibold text-gray-700 shadow-sm backdrop-blur-md md:text-xl"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
            >
                Backend Software Engineer &bull; Distributed Systems, Streaming Pipelines &amp; Cloud Architecture
            </motion.p>

            {/* Social & Contact Links */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-3"
            >
                <a
                    href="https://www.linkedin.com/in/shi-hui-fong-06869a296/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-purple-100 bg-white/90 px-4 py-2 text-xs font-bold text-gray-700 shadow-2xs backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:border-purple-300 hover:text-purple-700 sm:text-sm"
                >
                    <svg className="h-4 w-4 text-[#0077b5]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.3c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.3h-3v-5.5c0-1.381-1.119-2.5-2.5-2.5s-2.5 1.119-2.5 2.5v5.5h-3v-10h3v1.414c.76-.877 1.857-1.414 3-1.414 2.209 0 4 1.791 4 4v6z" />
                    </svg>
                    <span>LinkedIn</span>
                </a>

                <a
                    href="https://github.com/fongshihui"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-purple-100 bg-white/90 px-4 py-2 text-xs font-bold text-gray-700 shadow-2xs backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:border-purple-300 hover:text-purple-700 sm:text-sm"
                >
                    <svg className="h-4 w-4 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 .5c-6.627 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.387.6.113.793-.26.793-.577 0-.286-.01-1.041-.015-2.045-3.338.724-4.042-1.609-4.042-1.609-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.305 3.495.998.108-.775.419-1.305.763-1.605-2.665-.304-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.235-3.221-.123-.304-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.398 3.003-.403 1.02.005 2.047.137 3.005.403 2.29-1.553 3.296-1.23 3.296-1.23.653 1.653.241 2.873.118 3.176.769.84 1.233 1.911 1.233 3.221 0 4.61-2.807 5.623-5.479 5.921.43.369.814 1.096.814 2.209 0 1.596-.015 2.883-.015 3.275 0 .319.192.694.801.577 4.765-1.588 8.202-6.086 8.202-11.387 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>GitHub</span>
                </a>

                <a
                    href="mailto:reneefongsh@gmail.com"
                    className="inline-flex items-center gap-2 rounded-full border border-purple-100 bg-white/90 px-4 py-2 text-xs font-bold text-gray-700 shadow-2xs backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:border-purple-300 hover:text-pink-600 sm:text-sm"
                >
                    <span>✉️</span>
                    <span>reneefongsh@gmail.com</span>
                </a>
            </motion.div>
        </header>
    );
}
