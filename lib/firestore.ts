import { db } from "./firebase";
import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    setDoc,
} from "firebase/firestore";

// Types
export interface Product {
    id?: string;
    name: string;
    description: string;
    sizes: string[];
    brand: string;
    image: string;
    categoryId: string;
}

export interface Category {
    id?: string;
    name: string;
    icon: string;
    description: string;
    order: number;
}

export interface AdminCredentials {
    username: string;
    password: string;
}

// ============ PRODUCTS ============

export async function getProducts(): Promise<Product[]> {
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Product[];
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
    const products = await getProducts();
    return products.filter((p) => p.categoryId === categoryId);
}

export async function addProduct(product: Omit<Product, "id">): Promise<string> {
    const productsRef = collection(db, "products");
    const docRef = await addDoc(productsRef, product);
    return docRef.id;
}

export async function updateProduct(id: string, product: Partial<Product>): Promise<void> {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, product);
}

export async function deleteProduct(id: string): Promise<void> {
    const productRef = doc(db, "products", id);
    await deleteDoc(productRef);
}

// ============ CATEGORIES ============

export async function getCategories(): Promise<Category[]> {
    const categoriesRef = collection(db, "categories");
    const q = query(categoriesRef, orderBy("order"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Category[];
}

export async function addCategory(category: Omit<Category, "id">): Promise<string> {
    const categoriesRef = collection(db, "categories");
    const docRef = await addDoc(categoriesRef, category);
    return docRef.id;
}

export async function updateCategory(id: string, category: Partial<Category>): Promise<void> {
    const categoryRef = doc(db, "categories", id);
    await updateDoc(categoryRef, category);
}

export async function deleteCategory(id: string): Promise<void> {
    const categoryRef = doc(db, "categories", id);
    await deleteDoc(categoryRef);
}

// ============ ADMIN CREDENTIALS ============

export async function getAdminCredentials(): Promise<AdminCredentials | null> {
    const adminRef = doc(db, "settings", "admin");
    const snapshot = await getDoc(adminRef);
    if (snapshot.exists()) {
        return snapshot.data() as AdminCredentials;
    }
    return null;
}

export async function setAdminCredentials(credentials: AdminCredentials): Promise<void> {
    const adminRef = doc(db, "settings", "admin");
    await setDoc(adminRef, credentials);
}

export async function validateAdmin(username: string, password: string): Promise<boolean> {
    const credentials = await getAdminCredentials();
    if (!credentials) {
        // Default credentials if not set
        return username === "admin" && password === "admin";
    }
    return credentials.username === username && credentials.password === password;
}
