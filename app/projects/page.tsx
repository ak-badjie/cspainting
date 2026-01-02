import Image from "next/image";
import Link from "next/link";

const projects = [
    {
        title: "OIC Conference Centre",
        location: "Bijilo",
        year: "2023-2024",
        description: "CS Painting secured a high-profile contract to repaint the Sir Dawda Kairaba Jawara International Conference Center ahead of the OIC Banjul Summit 2024. This state-of-the-art, 1000+ seat venue received a fresh coat of paint under tight deadlines. Our team worked on both the exterior and select interiors of the massive 14,000 m² conference facility, ensuring it looked immaculate for the international event.",
        type: "Government Infrastructure",
        image: "/oic.jpg",
        highlights: ["14,000 m² facility", "International event deadline", "Interior & Exterior", "National showcase"]
    },
    {
        title: "Mile 2 Central Prison",
        location: "Banjul",
        year: "2025",
        description: "In partnership with Jollof Care Center, CS Painting undertook a charitable project to refurbish the Mile 2 Central Prison. Originally asked only to paint the female inmate block and infirmary, we went further and repainted the entire prison facility in a vibrant new color scheme. Nearly GMD 500,000 was invested in paint and materials for this initiative aimed at improving living conditions.",
        type: "Social Impact",
        image: "/mile2.jpg",
        highlights: ["GMD 500,000 investment", "Full facility facelift", "Community initiative", "Charity partnership"]
    },
    {
        title: "Sankung Sillah Building",
        location: "Kairaba Avenue",
        year: "2023",
        description: "One standout commercial project was the restoration of the Sankung Sillah Building, a famous seven-storey commercial complex on Kairaba Avenue (Pipeline area). This local landmark had aged over time. We used premium Montó Fachadas facade paint to ensure longevity, carefully handling surface repairs and scaffold work over the busy avenue.",
        type: "Commercial",
        image: "/sankungsillah.jpg",
        highlights: ["Seven-storey building", "Iconic landmark", "Montó Fachadas paint", "Full restoration"]
    },
    {
        title: "Maarif International Schools",
        location: "Fajara",
        year: "2024",
        description: "CS Painting was contracted to repaint the Maarif International Schools of The Gambia. The project involved a full overhaul of the school's interior and exterior walls at their Fajara campus. We provided color consultations, on-site technical advice, and product application for a durable finish while the school remained partially in session.",
        type: "Educational",
        image: "/marrif.jpeg",
        highlights: ["Full campus renovation", "Color consultation", "Minimal disruption", "Durable finish"]
    },
    {
        title: "TAF City Luxury Villa",
        location: "Sifoe",
        year: "2025",
        description: "CS Painting handles high-end residential projects such as this luxury villa in TAF City, Gambia's first eco-smart city development. The scope included interior painting with designer color schemes and exterior painting with weatherproof coatings. We worked closely with the developer's specifications to create the best finishes for this modern property.",
        type: "Luxury Residential",
        image: "/tafcity.webp",
        highlights: ["Eco-smart city", "Designer schemes", "Weatherproof coatings", "Premium finishes"]
    },
    {
        title: "GNPC & GGC Facilities",
        location: "Greater Banjul",
        year: "2022",
        description: "Soon after its inception, CS Painting took on significant industrial painting jobs for the Gambia Groundnut Corporation and the Gambia National Petroleum Corporation. These projects involved painting large industrial structures — warehouses, processing plants, fuel depots, and offices — demonstrating our ability to meet corporate standards and manage challenging logistics.",
        type: "Industrial",
        image: "/petroleumhouse.jpeg",
        highlights: ["Industrial scale", "Corporate standards", "Multiple facilities", "Safety compliance"]
    }
];

export default function ProjectsPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-blue-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-8">
                    <Link href="/" className="text-yellow-500 hover:text-yellow-400 mb-4 inline-flex items-center gap-2">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 10H5M5 10L10 5M5 10L10 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Projects</h1>
                    <p className="text-xl text-gray-300 max-w-2xl">
                        From national landmarks to luxury residences, we've painted our mark across The Gambia's most significant buildings. Every project reflects our dedication to quality and creativity.
                    </p>
                </div>
            </header>

            {/* Stats Bar */}
            <section className="bg-yellow-500 py-8">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="flex flex-wrap justify-center gap-12 md:gap-24">
                        <div className="text-center">
                            <p className="text-4xl font-bold text-gray-900">50+</p>
                            <p className="text-gray-800">Projects Completed</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-bold text-gray-900">100%</p>
                            <p className="text-gray-800">Client Satisfaction</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-bold text-gray-900">3</p>
                            <p className="text-gray-800">Years Experience</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects */}
            <main className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="space-y-16">
                        {projects.map((project, index) => (
                            <article
                                key={index}
                                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    } gap-8 items-center`}
                            >
                                {/* Image */}
                                <div className="w-full md:w-1/2">
                                    <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute top-4 left-4 bg-yellow-500 text-gray-900 text-sm font-semibold px-4 py-1 rounded-full">
                                            {project.type}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="w-full md:w-1/2">
                                    <div className="flex items-center gap-4 text-gray-500 text-sm mb-2">
                                        <span className="flex items-center gap-1">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 8.5C9.10457 8.5 10 7.60457 10 6.5C10 5.39543 9.10457 4.5 8 4.5C6.89543 4.5 6 5.39543 6 6.5C6 7.60457 6.89543 8.5 8 8.5Z" stroke="currentColor" strokeWidth="1.2" />
                                                <path d="M8 14C8 14 13 10.5 13 6.5C13 3.46243 10.5376 1 7.5 1C4.46243 1 2 3.46243 2 6.5C2 10.5 8 14 8 14Z" stroke="currentColor" strokeWidth="1.2" />
                                            </svg>
                                            {project.location}
                                        </span>
                                        <span>•</span>
                                        <span>{project.year}</span>
                                    </div>

                                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h2>
                                    <p className="text-gray-600 mb-6">{project.description}</p>

                                    {/* Highlights */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.highlights.map((highlight, i) => (
                                            <span
                                                key={i}
                                                className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                                            >
                                                {highlight}
                                            </span>
                                        ))}
                                    </div>

                                    <Link
                                        href="/#contact"
                                        className="inline-flex items-center gap-2 text-blue-900 font-semibold hover:text-yellow-600 transition-colors"
                                    >
                                        Start Your Project
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 10H15M15 10L10 5M15 10L10 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </main>

            {/* CTA Section */}
            <section className="bg-blue-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Be Our Next Success Story?</h2>
                    <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                        Join our growing list of satisfied clients. From residential homes to national landmarks, we deliver quality that speaks for itself.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/#contact"
                            className="bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-full hover:bg-yellow-400 transition-colors"
                        >
                            Get a Free Quote
                        </Link>
                        <Link
                            href="/services"
                            className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-blue-900 transition-colors"
                        >
                            View Services
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8">
                <div className="max-w-7xl mx-auto px-8 text-center">
                    <Image
                        src="/logo.png"
                        alt="CS Painting Gambia"
                        width={100}
                        height={40}
                        className="mx-auto mb-4 brightness-0 invert"
                    />
                    <p className="text-gray-400">
                        © 2025 CS Painting Gambia. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
