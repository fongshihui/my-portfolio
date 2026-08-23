import React, { useState } from "react";
import emailjs from "emailjs-com";

export default function ContactForm() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const serviceId = "service_w6osmab";
        const templateId = "template_rfugmie";
        const userId = "GjaTN93DHBfHOb_9J";

        emailjs
            .send(serviceId, templateId, formData, userId)
            .then(
                (response) => {
                    console.log("SUCCESS!", response.status, response.text);
                    setIsSubmitted(true);
                    setIsSubmitting(false);
                    setFormData({ name: "", email: "", message: "" });
                },
                (error) => {
                    console.error("FAILED...", error);
                    setIsSubmitting(false);
                }
            );
    };

    return (
        <section className="mx-auto max-w-4xl px-2 py-4 sm:px-4">
            <div className="mx-auto mb-10 max-w-2xl text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-pink-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-pink-700">
                    📬 Get in Touch
                </span>
                <h2 className="mt-3 text-3xl font-black text-gray-950 md:text-5xl">
                    Let&apos;s Connect
                </h2>
                <p className="mt-3 text-base text-gray-600 md:text-lg">
                    Always excited to chat about distributed systems, backend engineering, exchange stories, or internship &amp; full-time roles.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-5">
                {/* Contact info cards */}
                <div className="flex flex-col justify-between space-y-4 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-md md:col-span-2 md:p-8">
                    <div>
                        <h3 className="text-xl font-bold text-gray-950">
                            Contact Information
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-gray-600 sm:text-sm">
                            Feel free to drop a message or reach out directly on LinkedIn or email.
                        </p>

                        <div className="mt-6 space-y-5">
                            <div className="flex items-start gap-3.5">
                                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-pink-50 text-lg">
                                    📍
                                </span>
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                        Location
                                    </p>
                                    <p className="text-sm font-semibold text-gray-800">
                                        Singapore
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3.5">
                                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-purple-50 text-lg">
                                    ✉️
                                </span>
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                        Email
                                    </p>
                                    <a
                                        href="mailto:reneefongsh@gmail.com"
                                        className="text-sm font-semibold text-purple-700 hover:underline"
                                    >
                                        reneefongsh@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-3.5">
                                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-emerald-50 text-lg">
                                    💼
                                </span>
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                        Availability
                                    </p>
                                    <p className="text-sm font-semibold text-gray-800">
                                        Open to 2027 Graduate &amp; Internship Opportunities
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-slate-100 pt-5">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                            Social Channels
                        </p>
                        <div className="mt-3 flex gap-2">
                            <a
                                href="https://www.linkedin.com/in/shi-hui-fong-06869a296/"
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-white hover:text-purple-700 hover:shadow-2xs"
                            >
                                LinkedIn
                            </a>
                            <a
                                href="https://github.com/fongshihui"
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-white hover:text-purple-700 hover:shadow-2xs"
                            >
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>

                {/* Form card */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 rounded-3xl border border-pink-100 bg-white p-6 shadow-md md:col-span-3 md:p-8"
                >
                    {isSubmitted && (
                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center text-sm font-bold text-emerald-800">
                            🎉 Thank you! Your message has been sent successfully.
                        </div>
                    )}

                    <div>
                        <label
                            htmlFor="name"
                            className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-600"
                        >
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Alex Tan"
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-gray-900 transition-all focus:border-purple-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-200"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-600"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="alex@example.com"
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-gray-900 transition-all focus:border-purple-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-200"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="message"
                            className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-600"
                        >
                            Your Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Hi Shi Hui, I came across your portfolio and wanted to reach out regarding..."
                            rows="4"
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-gray-900 transition-all focus:border-purple-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-200"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-full bg-gray-950 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-purple-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:opacity-50"
                    >
                        {isSubmitting ? "Sending..." : "Send Message →"}
                    </button>
                </form>
            </div>
        </section>
    );
}
