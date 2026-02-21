import React, { useState } from "react";
import Header from "./components/Header";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ContactForm from "./components/ContactForm";
import { trackPageView, trackEvent } from "./utils/analytics";

import "./App.css";

export default function App() {
    const [activeSection, setActiveSection] = useState("about");
    useEffect(() => {
        trackPageView(activeSection);
    }, [activeSection]);

    const handleNavClick = (section) => {
        trackEvent("nav_click", {
            section,
            source: "top_nav",
        });
        setActiveSection(section);
    };

    return (
        <div className="min-h-screen text-gray-800">
            <Header />
            <nav className="sticky top-0 z-20 glass-surface shadow-sm py-4 border-y border-white/50">
                <div className="container mx-auto px-4 flex justify-center space-x-4">
                    <button
                        onClick={() => handleNavClick("about")}
                        className={`px-6 py-2 text-lg font-semibold rounded-full ${
                            activeSection === "about"
                                ? "bg-pink-400 text-white"
                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                    >
                        About
                    </button>
                    <button
                        onClick={() => handleNavClick("projects")}
                        className={`px-6 py-2 text-lg font-semibold rounded-full ${
                            activeSection === "projects"
                                ? "bg-pink-400 text-white"
                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                    >
                        Projects
                    </button>
                    <button
                        onClick={() => handleNavClick("contact")}
                        className={`px-6 py-2 text-lg font-semibold rounded-full ${
                            activeSection === "contact"
                                ? "bg-pink-400 text-white"
                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                    >
                        Contact
                    </button>
                </div>
            </nav>
            <main className="container mx-auto px-4 py-12">
                <section className="glass-surface soft-glow rounded-3xl p-6 md:p-10">
                    {activeSection === "about" && <Skills />}
                    {activeSection === "projects" && <Projects />}
                    {activeSection === "contact" && <ContactForm />}
                </section>
            </main>
        </div>
    );
}
