import { experiences } from "../data/experiencesData";
import skills from "../data/skillsData";

export default function Skills() {
    return (
        <section className="mb-16 px-4 max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-center text-purple-600 mb-8">
                About Me
            </h2>
            <p className="text-xl leading-relaxed text-center text-gray-700 mb-12">
                Hi! I'm a Year 2 Information Systems student from Singapore
                Management University (SMU), with a strong interest in web
                development, data analysis, and product management. I am
                passionate about creating seamless user experiences and
                utilizing data-driven solutions to solve real-world problems.
            </p>
            
            <h3 className="text-4xl font-bold text-center text-purple-600 mt-16 mb-8">
                My Experiences
            </h3>
            <div className="space-y-8">
                {experiences.map((experience, index) => (
                    <div 
                        key={index}
                        className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <h4 className="text-2xl font-semibold text-pink-600 mb-2">
                            {experience.title} - {experience.company}
                        </h4>
                        <p className="text-gray-600 italic mb-4">
                            {experience.period}
                        </p>
                        <ul className="list-disc ml-6 text-gray-700 space-y-2">
                            {experience.description.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <h3 className="text-4xl font-bold text-center text-purple-600 mt-16 mb-8">
                My Magical Skills ✨
            </h3>
            <div className="bg-white rounded-3xl p-8 shadow-lg">
                {skills.map((skill) => (
                    <div
                        key={skill.name}
                        className="relative pt-1 mb-6"
                    >
                        <div className="flex mb-2 items-center justify-between">
                            <span className="text-lg font-semibold inline-block py-1 px-3 uppercase rounded-full text-pink-600 bg-pink-100">
                                {skill.icon} {skill.name}
                            </span>
                            <span className="text-lg font-semibold inline-block text-pink-600">
                                {skill.level}%
                            </span>
                        </div>
                        <div className="overflow-hidden h-6 mb-4 text-xs flex rounded-full bg-pink-100">
                            <div
                                style={{ width: `${skill.level}%`, backgroundColor: skill.color }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full"
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
