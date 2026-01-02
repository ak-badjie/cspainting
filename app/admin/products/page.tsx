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
    Search,
    Edit2,
    Trash2,
    X,
    Upload,
    Save
} from "lucide-react";
import {
    getProducts,
    getCategories,
    addProduct,
    updateProduct,
    deleteProduct,
    type Product,
    type Category
} from "@/lib/firestore";
import { uploadImage, getImagePath } from "@/lib/storage";

export default function AdminProductsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCategory, setFilterCategory] = useState<string>("");

    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [saving, setSaving] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        sizes: "",
        brand: "",
        image: "",
        categoryId: ""
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState("");

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

    const handleLogout = () => {
        localStorage.removeItem("admin_auth");
        router.push("/admin/login");
    };

    const openAddModal = () => {
        setEditingProduct(null);
        setFormData({ name: "", description: "", sizes: "", brand: "", image: "", categoryId: categories[0]?.id || "" });
        setImageFile(null);
        setImagePreview("");
        setShowModal(true);
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            sizes: product.sizes.join(", "),
            brand: product.brand,
            image: product.image,
            categoryId: product.categoryId
        });
        setImagePreview(product.image);
        setImageFile(null);
        setShowModal(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSave = async () => {
        if (!formData.name || !formData.categoryId) {
            alert("Please fill in all required fields");
            return;
        }

        setSaving(true);
        try {
            let imageUrl = formData.image;

            // Upload new image if selected
            if (imageFile) {
                const path = getImagePath(formData.categoryId, formData.name);
                imageUrl = await uploadImage(imageFile, path);
            }

            const productData = {
                name: formData.name,
                description: formData.description,
                sizes: formData.sizes.split(",").map(s => s.trim()).filter(Boolean),
                brand: formData.brand,
                image: imageUrl,
                categoryId: formData.categoryId
            };

            if (editingProduct?.id) {
                await updateProduct(editingProduct.id, productData);
            } else {
                await addProduct(productData);
            }

            setShowModal(false);
            loadData();
        } catch (error) {
            console.error("Error saving product:", error);
            alert("Error saving product. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (product: Product) => {
        if (!confirm(`Are you sure you want to delete "${product.name}"?`)) return;

        try {
            await deleteProduct(product.id!);
            loadData();
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Error deleting product. Please try again.");
        }
    };

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !filterCategory || p.categoryId === filterCategory;
        return matchesSearch && matchesCategory;
    });

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
                    <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-900 text-white">
                        <Package className="w-5 h-5" /> Products
                    </Link>
                    <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
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
                        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                        <p className="text-gray-500">{products.length} products in catalog</p>
                    </div>
                    <button onClick={openAddModal} className="bg-blue-900 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-blue-800 transition-colors">
                        <Plus className="w-5 h-5" /> Add Product
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl p-4 shadow-sm mb-6 flex gap-4">
                    <div className="flex-grow relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                        />
                    </div>
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 min-w-[200px]"
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-2xl shadow-sm overflow-hidden group">
                            <div className="h-40 relative bg-gray-100">
                                <Image src={product.image} alt={product.name} fill className="object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button onClick={() => openEditModal(product)} className="bg-white text-gray-900 p-2 rounded-lg hover:bg-gray-100">
                                        <Edit2 className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => handleDelete(product)} className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="text-xs text-blue-900 font-medium mb-1">{product.brand}</p>
                                <h3 className="font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                                <p className="text-gray-500 text-sm line-clamp-1">{product.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b flex items-center justify-between">
                            <h2 className="text-xl font-bold">{editingProduct ? "Edit Product" : "Add Product"}</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
                                    {imagePreview ? (
                                        <div className="relative w-full h-40 mb-2">
                                            <Image src={imagePreview} alt="Preview" fill className="object-contain rounded-lg" />
                                        </div>
                                    ) : (
                                        <Upload className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                                    )}
                                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="image-upload" />
                                    <label htmlFor="image-upload" className="text-blue-900 text-sm font-medium cursor-pointer hover:underline">
                                        {imagePreview ? "Change Image" : "Upload Image"}
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                                    <input
                                        type="text"
                                        value={formData.brand}
                                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                                    <select
                                        value={formData.categoryId}
                                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Sizes (comma separated)</label>
                                <input
                                    type="text"
                                    value={formData.sizes}
                                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                                    placeholder="e.g. 4L, 12L, 20L"
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
