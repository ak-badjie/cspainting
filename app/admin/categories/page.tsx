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
    Edit2,
    Trash2,
    X,
    Save,
    GripVertical
} from "lucide-react";
import {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    getProducts,
    type Category
} from "@/lib/firestore";

const iconOptions = [
    "Home", "Building2", "Droplets", "Wrench", "Sparkles",
    "TreeDeciduous", "Factory", "Palette", "Cog", "Sofa"
];

export default function AdminCategoriesPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);
    const [productCounts, setProductCounts] = useState<Record<string, number>>({});

    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [saving, setSaving] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        name: "",
        icon: "Home",
        description: "",
        order: 1
    });

    useEffect(() => {
        const auth = localStorage.getItem("admin_auth");
        if (!auth) {
            router.push("/admin/login");
            return;
        }
        loadData();
    }, [router]);

    const loadData = async () => {
        try {
            const [cats, prods] = await Promise.all([
                getCategories(),
                getProducts()
            ]);
            setCategories(cats);

            // Count products per category
            const counts: Record<string, number> = {};
            prods.forEach(p => {
                counts[p.categoryId] = (counts[p.categoryId] || 0) + 1;
            });
            setProductCounts(counts);
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("admin_auth");
        router.push("/admin/login");
    };

    const openAddModal = () => {
        setEditingCategory(null);
        setFormData({ name: "", icon: "Home", description: "", order: categories.length + 1 });
        setShowModal(true);
    };

    const openEditModal = (category: Category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            icon: category.icon,
            description: category.description,
            order: category.order
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!formData.name) {
            alert("Please enter a category name");
            return;
        }

        setSaving(true);
        try {
            if (editingCategory?.id) {
                await updateCategory(editingCategory.id, formData);
            } else {
                await addCategory(formData);
            }
            setShowModal(false);
            loadData();
        } catch (error) {
            console.error("Error saving category:", error);
            alert("Error saving category. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (category: Category) => {
        const count = productCounts[category.id!] || 0;
        if (count > 0) {
            alert(`Cannot delete category with ${count} products. Remove products first.`);
            return;
        }

        if (!confirm(`Are you sure you want to delete "${category.name}"?`)) return;

        try {
            await deleteCategory(category.id!);
            loadData();
        } catch (error) {
            console.error("Error deleting category:", error);
            alert("Error deleting category. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 bottom-0 w-64 bg-gray-900 text-white">
                <div className="p-6 border-b border-gray-800">
                    <Image src="/logo.png" alt="CS Painting" width={120} height={40} className="brightness-0 invert" />
                    <p className="text-gray-500 text-xs mt-2">Admin Portal</p>
                </div>
                <nav className="p-4 space-y-1">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
                        <TrendingUp className="w-5 h-5" /> Dashboard
                    </Link>
                    <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
                        <Package className="w-5 h-5" /> Products
                    </Link>
                    <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-900 text-white">
                        <FolderOpen className="w-5 h-5" /> Categories
                    </Link>
                    <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
                        <Settings className="w-5 h-5" /> Settings
                    </Link>
                </nav>
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-900/50 hover:text-red-400 transition-colors w-full">
                        <LogOut className="w-5 h-5" /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
                        <p className="text-gray-500">{categories.length} categories</p>
                    </div>
                    <button onClick={openAddModal} className="bg-blue-900 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-blue-800 transition-colors">
                        <Plus className="w-5 h-5" /> Add Category
                    </button>
                </div>

                {/* Categories List */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="divide-y">
                        {categories.map((category) => (
                            <div key={category.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
                                <GripVertical className="w-5 h-5 text-gray-300" />
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-900 font-bold">
                                    {category.order}
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-bold text-gray-900">{category.name}</h3>
                                    <p className="text-sm text-gray-500">{category.description}</p>
                                </div>
                                <div className="text-center px-4">
                                    <p className="text-2xl font-bold text-gray-900">{productCounts[category.id!] || 0}</p>
                                    <p className="text-xs text-gray-500">products</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => openEditModal(category)} className="p-2 text-gray-400 hover:text-blue-900 hover:bg-blue-50 rounded-lg">
                                        <Edit2 className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => handleDelete(category)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md">
                        <div className="p-6 border-b flex items-center justify-between">
                            <h2 className="text-xl font-bold">{editingCategory ? "Edit Category" : "Add Category"}</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                                <select
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                                >
                                    {iconOptions.map(icon => (
                                        <option key={icon} value={icon}>{icon}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={2}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                                />
                            </div>
                        </div>

                        <div className="p-6 border-t flex gap-3">
                            <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50">
                                Cancel
                            </button>
                            <button onClick={handleSave} disabled={saving} className="flex-1 bg-blue-900 text-white px-4 py-3 rounded-xl font-medium hover:bg-blue-800 disabled:opacity-50 flex items-center justify-center gap-2">
                                <Save className="w-5 h-5" />
                                {saving ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
