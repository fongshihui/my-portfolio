import { experiences } from "../data/experiencesData";
import skills from "../data/skillsData";

export default function Skills({ showSkills = false }) {
    if (showSkills) {
        return (
            <section className="mx-auto mb-16 max-w-5xl px-4">
                <h2 className="mb-6 text-center text-4xl font-black text-gray-950 md:text-5xl">
                    Technical Skills
                </h2>
                <p className="mx-auto mb-10 max-w-3xl text-center text-lg leading-relaxed text-gray-700 md:text-xl">
                    I am especially interested in concurrency, operating systems, computer architecture,
                    and the underlying data structures that make high-performance systems reliable.
                </p>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {skills.map((skill) => (
                        <div
                            key={skill.name}
                            className="rounded-2xl border border-purple-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                        >
                            <div className="flex items-center gap-3">
                                <span
                                    className="flex h-10 w-10 items-center justify-center rounded-xl text-xl shadow-sm"
                                    style={{ background: `${skill.color}33` }}
                                >
                                    {skill.icon}
                                </span>
                                <span className="text-lg font-bold text-gray-900">{skill.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="mx-auto mb-16 max-w-5xl px-4">
            <h2 className="mb-8 text-center text-4xl font-black text-gray-950 md:text-5xl">
                About Me
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-gray-700 md:text-xl">
                I am Fong Shi Hui, a Singapore Management University undergraduate studying
                Information Systems with Product Development &amp; Digital Business. I am especially
                interested in backend engineering, distributed systems, and building software that
                supports real products and real users.
            </p>

            <p className="mx-auto mb-12 max-w-4xl text-lg leading-relaxed text-gray-700 md:text-xl">
                I like working on systems that sit behind everyday products: scalable APIs, data
                pipelines, and cloud-based services that reduce friction and improve decision-making.
                My interests sit at the intersection of backend engineering, platform thinking, and
                product impact, where architecture, data, and user experience all matter.
            </p>

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
                        <p className="mb-4 text-sm font-medium uppercase tracking-wide text-gray-500">
                            {experience.location}
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
        </section>
    );
}
