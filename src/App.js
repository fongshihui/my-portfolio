import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import './App.css';


export default function App() {
  const [typedName, setTypedName] = useState('');
  const name = "Shi Hui";
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const typeWriter = (text, i = 0) => {
      if (i < text.length) {
        setTypedName(text.substring(0, i + 1));
        setTimeout(() => typeWriter(text, i + 1), 200);
      } else {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    };
    typeWriter(name);
  }, []);

  const skills = [
    { name: 'HTML/CSS', level: 90, color: '#FFB3BA', icon: '🎨' },
    { name: 'JavaScript', level: 85, color: '#BAFFC9', icon: '🚀' },
    { name: 'React', level: 80, color: '#BAE1FF', icon: '⚛️' },
    { name: 'Node.js', level: 75, color: '#FFFFBA', icon: '🌿' },
    { name: 'Python', level: 70, color: '#FFD9BA', icon: '🐍' },
  ];

  const projects = [
    {
      id: 1,
      name: 'Cute Cat Gallery',
      description: 'A delightful collection of adorable cat pictures with a paw-some user interface.',
      image: '/placeholder.svg?height=200&width=300',
      link: 'https://github.com/shihui/cute-cat-gallery',
      icon: '🐱'
    },
    {
      id: 2,
      name: 'Kawaii Task Planner',
      description: 'Stay organized with this super cute and fun task planning app!',
      image: '/placeholder.svg?height=200&width=300',
      link: 'https://github.com/shihui/kawaii-task-planner',
      icon: '📅'
    },
    {
      id: 3,
      name: 'Pastel Weather Dashboard',
      description: 'Check the weather in style with this pastel-themed, charming weather app.',
      image: '/placeholder.svg?height=200&width=300',
      link: 'https://github.com/shihui/pastel-weather-dashboard',
      icon: '🌈'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 text-gray-800 font-sans">
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
                animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`
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
        <nav className="mt-8 relative z-10">
          <ul className="flex justify-center space-x-6">
            {['about', 'projects', 'contact'].map((section) => (
              <motion.li key={section} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <button
                  onClick={() => setActiveSection(section)}
                  className={`px-6 py-3 rounded-full text-lg transition-colors duration-300 ${
                    activeSection === section
                      ? 'bg-pink-400 text-white shadow-lg'
                      : 'bg-white text-pink-400 hover:bg-pink-100'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              </motion.li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        {activeSection === 'about' && (
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-center text-purple-500 mb-8">About Me</h2>
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <p className="text-lg mb-8 leading-relaxed">
                Hello there! 👋 I'm Shi Hui, a passionate developer with a love for all things cute and coding. 
                I specialize in creating delightful web experiences that are not only functional but also 
                bring a smile to users' faces. When I'm not typing away at my sparkly keyboard, you can find 
                me cuddling with my cat 🐱, collecting adorable stickers 🌟, or baking kawaii-themed cupcakes! 🧁
              </p>
              <h3 className="text-2xl font-bold text-pink-500 mb-6">My Magical Skills ✨</h3>
              <div className="space-y-6">
                {skills.map((skill) => (
                  <div key={skill.name} className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-lg font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200">
                          {skill.icon} {skill.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-semibold inline-block text-pink-600">
                          {skill.level}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-6 mb-4 text-xs flex rounded-full bg-pink-200">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        style={{ backgroundColor: skill.color }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {activeSection === 'projects' && (
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-center text-purple-500 mb-8">My Cute Creations 🎨</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg"
                >
                  <div className="relative">
                    <img src={project.image} alt={project.name} className="w-full h-48 object-cover" />
                    <div className="absolute top-0 left-0 bg-pink-400 text-white text-4xl p-2 rounded-br-2xl">
                      {project.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-pink-500 mb-2">{project.name}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-purple-400 text-white rounded-full px-6 py-3 hover:bg-purple-500 transition-colors duration-300 text-lg font-semibold"
                    >
                      View Project
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {activeSection === 'contact' && (
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-center text-purple-500 mb-8">Let's Connect! 💌</h2>
            <div className="bg-white rounded-3xl p-8 shadow-lg max-w-2xl mx-auto">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-full border-2 border-pink-300 focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50 text-lg"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-full border-2 border-pink-300 focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50 text-lg"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-3xl border-2 border-pink-300 focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50 text-lg"
                    required
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-medium text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-300"
                  >
                    Send Message 💖
                  </button>
                </div>
              </form>
            </div>
          </motion.section>
        )}
      </main>

      <footer className="bg-white py-8 px-4 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="text-pink-400 hover:text-pink-500 transition-colors duration-300">
            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>
          <a href="#" className="text-pink-400 hover:text-pink-500 transition-colors duration-300">
            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
            </svg>
          </a>
          <a href="#" className="text-pink-400 hover:text-pink-500 transition-colors duration-300">
            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm-1-6.75c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zM17 17h-2v-2.59c0-.97-.02-2.22-1.35-2.22-1.35 0-1.56 1.06-1.56 2.15V17h-2v-6h1.92v.88h.03c.35-.66 1.19-1.35 2.44-1.35 2.61 0 3.09 1.72 3.09 3.95V17z" />
            </svg>
          </a>
        </div>
        <p className="text-gray-500">© {new Date().getFullYear()} Shi Hui. All rights reserved. 💖</p>
      </footer>
    </div>
  );
}