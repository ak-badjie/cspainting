"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";
import { createPortal } from "react-dom";

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

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

            {/* Full Screen Menu Overlay - Portaled to body to avoid z-index/transform issues */}
            {mounted && createPortal(
                <div
                    className={`fixed inset-0 bg-white z-[9999] transform transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    {/* Close button for accessibility/usability (optional since hamburger toggles it, but good to have) */}
                    {/* Actually, the hamburger is in the header, which is z-50. This overlay is z-[9999]. 
                        The hamburger WILL BE COVERED by this overlay if we don't bring it up or add a close button inside.
                        Wait, the user wants the hamburger to toggle it.
                        If I portal the overlay to body z-[9999], it will cover the header z-50.
                        So the user won't be able to click the hamburger to close it!
                        
                        Solution:
                        1. Add a close button inside the overlay.
                        OR
                        2. Ensure the hamburger z-index is higher than the overlay (z-[10000]).
                        But the hamburger is inside the header, which has a stacking context due to backdrop-filter.
                        It cannot "break out" of that stacking context simply by z-index if the parent has transform/filter.
                        
                        So I MUST duplicate the close button/hamburger inside the overlay OR add a dedicated close button.
                        Given the design requirements "hamburger menu with exact animation", I should probably render 
                        the 'active' hamburger state INSIDE the overlay at the exact same position, or just a close button.
                        
                        Actually, let's keep the logic simple: Add a close button (X) or a duplicate hamburger at the top right of the overlay.
                        Or better, since I can't easily position the duplicate hamburger exactly where the original is (responsively),
                        I will add a standard close button or just a duplicate hamburger in the corner of the overlay.
                        
                        Let's try to mimic the hamburger inside the overlay for continuity if possible, positioned absolutely.
                        
                        However, usually the simplest fix for "hamburger covered" is to put the HAMBURGER itself in the portal if it's open? No, that's messy.
                        
                        Let's adding a close button (X) inside the overlay top-right.
                        OR even better, just render the same hamburger "close state" in the top right of the overlay.
                    */}

                    <div className="absolute top-5 right-8">
                        <button
                            onClick={toggleMenu}
                            className="p-2 text-gray-800 focus:outline-none"
                            aria-label="Close Menu"
                        >
                            <div className="w-8 h-6 flex flex-col justify-between items-center">
                                <span className="block h-0.5 w-full bg-blue-900 transform rotate-45 translate-y-2.5" />
                                <span className="block h-0.5 w-full bg-transparent opacity-0" />
                                <span className="block h-0.5 w-full bg-blue-900 transform -rotate-45 -translate-y-2.5" />
                            </div>
                        </button>
                    </div>

                    <div className="flex flex-col items-center justify-center min-h-screen p-6 overflow-y-auto">
                        {/* Logo Only - Made Bigger */}
                        <div className="w-40 h-40 relative mb-8">
                            <Image
                                src="/logo.png"
                                alt="CS Painting Logo"
                                fill
                                className="object-contain"
                            />
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
                </div>,
                document.body
            )}
        </div>
    );
}
