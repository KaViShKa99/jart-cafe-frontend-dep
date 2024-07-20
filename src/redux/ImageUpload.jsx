import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase"; // Adjust the import based on your setup

export const uploadFiles = async (files) => {
  try {
    const urls = await Promise.all(
      files.map(async (file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        return url;
      })
    );
    return urls;
  } catch (error) {
    console.error("Error uploading images:", error);
    return [];
  }
};
