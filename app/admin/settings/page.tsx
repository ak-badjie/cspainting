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
    TrendingUp,
    Save,
    Key,
    User,
    Check
} from "lucide-react";
import { getAdminCredentials, setAdminCredentials } from "@/lib/firestore";

export default function AdminSettingsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: ""
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
            const creds = await getAdminCredentials();
            if (creds) {
                setFormData(prev => ({ ...prev, username: creds.username }));
            }
        } catch (error) {
            console.error("Error loading credentials:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("admin_auth");
        router.push("/admin/login");
    };

    const handleSave = async () => {
        if (!formData.username) {
            alert("Username is required");
            return;
        }

        if (formData.password && formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        setSaving(true);
        setSuccess(false);

        try {
            const currentCreds = await getAdminCredentials();
            await setAdminCredentials({
                username: formData.username,
                password: formData.password || currentCreds?.password || "admin"
            });

            // Update localStorage
            localStorage.setItem("admin_auth", JSON.stringify({ username: formData.username, loggedIn: true }));

            setSuccess(true);
            setFormData(prev => ({ ...prev, password: "", confirmPassword: "" }));

            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            console.error("Error saving credentials:", error);
            alert("Error saving credentials. Please try again.");
        } finally {
            setSaving(false);
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
                    <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
                        <FolderOpen className="w-5 h-5" /> Categories
                    </Link>
                    <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-900 text-white">
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
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                    <p className="text-gray-500">Manage your admin credentials</p>
                </div>

                {/* Settings Form */}
                <div className="max-w-xl">
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Key className="w-5 h-5" />
                            Admin Credentials
                        </h2>

                        {success && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
                                <Check className="w-5 h-5" />
                                Credentials updated successfully!
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <User className="w-4 h-4 inline mr-1" />
                                    Username
                                </label>
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Key className="w-4 h-4 inline mr-1" />
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Leave blank to keep current password"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    placeholder="Confirm new password"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                                />
                            </div>

                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="w-full bg-blue-900 text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-800 transition-colors disabled:opacity-50"
                            >
                                <Save className="w-5 h-5" />
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
