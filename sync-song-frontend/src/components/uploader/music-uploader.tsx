"use client";

import { Button } from "@/components/ui/button";
import { useMusicUploader } from "@/hooks/use-music-uploader";
import { Upload } from "lucide-react";
import UploadedItem from "./uploaded-item";
import UploaderDropzone from "./uploader-dropzone";

export function MusicUploader() {
  const { files, onDrop, uploadAllPending, uploadFile, removeFile } =
    useMusicUploader();

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <UploaderDropzone onDrop={onDrop} />

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Archivos ({files.length})</h3>
            <Button
              size="sm"
              onClick={uploadAllPending}
              disabled={!files.some((file) => file.status === "pending")}
            >
              <Upload className="h-4 w-4 mr-2" />
              Subir todos
            </Button>
          </div>

          <div className="space-y-3">
            {files.map((file) => (
              <UploadedItem
                key={file.id}
                file={file}
                onUpload={uploadFile}
                onRemove={removeFile}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
