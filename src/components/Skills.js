import { experiences } from "../data/experiencesData";
import skills from "../data/skillsData";

export default function Skills() {
    return (
        <section className="mx-auto mb-16 max-w-5xl px-4">
            {/* About Me Section */}
            <h2 className="mb-8 text-center text-4xl font-black text-gray-950 md:text-5xl">
                About Me
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-gray-700 md:text-xl">
                I am Shi Hui, a Year 3 Information Systems undergraduate at
                Singapore Management University (SMU), with a strong interest in
                backend engineering and scalable software systems. I enjoy solving
                practical problems with clean architecture, reliable APIs, and
                measurable product impact.
            </p>

            {/* Experiences Section */}
            <h3 className="mt-16 mb-8 text-center text-3xl font-black text-gray-950 md:text-4xl">
                Professional Experience
            </h3>
            <div className="space-y-8">
                {experiences.map((experience, index) => (
                    <div
                        key={index}
                        className="elevate-on-hover rounded-2xl border border-pink-100 bg-white p-7 shadow-lg md:p-8"
                    >
                        <h4 className="mb-2 text-xl font-bold text-gray-950 md:text-2xl">
                            {experience.title} - {experience.company}
                        </h4>
                        <p className="mb-4 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-600">
                            {experience.period}
                        </p>
                        <ul className="ml-5 list-disc space-y-2.5 text-gray-700">
                            {experience.description.map((item, idx) => (
                                <li key={idx} className="leading-relaxed hover:text-pink-600">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Skills Section */}
            <h3 className="mt-16 mb-8 text-center text-3xl font-black text-gray-950 md:text-4xl">
             Technical Skills
            </h3>
            <div className="rounded-3xl border border-purple-100 bg-white p-8 shadow-lg">
                {skills.map((skill) => (
                    <div key={skill.name} className="relative pt-1 mb-6">
                        <div className="mb-2 flex items-center justify-between">
                            <span className="inline-block rounded-full bg-pink-100 px-3 py-1 text-base font-semibold uppercase text-pink-600 transition-shadow duration-300 hover:shadow-md md:text-lg">
                                {skill.icon} {skill.name}
                            </span>
                            <span className="inline-block text-base font-bold text-gray-700 md:text-lg">
                                {skill.level}%
                            </span>
                        </div>
                        <div className="mb-4 flex h-5 overflow-hidden rounded-full bg-gray-100 text-xs shadow-inner">
                            <div
                                style={{
                                    width: `${skill.level}%`,
                                    background: `linear-gradient(90deg, ${skill.color}, #f9a8d4)`,
                                }}
                                className="flex flex-col justify-center whitespace-nowrap rounded-full text-center text-white shadow-inner"
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
