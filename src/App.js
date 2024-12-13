import React, { useState } from "react";
import Header from "./components/Header";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ContactForm from "./components/ContactForm";
import "./App.css";

export default function App() {
    const [activeSection, setActiveSection] = useState("about");

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 text-gray-800">
            <Header />
            <nav className="bg-white shadow-md py-4">
                <div className="container mx-auto px-4 flex justify-center space-x-4">
                    <button
                        onClick={() => setActiveSection("about")}
                        className={`px-6 py-2 text-lg font-semibold rounded-full ${
                            activeSection === "about"
                                ? "bg-pink-400 text-white"
                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                    >
                        About
                    </button>
                    <button
                        onClick={() => setActiveSection("projects")}
                        className={`px-6 py-2 text-lg font-semibold rounded-full ${
                            activeSection === "projects"
                                ? "bg-pink-400 text-white"
                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                    >
                        Projects
                    </button>
                    <button
                        onClick={() => setActiveSection("contact")}
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
                {activeSection === "about" && <Skills />}
                {activeSection === "projects" && <Projects />}
                {activeSection === "contact" && <ContactForm />}
            </main>
        </div>
    );
}
