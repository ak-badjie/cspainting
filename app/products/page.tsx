"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    Home,
    Building2,
    Droplets,
    Wrench,
    Sparkles,
    TreeDeciduous,
    Factory,
    Palette,
    Cog,
    Sofa,
    Package,
    Search,
    X,
    Menu,
    ArrowLeft,
    Loader2
} from "lucide-react";
import { getProducts, getCategories, type Product, type Category } from "@/lib/firestore";

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Home, Building2, Droplets, Wrench, Sparkles, TreeDeciduous, Factory, Palette, Cog, Sofa
};

export default function ProductsPage() {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [cats, prods] = await Promise.all([
                    getCategories(),
                    getProducts()
                ]);
                setCategories(cats);
                setProducts(prods);
            } catch (error) {
                console.error("Error loading products:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const totalProducts = products.length;

    // Filter products based on category and search
    const getFilteredData = () => {
        let filteredProducts = activeCategory
            ? products.filter(p => p.categoryId === activeCategory)
            : products;

        if (searchQuery.trim()) {
            filteredProducts = filteredProducts.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.brand.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Group by category
        const grouped = categories
            .filter(cat => !activeCategory || cat.id === activeCategory)
            .map(cat => ({
                ...cat,
                products: filteredProducts.filter(p => p.categoryId === cat.id)
            }))
            .filter(cat => cat.products.length > 0);

        return grouped;
    };

    const filteredCategories = getFilteredData();
    const displayedProductCount = filteredCategories.reduce((acc, cat) => acc + cat.products.length, 0);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-blue-900 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading products...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
            {/* Fixed Top Bar */}
            <header className="flex-shrink-0 bg-white border-b border-gray-200 z-50">
                <div className="flex items-center justify-between px-6 h-16">
                    {/* Left: Logo & Back */}
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-3 text-gray-600 hover:text-blue-900 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                            <Image src="/logo.png" alt="CS Painting Gambia" width={120} height={40} className="object-contain" />
                        </Link>
                    </div>

                    {/* Center: Search */}
                    <div className="flex-grow max-w-xl mx-8">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-10 py-3 bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Right: Info & Mobile Menu */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:block text-right">
                            <p className="text-sm font-semibold text-gray-900">{displayedProductCount} Products</p>
                            <p className="text-xs text-gray-500">{categories.length} Categories</p>
                        </div>
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex-grow flex overflow-hidden">
                {/* Fixed Sidebar - Desktop */}
                <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-gray-200 flex-shrink-0">
                    <div className="p-5 border-b border-gray-100">
                        <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Filter by Category</h2>
                    </div>

                    <div className="flex-grow overflow-y-auto p-4">
                        {/* All Products Button */}
                        <button
                            onClick={() => setActiveCategory(null)}
                            className={`w-full text-left px-4 py-3.5 rounded-2xl mb-3 transition-all font-medium ${activeCategory === null
                                    ? "bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg shadow-blue-900/25"
                                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            <span className="flex items-center gap-3">
                                <Package className="w-5 h-5" />
                                <span>All Products</span>
                                <span className={`ml-auto text-xs px-2.5 py-1 rounded-full font-semibold ${activeCategory === null ? "bg-white/20" : "bg-gray-200"
                                    }`}>
                                    {totalProducts}
                                </span>
                            </span>
                        </button>

                        {/* Separator */}
                        <div className="h-px bg-gray-200 my-4" />

                        {/* Category Buttons */}
                        <div className="space-y-2">
                            {categories.map((category) => {
                                const IconComponent = iconMap[category.icon] || Package;
                                const count = products.filter(p => p.categoryId === category.id).length;
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id!)}
                                        className={`w-full text-left px-4 py-3.5 rounded-2xl transition-all ${activeCategory === category.id
                                                ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 shadow-lg shadow-yellow-500/25 font-medium"
                                                : "text-gray-600 hover:bg-gray-50"
                                            }`}
                                    >
                                        <span className="flex items-center gap-3">
                                            <IconComponent className="w-5 h-5 flex-shrink-0" />
                                            <span className="text-sm truncate">{category.name}</span>
                                            <span className={`ml-auto text-xs px-2.5 py-1 rounded-full font-semibold flex-shrink-0 ${activeCategory === category.id ? "bg-white/50" : "bg-gray-100"
                                                }`}>
                                                {count}
                                            </span>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Partner Badges */}
                    <div className="p-4 border-t border-gray-100 bg-gray-50">
                        <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wider">Official Partners</p>
                        <div className="space-y-2">
                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-900 text-xs font-medium px-4 py-2.5 rounded-xl flex items-center gap-2">
                                <span className="text-sm">🇪🇸</span> Montó Pinturas
                            </div>
                            <div className="bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 text-xs font-medium px-4 py-2.5 rounded-xl flex items-center gap-2">
                                <span className="text-sm">🇺🇸</span> Graco Equipment
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Mobile Sidebar Overlay */}
                {mobileMenuOpen && (
                    <div className="lg:hidden fixed inset-0 z-50">
                        <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
                        <aside className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-xl overflow-y-auto">
                            <div className="p-4 border-b flex items-center justify-between">
                                <h2 className="font-bold text-gray-900">Categories</h2>
                                <button onClick={() => setMobileMenuOpen(false)}><X className="w-6 h-6" /></button>
                            </div>
                            <div className="p-4">
                                <button
                                    onClick={() => { setActiveCategory(null); setMobileMenuOpen(false); }}
                                    className={`w-full text-left px-4 py-3 rounded-xl mb-2 flex items-center gap-3 ${activeCategory === null ? "bg-blue-900 text-white" : "hover:bg-gray-100"
                                        }`}
                                >
                                    <Package className="w-5 h-5" /> All Products ({totalProducts})
                                </button>
                                {categories.map((category) => {
                                    const IconComponent = iconMap[category.icon] || Package;
                                    const count = products.filter(p => p.categoryId === category.id).length;
                                    return (
                                        <button
                                            key={category.id}
                                            onClick={() => { setActiveCategory(category.id!); setMobileMenuOpen(false); }}
                                            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 ${activeCategory === category.id ? "bg-yellow-500 text-gray-900" : "hover:bg-gray-100"
                                                }`}
                                        >
                                            <IconComponent className="w-5 h-5" /> {category.name} ({count})
                                        </button>
                                    );
                                })}
                            </div>
                        </aside>
                    </div>
                )}

                {/* Scrollable Content Area */}
                <main className="flex-grow overflow-y-auto">
                    <div className="p-6">
                        {filteredCategories.length === 0 ? (
                            <div className="text-center py-20">
                                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                            </div>
                        ) : (
                            filteredCategories.map((category, catIndex) => {
                                const IconComponent = iconMap[category.icon] || Package;
                                return (
                                    <section key={category.id} className="mb-12">
                                        {/* Category Header with Line */}
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-14 h-14 bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                                                <IconComponent className="w-7 h-7 text-white" />
                                            </div>
                                            <div className="flex-grow">
                                                <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
                                                <p className="text-sm text-gray-500">{category.products.length} products available</p>
                                            </div>
                                            <div className="hidden md:block h-px flex-grow bg-gradient-to-r from-gray-300 to-transparent max-w-xs" />
                                        </div>

                                        {/* Products Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                                            {category.products.map((product, index) => (
                                                <div
                                                    key={product.id || index}
                                                    className="bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group border border-gray-100"
                                                >
                                                    {/* Product Image */}
                                                    <div className="h-48 relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                                                        <Image
                                                            src={product.image}
                                                            alt={product.name}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                        <div className="absolute top-4 left-4 bg-blue-900 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                                            {product.brand}
                                                        </div>
                                                    </div>

                                                    {/* Product Details */}
                                                    <div className="p-5">
                                                        <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-900 transition-colors line-clamp-1">
                                                            {product.name}
                                                        </h3>
                                                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                                            {product.description}
                                                        </p>

                                                        {/* Sizes */}
                                                        <div className="flex flex-wrap gap-2 mb-4">
                                                            {product.sizes.map((size, i) => (
                                                                <span key={i} className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">
                                                                    {size}
                                                                </span>
                                                            ))}
                                                        </div>

                                                        {/* Action Button */}
                                                        <Link
                                                            href="/#contact"
                                                            className="block w-full text-center bg-gradient-to-r from-gray-100 to-gray-50 hover:from-blue-900 hover:to-blue-800 hover:text-white text-gray-700 font-semibold py-3 rounded-2xl transition-all duration-300"
                                                        >
                                                            Inquire Now
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Category Separator */}
                                        {catIndex < filteredCategories.length - 1 && (
                                            <div className="mt-12 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                                        )}
                                    </section>
                                );
                            })
                        )}

                        {/* Bottom CTA */}
                        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-3xl p-10 text-center text-white mt-8 shadow-xl shadow-blue-900/20">
                            <h3 className="text-2xl font-bold mb-3">Need Help Choosing?</h3>
                            <p className="text-blue-200 mb-6">Visit our showroom in Brusubi Phase 2 for expert advice</p>
                            <Link
                                href="/#contact"
                                className="inline-block bg-yellow-500 text-gray-900 font-bold px-10 py-4 rounded-full hover:bg-yellow-400 transition-colors shadow-lg"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
