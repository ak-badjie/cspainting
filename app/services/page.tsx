import Image from "next/image";
import Link from "next/link";

const services = [
    {
        icon: (
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 58V26L32 5L54 26V58H38V42H26V58H10Z" fill="#FBBF24" stroke="#1E3A8A" strokeWidth="2.5" />
                <path d="M5 32L32 5L59 32" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
        ),
        title: "Interior Painting",
        subtitle: "Residential & Commercial",
        description: "Complete indoor painting solutions with color consultation, surface preparation, and fine finishes for homes, offices, schools, and commercial spaces. We aim for high-quality wall finishing with decorative techniques to achieve your desired ambiance.",
        features: ["Color Consultation", "Surface Preparation", "Premium Finishes", "Decorative Techniques"]
    },
    {
        icon: (
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="16" width="48" height="42" fill="#FBBF24" stroke="#1E3A8A" strokeWidth="2.5" />
                <rect x="16" y="24" width="12" height="10" fill="white" stroke="#1E3A8A" strokeWidth="1.5" />
                <rect x="36" y="24" width="12" height="10" fill="white" stroke="#1E3A8A" strokeWidth="1.5" />
                <rect x="16" y="40" width="12" height="10" fill="white" stroke="#1E3A8A" strokeWidth="1.5" />
                <rect x="36" y="40" width="12" height="10" fill="white" stroke="#1E3A8A" strokeWidth="1.5" />
                <path d="M32 5L8 16H56L32 5Z" fill="#1E3A8A" />
            </svg>
        ),
        title: "Exterior Painting",
        subtitle: "Residential & Commercial",
        description: "Weather-resistant painting for building facades, using premium exterior coatings. Our team ensures proper surface preparation including power washing and priming, applying paints suited for The Gambia's climate to protect against humidity and rain damage.",
        features: ["Power Washing", "Weather-Resistant Coatings", "Climate Protection", "Facade Restoration"]
    },
    {
        icon: (
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="8" width="20" height="20" rx="3" fill="#1E3A8A" />
                <rect x="36" y="8" width="20" height="20" rx="3" fill="#FBBF24" />
                <rect x="8" y="36" width="20" height="20" rx="3" fill="#F97316" />
                <rect x="36" y="36" width="20" height="20" rx="3" fill="#10B981" />
            </svg>
        ),
        title: "Interior & Exterior Cladding",
        subtitle: "Wall Panels & Finishes",
        description: "Installation of decorative cladding panels on walls to enhance aesthetics and insulation. This service includes modern 3D wall panels, stone or wood veneer finishes, and other cladding materials to upgrade the look of your property.",
        features: ["3D Wall Panels", "Stone Veneer", "Wood Finishes", "Insulation Benefits"]
    },
    {
        icon: (
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="12" y="12" width="40" height="40" rx="4" stroke="#1E3A8A" strokeWidth="2.5" />
                <rect x="20" y="20" width="24" height="24" rx="2" fill="#FBBF24" />
                <path d="M26 32H38M32 26V38" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
        ),
        title: "Wall Moulding & Decoration",
        subtitle: "Architectural Details",
        description: "Beyond paint, we provide home décor enhancements including wall mouldings, trims, and other architectural details to create elegant interior designs. We combine molding installations with custom paint jobs to transform plain walls into stylish features.",
        features: ["Decorative Mouldings", "Trim Work", "Architectural Details", "Custom Designs"]
    },
    {
        icon: (
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 54V32C16 22.059 24.059 14 34 14C43.941 14 52 22.059 52 32V54" stroke="#1E3A8A" strokeWidth="3" />
                <path d="M10 54H54" stroke="#1E3A8A" strokeWidth="3" strokeLinecap="round" />
                <circle cx="34" cy="32" r="6" fill="#FBBF24" />
                <path d="M28 44L34 38L40 44" stroke="#1E3A8A" strokeWidth="2.5" />
            </svg>
        ),
        title: "Waterproofing & Protective Coatings",
        subtitle: "Koraza by Montó",
        description: "We address issues like leaking roofs and damp walls by applying specialized waterproof coatings. We proudly use Koraza by Montó – a premium waterproofing product line – to seal terraces, roofs, and protect buildings from water intrusion.",
        features: ["Roof Sealing", "Damp Prevention", "Terrace Protection", "Long-term Durability"]
    },
    {
        icon: (
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="24" fill="#FBBF24" stroke="#1E3A8A" strokeWidth="2.5" />
                <path d="M32 16V32L42 42" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
        ),
        title: "Paint Supply & Consultation",
        subtitle: "Montó Pinturas Distributor",
        description: "As the official Montó Paints distributor in The Gambia, we supply premium Spanish paints to DIY customers and contractors. Visit our Brusubi Phase 2 showroom for consultations on the best products for your project needs.",
        features: ["Premium Spanish Paints", "Expert Consultation", "DIY Support", "Contractor Supply"]
    },
    {
        icon: (
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 8L40 24H52L42 34L46 50L32 40L18 50L22 34L12 24H24L32 8Z" fill="#FBBF24" stroke="#1E3A8A" strokeWidth="2" />
            </svg>
        ),
        title: "Training & Technical Support",
        subtitle: "Industry Development",
        description: "Reflecting our CEO's vision to 'train, expand, and transform' the local painting industry, we provide training workshops and on-site technical support. We help local contractors improve their skills and offer performance warranties on our projects.",
        features: ["Skill Workshops", "On-site Support", "Performance Warranty", "Industry Training"]
    }
];

export default function ServicesPage() {
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
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
                    <p className="text-xl text-gray-300 max-w-2xl">
                        Professional painting and home décor services designed to transform your spaces. We focus on more than just applying paint — we solve real problems in The Gambia's painting industry.
                    </p>
                </div>
            </header>

            {/* Services Grid */}
            <main className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid grid-cols-1 gap-12">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className={`flex flex-col md:flex-row gap-8 items-start p-8 rounded-2xl ${index % 2 === 0 ? "bg-gray-50" : "bg-white border border-gray-100"
                                    }`}
                            >
                                {/* Icon */}
                                <div className="flex-shrink-0 w-20 h-20 bg-white rounded-xl shadow-md flex items-center justify-center">
                                    {service.icon}
                                </div>

                                {/* Content */}
                                <div className="flex-grow">
                                    <p className="text-yellow-600 text-sm font-medium mb-1">{service.subtitle}</p>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h2>
                                    <p className="text-gray-600 mb-6 max-w-2xl">{service.description}</p>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-2">
                                        {service.features.map((feature, i) => (
                                            <span
                                                key={i}
                                                className="bg-blue-100 text-blue-900 text-sm px-3 py-1 rounded-full"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="flex-shrink-0">
                                    <Link
                                        href="/#contact"
                                        className="bg-blue-900 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-800 transition-colors inline-block"
                                    >
                                        Get Quote
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* CTA Section */}
            <section className="bg-yellow-500 py-16">
                <div className="max-w-7xl mx-auto px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Space?</h2>
                    <p className="text-gray-800 mb-8 max-w-xl mx-auto">
                        Contact us today for a free consultation and quote. CS Means Trust.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/#contact"
                            className="bg-blue-900 text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-800 transition-colors"
                        >
                            Contact Us
                        </Link>
                        <Link
                            href="/products"
                            className="bg-white text-gray-900 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            View Products
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
