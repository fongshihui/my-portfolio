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
            <h2 className="mb-3 text-center text-4xl font-black text-gray-950">
                Let&apos;s Connect
            </h2>
            <p className="mb-8 text-center text-gray-600">
                Open to internship and software engineering opportunities.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-pink-100 bg-white p-8 shadow-lg">
                {isSubmitted && (
                    <p className="rounded-xl bg-green-50 p-3 text-center font-semibold text-green-700">
                        Message sent successfully! 🎉
                    </p>
                )}
                <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-bold uppercase tracking-wide text-gray-600">
                        Your Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full rounded-2xl border border-pink-200 px-4 py-3 text-lg transition-colors focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-bold uppercase tracking-wide text-gray-600">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full rounded-2xl border border-pink-200 px-4 py-3 text-lg transition-colors focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-bold uppercase tracking-wide text-gray-600">
                        Your Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="min-h-36 w-full rounded-2xl border border-pink-200 px-4 py-3 text-lg transition-colors focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full rounded-2xl bg-gray-950 px-4 py-3 text-lg font-bold text-white transition-colors duration-200 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300"
                >
                    Send Message
                </button>
            </form>
        </section>
    );
}
