"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        // Prevent scrolling when menu is open
        if (!isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    };

    const closeMenu = () => {
        setIsOpen(false);
        document.body.style.overflow = "unset";
    };

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "Our Projects", href: "/projects" },
        { name: "Products", href: "/products" },
        { name: "About us", href: "/#about" },
        { name: "Contact", href: "/#contact" },
    ];

    return (
        <div className="md:hidden">
            {/* Hamburger Button */}
            <button
                onClick={toggleMenu}
                className="relative z-50 p-2 text-gray-800 focus:outline-none"
                aria-label="Toggle Menu"
            >
                <div className="w-8 h-6 flex flex-col justify-between items-center">
                    <span
                        className={`block h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out ${isOpen ? "rotate-45 translate-y-2.5 bg-blue-900" : "bg-gray-800"
                            }`}
                    />
                    <span
                        className={`block h-0.5 w-full bg-current transition-all duration-300 ease-in-out ${isOpen ? "opacity-0" : "bg-gray-800"
                            }`}
                    />
                    <span
                        className={`block h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out ${isOpen ? "-rotate-45 -translate-y-2.5 bg-blue-900" : "bg-gray-800"
                            }`}
                    />
                </div>
            </button>

            {/* Full Screen Menu Overlay */}
            <div
                className={`fixed inset-0 bg-white z-40 transform transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col items-center justify-center min-h-screen p-6 overflow-y-auto">
                    {/* Logo & Brand Name */}
                    <div className="flex flex-col items-center mb-12">
                        <div className="w-24 h-24 relative mb-4">
                            <Image
                                src="/logo.png"
                                alt="CS Painting Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-blue-900 tracking-tight">CS Painting</h2>
                        <p className="text-yellow-500 font-semibold tracking-widest text-sm uppercase">Gambia</p>
                    </div>

                    {/* Capsule Navigation Items */}
                    <nav className="flex flex-col gap-4 w-full max-w-xs">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={closeMenu}
                                className="group relative w-full text-center"
                            >
                                <div className="absolute inset-0 bg-gray-100 rounded-full scale-100 transition-all duration-300 group-hover:scale-105 group-hover:bg-blue-50 group-active:scale-95" />
                                <span className="relative block px-6 py-4 text-gray-700 font-medium text-lg transition-colors group-hover:text-blue-900">
                                    {item.name}
                                </span>
                            </Link>
                        ))}

                        {/* Admin Link Capsule */}
                        <Link
                            href="/admin/login"
                            onClick={closeMenu}
                            className="group relative w-full text-center mt-4"
                        >
                            <div className="absolute inset-0 border-2 border-blue-900/10 rounded-full scale-100 transition-all duration-300 group-hover:border-blue-900/30 group-hover:bg-blue-50/50" />
                            <span className="relative flex items-center justify-center gap-2 px-6 py-4 text-gray-500 font-medium text-sm transition-colors group-hover:text-blue-900">
                                <User className="w-4 h-4" /> Admin Portal
                            </span>
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
}
