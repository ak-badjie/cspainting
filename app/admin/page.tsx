"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    Package,
    FolderOpen,
    Settings,
    LogOut,
    Plus,
    TrendingUp,
    ArrowRight
} from "lucide-react";
import { getProducts, getCategories, type Product, type Category } from "@/lib/firestore";

export default function AdminDashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        // Check auth
        const auth = localStorage.getItem("admin_auth");
        if (!auth) {
            router.push("/admin/login");
            return;
        }

        // Load data
        const loadData = async () => {
            try {
                const [prods, cats] = await Promise.all([
                    getProducts(),
                    getCategories()
                ]);
                setProducts(prods);
                setCategories(cats);
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("admin_auth");
        router.push("/admin/login");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 bottom-0 w-64 bg-gray-900 text-white">
                <div className="p-6 border-b border-gray-800">
                    <Image
                        src="/logo.png"
                        alt="CS Painting"
                        width={120}
                        height={40}
                        className="brightness-0 invert"
                    />
                    <p className="text-gray-500 text-xs mt-2">Admin Portal</p>
                </div>

                <nav className="p-4 space-y-1">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-900 text-white"
                    >
                        <TrendingUp className="w-5 h-5" />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/products"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                        <Package className="w-5 h-5" />
                        Products
                    </Link>
                    <Link
                        href="/admin/categories"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                        <FolderOpen className="w-5 h-5" />
                        Categories
                    </Link>
                    <Link
                        href="/admin/settings"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                        <Settings className="w-5 h-5" />
                        Settings
                    </Link>
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-900/50 hover:text-red-400 transition-colors w-full"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-gray-500">Welcome back, Admin</p>
                    </div>
                    <Link
                        href="/admin/products?action=add"
                        className="bg-blue-900 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-blue-800 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Add Product
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Package className="w-7 h-7 text-blue-900" />
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-gray-900">{products.length}</p>
                                <p className="text-gray-500 text-sm">Total Products</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <FolderOpen className="w-7 h-7 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-gray-900">{categories.length}</p>
                                <p className="text-gray-500 text-sm">Categories</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                                <TrendingUp className="w-7 h-7 text-green-600" />
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-gray-900">
                                    {Math.round(products.length / (categories.length || 1))}
                                </p>
                                <p className="text-gray-500 text-sm">Avg per Category</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Link
                        href="/admin/products"
                        className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg mb-1">Manage Products</h3>
                                <p className="text-gray-500 text-sm">Add, edit, or remove products</p>
                            </div>
                            <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-blue-900 group-hover:translate-x-1 transition-all" />
                        </div>
                    </Link>

                    <Link
                        href="/admin/categories"
                        className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg mb-1">Manage Categories</h3>
                                <p className="text-gray-500 text-sm">Organize your product categories</p>
                            </div>
                            <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-blue-900 group-hover:translate-x-1 transition-all" />
                        </div>
                    </Link>
                </div>

                {/* Recent Products */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b flex items-center justify-between">
                        <h3 className="font-bold text-gray-900">Recent Products</h3>
                        <Link href="/admin/products" className="text-blue-900 text-sm font-medium hover:underline">
                            View All
                        </Link>
                    </div>
                    <div className="divide-y">
                        {products.slice(0, 5).map((product) => (
                            <div key={product.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden relative">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <p className="font-medium text-gray-900">{product.name}</p>
                                    <p className="text-sm text-gray-500">{product.brand}</p>
                                </div>
                                <Link
                                    href={`/admin/products?edit=${product.id}`}
                                    className="text-blue-900 text-sm font-medium hover:underline"
                                >
                                    Edit
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
