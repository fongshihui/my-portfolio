import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function Header() {
    const [typedName, setTypedName] = useState("");
    const name = "Shi Hui";

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
        <header className="py-12 px-4 text-center relative overflow-hidden">
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
            >
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-pink-200 opacity-50"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 20 + 10}px`,
                            height: `${Math.random() * 20 + 10}px`,
                            animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`,
                        }}
                    />
                ))}
            </motion.div>
            <motion.h1
                className="text-5xl md:text-7xl font-bold text-pink-500 mb-4 relative z-10"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <span className="inline-block">{typedName}</span>
                <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block ml-1"
                >
                    |
                </motion.span>
            </motion.h1>
            <motion.p
                className="text-2xl md:text-3xl text-purple-500 relative z-10"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                Cutesy Coder & Pixel Perfectionist ✨
            </motion.p>
        </header>
    );
}
