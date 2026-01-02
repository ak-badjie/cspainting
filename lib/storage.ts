import { storage } from "./firebase";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";

export async function uploadImage(file: File, path: string): Promise<string> {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
}

export async function uploadImageFromBlob(blob: Blob, path: string): Promise<string> {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
}

export async function deleteImage(path: string): Promise<void> {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
}

export function getImagePath(categoryId: string, productName: string): string {
    const sanitizedName = productName.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
    return `products/${categoryId}/${sanitizedName}_${Date.now()}.jpg`;
}
