import React, { useEffect, useState } from "react";
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

    const navClass = (section) =>
        `nav-chip rounded-full px-5 py-2 text-base font-bold transition-all duration-200 md:px-6 md:text-lg ${
            activeSection === section
                ? "bg-gray-950 text-white shadow-md ring-2 ring-gray-900/10"
                : "text-gray-800 hover:-translate-y-0.5 hover:bg-pink-50"
        }`;

    return (
        <div className="page-shell min-h-screen text-gray-800">
            <Header />
            <nav className="sticky top-0 z-20 border-y border-white/70 py-4 shadow-sm glass-surface">
                <div className="container mx-auto flex flex-wrap justify-center gap-3 px-4">
                    <button
                        onClick={() => handleNavClick("about")}
                        className={navClass("about")}
                    >
                        About
                    </button>
                    <button
                        onClick={() => handleNavClick("projects")}
                        className={navClass("projects")}
                    >
                        Projects
                    </button>
                    <button
                        onClick={() => handleNavClick("contact")}
                        className={navClass("contact")}
                    >
                        Contact
                    </button>
                </div>
            </nav>
            <main className="container mx-auto px-4 py-10 md:py-12">
                <section className="grid-texture rounded-3xl border border-white/70 p-5 glass-surface soft-glow md:p-10">
                    {activeSection === "about" && <Skills />}
                    {activeSection === "projects" && <Projects />}
                    {activeSection === "contact" && <ContactForm />}
                </section>
            </main>
        </div>
    );
}
