import {ID, storage} from "../appwrite";
import * as process from "process";

export const uploadImage = async (file: File) => {
    if (!file) return;

    const fileUploaded = await storage.createFile(
        process.env.NEXT_PUBLIC_IMG_STORAGE_ID!,
        ID.unique(),
        file
    )

    return fileUploaded;
}
