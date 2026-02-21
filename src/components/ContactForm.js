import React, { useState } from "react";
import emailjs from "emailjs-com";

export default function ContactForm() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Replace with your EmailJS configuration
        const serviceId = "service_w6osmab"
        const templateId = "template_rfugmie"; // Replace with your EmailJS Template ID
        const userId = "GjaTN93DHBfHOb_9J"; // Replace with your EmailJS User ID

        emailjs
            .send(serviceId, templateId, formData, userId)
            .then(
                (response) => {
                    console.log("SUCCESS!", response.status, response.text);
                    setIsSubmitted(true);
                    // Clear form
                    setFormData({ name: "", email: "", message: "" });
                },
                (error) => {
                    console.error("FAILED...", error);
                }
            );
    };

    return (
        <section className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-pink-500 mb-8">
                Let&apos;s Connect
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white/80 rounded-3xl p-8 shadow-lg">
                {isSubmitted && (
                    <p className="text-green-600 text-center font-semibold">
                        Message sent successfully! 🎉
                    </p>
                )}
                <div>
                    <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                        Your Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-full border-2 border-pink-200 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 text-lg"
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
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-full border-2 border-pink-200 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 text-lg"
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
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-3xl border-2 border-pink-200 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 text-lg min-h-36"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-pink-500 text-white rounded-full text-lg font-semibold hover:bg-pink-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
                >
                    Send Message
                </button>
            </form>
        </section>
    );
}
