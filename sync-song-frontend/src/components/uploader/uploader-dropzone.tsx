import { cn } from "@/lib/utils";
import { Music } from "lucide-react";
import { useDropzone } from "react-dropzone";

const UploaderDropzone = ({ onDrop }: { onDrop: (files: File[]) => void }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "audio/*": [".mp3", ".wav", ".ogg", ".flac", ".aac"],
    },
    maxSize: 10 * 1024 * 1024,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors",
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/70 hover:border-primary/50 hover:bg-muted/50"
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="rounded-full bg-primary/10 p-4">
          <Music className="size-10 text-primary" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="font-semibold text-lg">
            Arrastra tus archivos de música aquí
          </h3>
          <p className="text-sm text-muted-foreground">
            O haz clic para seleccionar archivos
          </p>
          <p className="text-xs text-muted-foreground">
            MP3, WAV, OGG, FLAC, AAC (máx. 10MB)
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploaderDropzone;
