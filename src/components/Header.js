import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function Header() {
    const [typedName, setTypedName] = useState("");
    const name = "Shi Hui";
    const bubbles = useMemo(
        () =>
            [...Array(50)].map(() => ({
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                size: `${Math.random() * 20 + 10}px`,
                duration: `${Math.random() * 10 + 5}s`,
            })),
        []
    );

    useEffect(() => {
        const typeWriter = (text, i = 0) => {
            if (i < text.length) {
                setTypedName(text.substring(0, i + 1));
                setTimeout(() => typeWriter(text, i + 1), 200);
            } else {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                });
            }
        };
        typeWriter(name);
    }, []);

    return (
        <header className="relative overflow-hidden px-4 py-16 text-center md:py-20">
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
            >
                {bubbles.map((bubble, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-pink-200 opacity-50"
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
            <motion.h1
                className="relative z-10 mb-5 text-5xl font-black tracking-tight text-gray-950 md:text-7xl"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <span className="inline-block bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
                    {typedName}
                </span>
                <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="ml-1 inline-block text-purple-600"
                >
                    |
                </motion.span>
            </motion.h1>
            <motion.p
                className="relative z-10 mx-auto max-w-2xl rounded-full border border-pink-100 bg-white/80 px-6 py-3 text-lg font-semibold text-gray-700 shadow-sm md:text-2xl"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                Backend-focused builder interested in cloud systems, product impact, and scalable engineering.
            </motion.p>
            <div className="relative z-10 mt-8 flex justify-center space-x-6">
                <a
                    href="https://www.linkedin.com/in/shi-hui-fong-06869a296/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open LinkedIn profile"
                    className="rounded-full border border-purple-100 bg-white/85 p-3 text-purple-500 transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-purple-700"
                >
                    <svg
                        className="h-8 w-8"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.3c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.3h-3v-5.5c0-1.381-1.119-2.5-2.5-2.5s-2.5 1.119-2.5 2.5v5.5h-3v-10h3v1.414c.76-.877 1.857-1.414 3-1.414 2.209 0 4 1.791 4 4v6z" />
                    </svg>
                </a>
                <a
                    href="https://github.com/fongshihui"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open GitHub profile"
                    className="rounded-full border border-purple-100 bg-white/85 p-3 text-purple-500 transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-purple-700"
                >
                    <svg
                        className="h-8 w-8"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 .5c-6.627 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.387.6.113.793-.26.793-.577 0-.286-.01-1.041-.015-2.045-3.338.724-4.042-1.609-4.042-1.609-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.305 3.495.998.108-.775.419-1.305.763-1.605-2.665-.304-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.235-3.221-.123-.304-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.398 3.003-.403 1.02.005 2.047.137 3.005.403 2.29-1.553 3.296-1.23 3.296-1.23.653 1.653.241 2.873.118 3.176.769.84 1.233 1.911 1.233 3.221 0 4.61-2.807 5.623-5.479 5.921.43.369.814 1.096.814 2.209 0 1.596-.015 2.883-.015 3.275 0 .319.192.694.801.577 4.765-1.588 8.202-6.086 8.202-11.387 0-6.627-5.373-12-12-12z" />
                    </svg>
                </a>
            </div>
        </header>
    );
}
