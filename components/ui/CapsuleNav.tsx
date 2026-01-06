'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';

export interface CapsuleNavProps {
    logoSrc?: string;
    logoAlt?: string;
    companyName?: string;
    tagline?: string;
    position?: 'top-left' | 'top-right';
    className?: string;
    zIndex?: number;
}

// Navigation sections with varying sizes
const navigationSections = [
    {
        title: 'Products',
        size: 'large', // Takes more space
        links: [
            { label: 'Oracle Seed BTC', href: '/products/oracle-seed' },
            { label: 'Amaka AI', href: '/products/amaka-ai' },
            { label: 'Garden', href: '/products/garden' },
        ],
    },
    {
        title: 'Research',
        size: 'medium',
        links: [
            { label: 'Published Papers', href: '/research/papers' },
            { label: 'Current Projects', href: '/research/projects' },
            { label: 'Methodology', href: '/research/methodology' },
        ],
    },
    {
        title: 'Our Digital Services',
        size: 'large',
        links: [
            { label: 'Digital Infrastructure', href: '/services/digital-infrastructure' },
            { label: 'AI Infrastructure', href: '/services/ai-infrastructure' },
            { label: 'Digital Marketing', href: '/services/digital-marketing' },
            { label: 'Video Production', href: '/services/video-production' },
            { label: 'Drone Shots', href: '/services/drone-shots' },
            { label: 'Team Training', href: '/services/training' },
        ],
    },
    {
        title: 'Teams',
        size: 'small',
        links: [
            { label: 'Research Team', href: '/teams/research' },
            { label: 'Engineering', href: '/teams/engineering' },
            { label: 'Creative', href: '/teams/creative' },
        ],
    },
    {
        title: 'Careers',
        size: 'medium',
        links: [
            { label: 'Research Positions', href: '/careers/research' },
            { label: 'Engineering Roles', href: '/careers/engineering' },
            { label: 'Creative & Filming', href: '/careers/creative' },
        ],
    },
    {
        title: 'About',
        size: 'small',
        links: [
            { label: 'Company', href: '/about' },
            { label: 'Mission & Vision', href: '/about/mission' },
        ],
    },
    {
        title: 'Founder',
        size: 'small',
        links: [
            { label: 'Meet the CEO', href: '/founder' },
            { label: 'Story', href: '/founder/story' },
        ],
    },
    {
        title: 'Contact',
        size: 'medium',
        links: [
            { label: 'Email', href: '/contact/email' },
            { label: 'Twitter', href: 'https://twitter.com/DaveLabs' },
            { label: 'LinkedIn', href: 'https://linkedin.com/company/DaveLabs' },
        ],
    },
];

const cardColors = ['#0f0f1a', '#1a1a2e'];

const CapsuleNav: React.FC<CapsuleNavProps> = ({
    logoSrc = '/davelabslogo.png',
    logoAlt = 'DaveLabs Logo',
    companyName = 'DaveLabs',
    tagline = 'RESEARCH',
    position = 'top-right',
    className,
    zIndex = 9999,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const overlayRef = useRef<HTMLDivElement>(null);

    // Track window dimensions
    useEffect(() => {
        const updateDimensions = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const toggleMenu = () => setIsOpen(!isOpen);

    // Calculate card dimensions based on window size
    const getCardStyle = (size: string, index: number) => {
        const baseWidth = Math.min(dimensions.width * 0.22, 280);
        const basePadding = Math.max(dimensions.width * 0.02, 20);
        const baseHeight = Math.max(dimensions.height * 0.2, 160);

        let width: number;
        let height: number;

        switch (size) {
            case 'large':
                width = baseWidth * 1.15;
                height = baseHeight * 1.25;
                break;
            case 'medium':
                width = baseWidth;
                height = baseHeight;
                break;
            case 'small':
            default:
                width = baseWidth * 0.9;
                height = baseHeight * 0.85;
                break;
        }

        return {
            width: `${width}px`,
            minHeight: `${height}px`,
            padding: `${basePadding}px`,
            backgroundColor: cardColors[index % 2],
        };
    };

    const positionClasses = position === 'top-right'
        ? 'right-6 top-6'
        : 'left-6 top-6';

    // Calculate positions for smooth animation
    const clipPathOrigin = position === 'top-right'
        ? `calc(100% - 120px) 50px`
        : `120px 50px`;

    return (
        <>
            {/* Capsule Trigger Button - Hidden when menu is open */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        className={cn('fixed', positionClasses, className)}
                        style={{ zIndex: zIndex + 1 }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="flex items-center gap-4 bg-white rounded-full shadow-xl overflow-hidden px-6 py-4"
                            style={{ boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)' }}
                            whileHover={{ boxShadow: '0 12px 50px rgba(0, 0, 0, 0.18)' }}
                        >
                            <img
                                src={logoSrc}
                                alt={logoAlt}
                                className="h-10 w-auto object-contain"
                            />
                            <div className="flex flex-col">
                                <span className="text-base font-bold text-black tracking-tight leading-tight">
                                    {companyName}
                                </span>
                                <span className="text-[9px] font-light tracking-[0.25em] text-gray-500 uppercase">
                                    {tagline}
                                </span>
                            </div>
                            <div className="w-px h-10 bg-gray-200" />
                            <button
                                onClick={toggleMenu}
                                className="flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 hover:bg-gray-100"
                                aria-label="Open menu"
                            >
                                <div className="relative w-6 h-6 flex flex-col items-center justify-center">
                                    <span className="absolute h-0.5 w-6 bg-black rounded-full" style={{ transform: 'translateY(-5px)' }} />
                                    <span className="absolute h-0.5 w-6 bg-black rounded-full" />
                                    <span className="absolute h-0.5 w-6 bg-black rounded-full" style={{ transform: 'translateY(5px)' }} />
                                </div>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Fullscreen Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={overlayRef}
                        className="fixed inset-0 flex flex-col bg-white"
                        style={{ zIndex }}
                        initial={{ clipPath: `circle(0% at ${clipPathOrigin})` }}
                        animate={{ clipPath: `circle(150% at ${clipPathOrigin})` }}
                        exit={{ clipPath: `circle(0% at ${clipPathOrigin})` }}
                        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        {/* Close Button - Clean white circle */}
                        <motion.button
                            onClick={toggleMenu}
                            className={cn(
                                'fixed flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-lg border border-gray-100',
                                'hover:bg-gray-50 transition-colors z-10',
                                position === 'top-right' ? 'right-6 top-6' : 'left-6 top-6'
                            )}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 25 }}
                            aria-label="Close menu"
                        >
                            <X className="w-6 h-6 text-black" />
                        </motion.button>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto overflow-x-hidden">
                            <div
                                className="min-h-full flex flex-col items-center"
                                style={{
                                    paddingTop: Math.max(dimensions.height * 0.08, 60),
                                    paddingBottom: Math.max(dimensions.height * 0.06, 40),
                                    paddingLeft: Math.max(dimensions.width * 0.04, 24),
                                    paddingRight: Math.max(dimensions.width * 0.04, 24),
                                }}
                            >
                                {/* Header with Large Logo */}
                                <motion.div
                                    className="flex flex-col items-center"
                                    style={{ marginBottom: Math.max(dimensions.height * 0.06, 48) }}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                >
                                    <img
                                        src={logoSrc}
                                        alt={logoAlt}
                                        style={{
                                            width: Math.min(dimensions.width * 0.18, dimensions.height * 0.22, 180),
                                            height: 'auto',
                                            marginBottom: Math.max(dimensions.height * 0.02, 16),
                                        }}
                                    />
                                    <h1
                                        className="font-bold text-black tracking-tight"
                                        style={{
                                            fontSize: Math.min(dimensions.width * 0.045, 56),
                                            fontFamily: 'Inter, sans-serif',
                                        }}
                                    >
                                        {companyName}
                                    </h1>
                                    <p
                                        className="font-light text-gray-400 uppercase"
                                        style={{
                                            fontSize: Math.min(dimensions.width * 0.012, 14),
                                            letterSpacing: '0.4em',
                                            marginTop: 4,
                                            fontFamily: 'Inter, sans-serif',
                                        }}
                                    >
                                        {tagline}
                                    </p>
                                </motion.div>

                                {/* Cards Container - Flowing layout */}
                                <div
                                    className="flex flex-wrap justify-center items-start"
                                    style={{
                                        gap: Math.max(dimensions.width * 0.015, 12),
                                        maxWidth: Math.min(dimensions.width * 0.92, 1400),
                                    }}
                                >
                                    {navigationSections.map((section, index) => (
                                        <motion.div
                                            key={section.title}
                                            className="rounded-2xl flex flex-col"
                                            style={getCardStyle(section.size, index)}
                                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{
                                                delay: 0.25 + index * 0.06,
                                                duration: 0.4,
                                                ease: [0.25, 0.46, 0.45, 0.94]
                                            }}
                                            whileHover={{
                                                scale: 1.03,
                                                transition: { duration: 0.2 }
                                            }}
                                        >
                                            <h2
                                                className="font-medium text-white"
                                                style={{
                                                    fontSize: Math.min(dimensions.width * 0.018, 22),
                                                    marginBottom: 'auto',
                                                    paddingBottom: Math.max(dimensions.height * 0.025, 20),
                                                }}
                                            >
                                                {section.title}
                                            </h2>

                                            <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                                {section.links.map((link) => (
                                                    <li key={link.label}>
                                                        <a
                                                            href={link.href}
                                                            className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
                                                        >
                                                            <ArrowUpRight
                                                                style={{
                                                                    width: Math.min(dimensions.width * 0.014, 16),
                                                                    height: Math.min(dimensions.width * 0.014, 16),
                                                                }}
                                                                className="opacity-70 group-hover:opacity-100 transition-opacity"
                                                            />
                                                            <span style={{ fontSize: Math.min(dimensions.width * 0.013, 15) }}>
                                                                {link.label}
                                                            </span>
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Footer */}
                                <motion.div
                                    className="text-center"
                                    style={{ marginTop: Math.max(dimensions.height * 0.06, 48) }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    <p className="text-sm text-gray-400">
                                        © {new Date().getFullYear()} {companyName}. All rights reserved.
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default CapsuleNav;
export { CapsuleNav };
