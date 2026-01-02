"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User, Loader2 } from "lucide-react";
import { getProducts, type Product } from "@/lib/firestore";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load products from Firebase
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const prods = await getProducts();
        setFeaturedProducts(prods.slice(0, 8)); // Get first 8 products
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setProductsLoading(false);
      }
    };
    loadProducts();
  }, []);

  const services = [
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 44V20L24 4L40 20V44H28V32H20V44H8Z" fill="#FBBF24" stroke="#1E3A8A" strokeWidth="2" />
          <path d="M4 24L24 4L44 24" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      title: "Residential Painting",
      description: "Complete indoor and outdoor painting solutions for homes with color consultation, surface preparation, and premium finishes."
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="12" width="36" height="32" fill="#FBBF24" stroke="#1E3A8A" strokeWidth="2" />
          <rect x="12" y="18" width="8" height="8" fill="white" stroke="#1E3A8A" strokeWidth="1" />
          <rect x="28" y="18" width="8" height="8" fill="white" stroke="#1E3A8A" strokeWidth="1" />
          <rect x="12" y="30" width="8" height="8" fill="white" stroke="#1E3A8A" strokeWidth="1" />
          <rect x="28" y="30" width="8" height="8" fill="white" stroke="#1E3A8A" strokeWidth="1" />
          <rect x="20" y="36" width="8" height="8" fill="#1E3A8A" />
        </svg>
      ),
      title: "Commercial Painting",
      description: "Professional painting services for offices, schools, hotels, and commercial buildings with minimal disruption to operations."
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="8" width="14" height="14" rx="2" fill="#1E3A8A" />
          <rect x="26" y="8" width="14" height="14" rx="2" fill="#FBBF24" />
          <rect x="8" y="26" width="14" height="14" rx="2" fill="#F97316" />
          <rect x="26" y="26" width="14" height="14" rx="2" fill="#10B981" />
        </svg>
      ),
      title: "Wall Moulding & Decor",
      description: "Elegant wall mouldings, 3D panels, and decorative finishes to transform plain walls into stunning architectural features."
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 4L28 16H40L30 24L34 36L24 28L14 36L18 24L8 16H20L24 4Z" fill="#FBBF24" stroke="#1E3A8A" strokeWidth="2" />
        </svg>
      ),
      title: "Interior & Exterior Cladding",
      description: "Modern decorative cladding panels, stone veneers, and wood finishes to upgrade your property's aesthetics and insulation."
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 40V24C12 17.373 17.373 12 24 12C30.627 12 36 17.373 36 24V40" stroke="#1E3A8A" strokeWidth="3" />
          <path d="M8 40H40" stroke="#1E3A8A" strokeWidth="3" strokeLinecap="round" />
          <circle cx="24" cy="24" r="4" fill="#FBBF24" />
          <path d="M20 32L24 28L28 32" stroke="#1E3A8A" strokeWidth="2" />
        </svg>
      ),
      title: "Waterproofing",
      description: "Specialized waterproof coatings for roofs, terraces, and walls using Koraza by Montó for long-lasting protection."
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="8" width="32" height="32" rx="4" fill="#FBBF24" stroke="#1E3A8A" strokeWidth="2" />
          <path d="M16 24H32M24 16V32" stroke="#1E3A8A" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
      title: "Paint Supply",
      description: "Exclusive distributor of Montó Pinturas — premium Spanish paints for DIY customers and contractors."
    }
  ];

  const projects = [
    {
      title: "OIC Conference Centre",
      location: "Bijilo",
      description: "Repainting of the Sir Dawda Kairaba Jawara International Conference Center for the OIC Banjul Summit 2024.",
      type: "Government Infrastructure",
      image: "/oic.jpg"
    },
    {
      title: "Mile 2 Central Prison",
      location: "Banjul",
      description: "Complete facility facelift in partnership with Jollof Care Center — a GMD 500,000 community initiative.",
      type: "Social Impact",
      image: "/mile2.jpg"
    },
    {
      title: "Sankung Sillah Building",
      location: "Kairaba Avenue",
      description: "Restoration of the iconic seven-storey commercial landmark with premium Montó Fachadas facade paint.",
      type: "Commercial",
      image: "/sankungsillah.jpg"
    },
    {
      title: "Maarif International Schools",
      location: "Fajara",
      description: "Full interior and exterior repainting of the prestigious international school campus.",
      type: "Educational",
      image: "/marrif.jpeg"
    },
    {
      title: "TAF City Luxury Villa",
      location: "Sifoe",
      description: "High-end residential painting with designer color schemes for Gambia's first eco-smart city development.",
      type: "Luxury Residential",
      image: "/tafcity.webp"
    },
    {
      title: "GNPC & GGC Facilities",
      location: "Greater Banjul",
      description: "Industrial painting for the Gambia National Petroleum Corporation and Gambia Groundnut Corporation.",
      type: "Industrial",
      image: "/petroleumhouse.jpeg"
    }
  ];



  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "backdrop-blur-md bg-white/70 shadow-sm"
          : "bg-transparent"
          }`}
      >
        <div className="w-full px-8 py-2 flex items-center justify-between max-w-7xl mx-auto h-20">
          {/* Logo */}
          <div className="flex items-center h-full">
            <Image
              src="/logo.png"
              alt="CS Painting Gambia Logo"
              width={160}
              height={70}
              className="object-contain h-16 w-auto"
            />
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/services" className="nav-link">Services</Link>
            <Link href="/projects" className="nav-link">Our Projects</Link>
            <Link href="/products" className="nav-link">Products</Link>
            <a href="#about" className="nav-link">About us</a>
          </nav>

          {/* Contact Button & Admin */}
          <div className="hidden md:flex items-center gap-4">
            <a href="#contact" className="btn-primary">
              Contact us
            </a>
            <Link
              href="/admin/login"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Admin Portal"
            >
              <User className="w-5 h-5 text-gray-600" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-8 pt-20 flex flex-col md:flex-row items-center w-full">
          {/* Left Content */}
          <div className="w-full md:w-1/2 z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Need Painting?<br />
              Call <span className="text-yellow-500">"CS Painting</span><br />
              <span className="text-yellow-500">Gambia"</span>
            </h1>
            <p className="text-gray-600 text-sm mb-8 max-w-md">
              Professional painting and home décor services across The Gambia. Exclusive distributors of Montó Pinturas — premium Spanish paints. CS Means Trust.
            </p>
            <div className="flex gap-4">
              <a href="#services" className="btn-outline">Our Services</a>
              <a href="#contact" className="btn-outline">Contact us</a>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center md:justify-end">
            <div className="relative">
              <Image
                src="/hero.png"
                alt="Professional Painting Services"
                width={550}
                height={650}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <p className="text-gray-500 text-sm mb-2">Services</p>
              <h2 className="section-title">
                We provide<br />
                Professional Services
              </h2>
              <p className="text-gray-600 text-sm mt-4 max-w-md">
                From residential homes to commercial landmarks, we deliver premium painting and décor solutions with international quality standards.
              </p>
            </div>
            <a href="#services" className="btn-primary mt-6 md:mt-0 inline-block text-center">
              All services
            </a>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {services.slice(0, 3).map((service, index) => (
              <div key={index} className="service-card">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-6">{service.description}</p>
                <div className="arrow-btn mx-auto">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Second Row of Services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {services.slice(3, 6).map((service, index) => (
              <div key={index} className="service-card">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-6">{service.description}</p>
                <div className="arrow-btn mx-auto">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Left - CEO Image with Paint Splash */}
            <div className="w-full md:w-1/2 relative">
              <div className="relative">
                {/* Yellow paint splash background */}
                <div className="absolute -top-8 -left-8 w-72 h-96 bg-yellow-400 rounded-tl-[100px] rounded-br-[100px] z-0"></div>

                {/* CEO Image */}
                <div className="relative z-10 ml-8 mt-8">
                  <Image
                    src="/ceo.jpeg"
                    alt="Ousman C. Sinera - CEO of CS Painting Gambia"
                    width={280}
                    height={350}
                    className="rounded-lg object-cover shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Right - Content Box */}
            <div className="w-full md:w-1/2">
              <div className="about-section rounded-2xl p-10 relative overflow-hidden">
                {/* Decorative paint splashes */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full opacity-80"></div>
                <div className="absolute top-8 right-12 w-4 h-4 bg-green-400 rotate-45"></div>
                <div className="absolute bottom-16 -right-2 w-8 h-8 bg-green-400 rotate-12"></div>

                {/* Large faded "ABOUT" text */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-8xl font-bold text-white/10 tracking-widest rotate-90 origin-center translate-x-12">
                  ABOUT
                </div>

                <p className="text-gray-300 text-sm mb-2">About us</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  Making Your House<br />
                  As Good As Colorful
                </h2>
                <p className="text-gray-300 text-sm mb-4">
                  Founded in April 2023 by Ousman C. Sinera, CS Painting & Home Decor is Gambia's premier painting company. After years of experience with Swedish painting firms, our CEO returned home to introduce international quality standards to The Gambia.
                </p>
                <p className="text-gray-300 text-sm mb-8">
                  We are the exclusive distributors of Montó Pinturas — premium Spanish paints — and use professional Graco painting equipment. As members of the Gambia Chamber of Commerce, we're committed to training, quality, and community development.
                </p>

                <div className="flex items-center gap-6">
                  <a href="#contact" className="bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-full hover:bg-yellow-400 transition-colors">
                    Contact us
                  </a>
                  <div className="flex items-center gap-3 text-white">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 3C2 2.44772 2.44772 2 3 2H5.15287C5.64171 2 6.0589 2.35341 6.13927 2.8356L6.87858 7.27147C6.95075 7.70451 6.73206 8.13397 6.3394 8.32673L4.79126 9.10077C5.90756 11.8689 8.13114 14.0924 10.8992 15.2087L11.6733 13.6606C11.866 13.2679 12.2955 13.0492 12.7285 13.1214L17.1644 13.8607C17.6466 13.9411 18 14.3583 18 14.8471V17C18 17.5523 17.5523 18 17 18H15C7.8203 18 2 12.1797 2 5V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-sm">Brusubi Phase 2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-10">
            <p className="text-yellow-500 text-sm mb-2">Watch Our Story</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              See CS Painting in Action
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Learn about our journey, our mission, and what makes CS Painting the trusted choice for quality painting services in The Gambia.
            </p>
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.youtube.com/embed/rQIkcckE6Fk"
              title="CS Painting Gambia"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-gray-500 text-sm mb-2">Our Portfolio</p>
            <h2 className="section-title">
              Notable Projects
            </h2>
            <p className="text-gray-600 text-sm mt-4 max-w-2xl mx-auto">
              From national landmarks to luxury residences, we've painted our mark across The Gambia's most significant buildings.
            </p>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="project-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
                {/* Project Image */}
                <div className="h-48 bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center relative overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-yellow-400/20"></div>
                      <span className="text-white/60 text-sm z-10">Image Coming Soon</span>
                    </>
                  )}
                  <div className="absolute top-4 right-4 bg-yellow-500 text-xs font-semibold px-3 py-1 rounded-full text-gray-900 z-10">
                    {project.type}
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 7.5C8.10457 7.5 9 6.60457 9 5.5C9 4.39543 8.10457 3.5 7 3.5C5.89543 3.5 5 4.39543 5 5.5C5 6.60457 5.89543 7.5 7 7.5Z" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M7 12.5C7 12.5 11.5 9.5 11.5 5.5C11.5 3.01472 9.48528 1 7 1C4.51472 1 2.5 3.01472 2.5 5.5C2.5 9.5 7 12.5 7 12.5Z" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                    {project.location}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">{project.title}</h3>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <p className="text-gray-500 text-sm mb-2">Our Products</p>
              <h2 className="section-title">
                Quality Paints &<br />
                Equipment
              </h2>
              <p className="text-gray-600 text-sm mt-4 max-w-md">
                Exclusive distributor of Montó Pinturas (Spain) and authorized Graco equipment dealer in The Gambia.
              </p>
            </div>
            <Link href="/products" className="btn-primary mt-6 md:mt-0 inline-block text-center">
              See All Products
            </Link>
          </div>

          {/* Featured Products Grid */}
          {productsLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-blue-900 animate-spin" />
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <Link
                  href="/products"
                  key={product.id || index}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Product Image */}
                  <div className="h-40 relative overflow-hidden bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-blue-900 text-white text-xs font-semibold px-2 py-1 rounded">
                      {product.brand}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-blue-900 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-xs line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">No products found. Run the migration script to populate products.</p>
          )}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-16 bg-blue-900">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                CS Means Trust
              </h2>
              <p className="text-gray-300 max-w-lg">
                "If we don't do it ourselves, we can't expect others from outside to come and help." — Ousman C. Sinera, CEO
              </p>
            </div>
            <div className="flex flex-wrap gap-8 items-center">
              <div className="text-center">
                <p className="text-4xl font-bold text-yellow-500">50+</p>
                <p className="text-gray-300 text-sm">Projects Completed</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-yellow-500">2023</p>
                <p className="text-gray-300 text-sm">Est. Year</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-yellow-500">100%</p>
                <p className="text-gray-300 text-sm">Client Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners / Brands Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <p className="text-gray-500 text-sm mb-2">Our Partners</p>
            <h2 className="text-2xl font-bold text-gray-900">Trusted Brands We Work With</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12">
            <div className="bg-gray-100 px-8 py-4 rounded-lg">
              <p className="font-bold text-blue-900">Montó Pinturas</p>
              <p className="text-xs text-gray-500">Premium Spanish Paints</p>
            </div>
            <div className="bg-gray-100 px-8 py-4 rounded-lg">
              <p className="font-bold text-blue-900">Graco</p>
              <p className="text-xs text-gray-500">Professional Equipment</p>
            </div>
            <div className="bg-gray-100 px-8 py-4 rounded-lg">
              <p className="font-bold text-blue-900">Koraza</p>
              <p className="text-xs text-gray-500">Waterproofing Solutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Left - Contact Info */}
            <div className="w-full md:w-1/2">
              <p className="text-gray-500 text-sm mb-2">Get in Touch</p>
              <h2 className="section-title mb-6">
                Let's Upgrade<br />
                Your Space
              </h2>
              <p className="text-gray-600 mb-8">
                Ready to transform your home or business? Contact CS Painting Gambia for a free consultation and quote. We're your one-stop solution for all painting and décor needs.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 10C11.1046 10 12 9.10457 12 8C12 6.89543 11.1046 6 10 6C8.89543 6 8 6.89543 8 8C8 9.10457 8.89543 10 10 10Z" stroke="white" strokeWidth="1.5" />
                      <path d="M10 18C10 18 16 13 16 8C16 4.68629 13.3137 2 10 2C6.68629 2 4 4.68629 4 8C4 13 10 18 10 18Z" stroke="white" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Location</p>
                    <p className="text-gray-600 text-sm">Brusubi Phase 2, Serrekunda, The Gambia</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 3C2 2.44772 2.44772 2 3 2H5.15287C5.64171 2 6.0589 2.35341 6.13927 2.8356L6.87858 7.27147C6.95075 7.70451 6.73206 8.13397 6.3394 8.32673L4.79126 9.10077C5.90756 11.8689 8.13114 14.0924 10.8992 15.2087L11.6733 13.6606C11.866 13.2679 12.2955 13.0492 12.7285 13.1214L17.1644 13.8607C17.6466 13.9411 18 14.3583 18 14.8471V17C18 17.5523 17.5523 18 17 18H15C7.8203 18 2 12.1797 2 5V3Z" stroke="white" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p className="text-gray-600 text-sm">Contact us via social media or visit our showroom</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="4" width="16" height="12" rx="2" stroke="white" strokeWidth="1.5" />
                      <path d="M2 7L10 12L18 7" stroke="white" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Website</p>
                    <p className="text-gray-600 text-sm">cspaintinggambia.com</p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-8">
                <p className="font-semibold text-gray-900 mb-4">Follow Us</p>
                <div className="flex gap-4">
                  <a href="https://www.facebook.com/cspaintinggambia" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white hover:bg-blue-800 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.0084 4.94289 17.3436 8.78125 17.9V12.3125H6.6875V10H8.78125V8.25C8.78125 6.17875 10.0166 5.03125 11.9119 5.03125C12.8166 5.03125 13.7656 5.19375 13.7656 5.19375V7.25H12.7206C11.6962 7.25 11.3594 7.88094 11.3594 8.53125V10H13.6719L13.2862 12.3125H11.3594V17.9C15.1571 17.3436 18 14.0084 18 10Z" />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/cspaintinggambia" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white hover:bg-blue-800 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M10 2C7.82667 2 7.55533 2.00933 6.70133 2.048C5.84933 2.08667 5.26933 2.22133 4.76 2.41867C4.23333 2.62267 3.78733 2.89733 3.34267 3.34267C2.89733 3.78733 2.62267 4.23333 2.41867 4.76C2.22133 5.26933 2.08667 5.84933 2.048 6.70133C2.00933 7.55533 2 7.82667 2 10C2 12.1733 2.00933 12.4447 2.048 13.2987C2.08667 14.1507 2.22133 14.7307 2.41867 15.24C2.62267 15.7667 2.89733 16.2127 3.34267 16.6573C3.78733 17.1027 4.23333 17.3773 4.76 17.5813C5.26933 17.7787 5.84933 17.9133 6.70133 17.952C7.55533 17.9907 7.82667 18 10 18C12.1733 18 12.4447 17.9907 13.2987 17.952C14.1507 17.9133 14.7307 17.7787 15.24 17.5813C15.7667 17.3773 16.2127 17.1027 16.6573 16.6573C17.1027 16.2127 17.3773 15.7667 17.5813 15.24C17.7787 14.7307 17.9133 14.1507 17.952 13.2987C17.9907 12.4447 18 12.1733 18 10C18 7.82667 17.9907 7.55533 17.952 6.70133C17.9133 5.84933 17.7787 5.26933 17.5813 4.76C17.3773 4.23333 17.1027 3.78733 16.6573 3.34267C16.2127 2.89733 15.7667 2.62267 15.24 2.41867C14.7307 2.22133 14.1507 2.08667 13.2987 2.048C12.4447 2.00933 12.1733 2 10 2ZM10 3.44133C12.136 3.44133 12.3893 3.44933 13.2333 3.488C14.0133 3.524 14.436 3.65333 14.7187 3.76267C15.0933 3.90667 15.3587 4.07867 15.64 4.36C15.9213 4.64133 16.0933 4.90667 16.2373 5.28133C16.3467 5.564 16.476 5.98667 16.512 6.76667C16.5507 7.61067 16.5587 7.864 16.5587 10C16.5587 12.136 16.5507 12.3893 16.512 13.2333C16.476 14.0133 16.3467 14.436 16.2373 14.7187C16.0933 15.0933 15.9213 15.3587 15.64 15.64C15.3587 15.9213 15.0933 16.0933 14.7187 16.2373C14.436 16.3467 14.0133 16.476 13.2333 16.512C12.3893 16.5507 12.136 16.5587 10 16.5587C7.864 16.5587 7.61067 16.5507 6.76667 16.512C5.98667 16.476 5.564 16.3467 5.28133 16.2373C4.90667 16.0933 4.64133 15.9213 4.36 15.64C4.07867 15.3587 3.90667 15.0933 3.76267 14.7187C3.65333 14.436 3.524 14.0133 3.488 13.2333C3.44933 12.3893 3.44133 12.136 3.44133 10C3.44133 7.864 3.44933 7.61067 3.488 6.76667C3.524 5.98667 3.65333 5.564 3.76267 5.28133C3.90667 4.90667 4.07867 4.64133 4.36 4.36C4.64133 4.07867 4.90667 3.90667 5.28133 3.76267C5.564 3.65333 5.98667 3.524 6.76667 3.488C7.61067 3.44933 7.864 3.44133 10 3.44133ZM10 5.864C7.71467 5.864 5.864 7.71467 5.864 10C5.864 12.2853 7.71467 14.136 10 14.136C12.2853 14.136 14.136 12.2853 14.136 10C14.136 7.71467 12.2853 5.864 10 5.864ZM10 12.6667C8.52667 12.6667 7.33333 11.4733 7.33333 10C7.33333 8.52667 8.52667 7.33333 10 7.33333C11.4733 7.33333 12.6667 8.52667 12.6667 10C12.6667 11.4733 11.4733 12.6667 10 12.6667ZM15.24 5.70067C15.24 6.232 14.8093 6.66267 14.278 6.66267C13.7467 6.66267 13.316 6.232 13.316 5.70067C13.316 5.16933 13.7467 4.73867 14.278 4.73867C14.8093 4.73867 15.24 5.16933 15.24 5.70067Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="w-full md:w-1/2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Request a Free Quote</h3>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="+220 XXX XXXX" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Needed</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent">
                      <option value="">Select a service</option>
                      <option value="residential">Residential Painting</option>
                      <option value="commercial">Commercial Painting</option>
                      <option value="cladding">Wall Cladding</option>
                      <option value="moulding">Wall Moulding & Decor</option>
                      <option value="waterproofing">Waterproofing</option>
                      <option value="supply">Paint Supply</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent h-32 resize-none" placeholder="Tell us about your project..."></textarea>
                  </div>
                  <button type="submit" className="w-full btn-primary py-4 text-center">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo & About */}
            <div className="md:col-span-2">
              <Image
                src="/logo.png"
                alt="CS Painting Gambia Logo"
                width={120}
                height={50}
                className="object-contain mb-4 brightness-0 invert"
              />
              <p className="text-gray-400 text-sm mb-4">
                CS Painting & Home Decor — The Gambia's premier painting company. Professional residential and commercial painting services with international quality standards.
              </p>
              <p className="text-yellow-500 font-semibold">CS Means Trust</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#projects" className="hover:text-white transition-colors">Our Projects</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Residential Painting</li>
                <li>Commercial Painting</li>
                <li>Wall Cladding</li>
                <li>Wall Moulding</li>
                <li>Waterproofing</li>
                <li>Paint Supply</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 CS Painting Gambia. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Upgrading Your Home To Reality
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
