"use client";

import { FileStatus, UploadFile } from "@/types/uploader-dropzone";
import { useCallback, useState } from "react";

export function useMusicUploader() {
  const [files, setFiles] = useState<UploadFile[]>([]);

  const getImagekitAuth = async () => {
    const res = await fetch("/api/imagekit-auth");
    if (!res.ok)
      throw new Error("No se pudo obtener el token de autenticación");
    return res.json();
  };

  // Handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      file,
      progress: 0,
      status: "pending" as FileStatus,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  // Handle file removal
  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  // Handle file upload
  const uploadFile = async (fileItem: UploadFile) => {
    if (fileItem.status === "uploading" || fileItem.status === "success")
      return;

    setFiles((prev) =>
      prev.map((file) =>
        file.id === fileItem.id ? { ...file, status: "uploading" } : file
      )
    );

    try {
      const auth = await getImagekitAuth();

      const formData = new FormData();
      formData.append("file", fileItem.file);
      formData.append("fileName", fileItem.file.name);
      formData.append(
        "publicKey",
        process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!
      );
      formData.append("signature", auth.signature);
      formData.append("expire", auth.expire);
      formData.append("token", auth.token);

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded * 100) / event.total);
          setFiles((prev) =>
            prev.map((file) =>
              file.id === fileItem.id ? { ...file, progress } : file
            )
          );
        }
      });

      const uploadPromise = new Promise<void>((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
          } else {
            reject(new Error(`Error ${xhr.status}: ${xhr.statusText}`));
          }
        };
        xhr.onerror = () => reject(new Error("Error de red"));
      });

      xhr.open("POST", "https://upload.imagekit.io/api/v1/files/upload", true);
      xhr.send(formData);

      await uploadPromise;
      await new Promise((r) => setTimeout(r, 500));

      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileItem.id ? { ...f, status: "success", progress: 100 } : f
        )
      );
    } catch (error: any) {
      setFiles((prev) =>
        prev.map((file) =>
          file.id === fileItem.id
            ? {
                ...file,
                status: "error",
                error: error.message || "Error desconocido",
              }
            : file
        )
      );
    }
  };

  // Handle upload of all pending files
  const uploadAllPending = () => {
    files
      .filter((file) => file.status === "pending")
      .forEach((file) => uploadFile(file));
  };

  return {
    files,
    onDrop,
    uploadFile,
    uploadAllPending,
    removeFile,
  };
}
