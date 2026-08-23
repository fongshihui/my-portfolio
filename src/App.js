import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Exchange from "./components/Exchange";
import ContactForm from "./components/ContactForm";
import { trackPageView, trackEvent } from "./utils/analytics";

import "./App.css";

const sections = ["about", "skills", "projects", "exchange", "contact"];

const navItems = [
    { id: "about", label: "About", icon: "👤" },
    { id: "skills", label: "Skills", icon: "⚡" },
    { id: "projects", label: "Projects", icon: "💻" },
    { id: "exchange", label: "Europe Exchange", icon: "✈️" },
    { id: "contact", label: "Contact", icon: "📬" },
];

function getSectionFromHash() {
    const hash = window.location.hash.replace("#", "");
    return sections.includes(hash) ? hash : "about";
}

export default function App() {
    const [activeSection, setActiveSection] = useState(getSectionFromHash);

    useEffect(() => {
        const syncSectionWithHash = () => {
            setActiveSection(getSectionFromHash());
        };

        window.addEventListener("hashchange", syncSectionWithHash);
        return () => window.removeEventListener("hashchange", syncSectionWithHash);
    }, []);

    useEffect(() => {
        trackPageView(activeSection);
    }, [activeSection]);

    const handleNavClick = (section) => {
        trackEvent("nav_click", {
            section,
            source: "top_nav",
        });
        window.location.hash = section;
        setActiveSection(section);
    };

    const navClass = (section) =>
        `nav-chip ${
            activeSection === section ? "nav-chip-active" : "nav-chip-idle"
        }`;

    return (
        <div className="page-shell min-h-screen text-gray-800 antialiased flex flex-col justify-between">
            <div>
                <Header />

                {/* Sticky Navigation Bar */}
                <nav className="sticky top-0 z-30 border-y border-white/80 py-3.5 shadow-xs glass-surface">
                    <div className="container mx-auto flex flex-wrap justify-center gap-2.5 px-4 sm:gap-3">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className={navClass(item.id)}
                            >
                                <span className="mr-1.5">{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>
                </nav>

                {/* Main Content Area */}
                <main className="container mx-auto px-4 py-8 md:py-12">
                    <div className="grid-texture rounded-3xl border border-white/80 p-4 glass-surface soft-glow sm:p-6 md:p-10">
                        {activeSection === "about" && <About />}
                        {activeSection === "skills" && <Skills />}
                        {activeSection === "projects" && <Projects />}
                        {activeSection === "exchange" && <Exchange />}
                        {activeSection === "contact" && <ContactForm />}
                    </div>
                </main>
            </div>

            {/* Footer */}
            <footer className="border-t border-slate-200/60 py-8 text-center text-xs text-slate-500">
                <div className="container mx-auto px-4">
                    <p>
                        Designed &amp; Built by <span className="font-semibold text-slate-700">Fong Shi Hui</span> &bull; 2026
                    </p>
                    <p className="mt-1 text-slate-400">
                        Built with React &amp; Tailwind CSS
                    </p>
                </div>
            </footer>
        </div>
    );
}
