import { UploadFile } from "@/types/uploader-dropzone";
import { Music, Upload, X } from "lucide-react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import ItemStatus from "./item-status";

const UploadedItem = ({
  file,
  onUpload,
  onRemove,
}: {
  file: UploadFile;
  onUpload: (file: UploadFile) => void;
  onRemove: (id: string) => void;
}) => {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg border bg-card">
      <div className="rounded-md bg-primary/10 p-2">
        <Music className="h-5 w-5 text-primary" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <div className="truncate font-medium text-sm">{file.file.name}</div>
          <div className="flex items-center gap-2">
            {file.status === "pending" && (
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                onClick={() => onUpload(file)}
              >
                <Upload className="h-4 w-4" />
              </Button>
            )}
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              onClick={() => onRemove(file.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Progress value={file.progress} className="h-2 flex-1" />
          <div className="flex items-center gap-1.5 min-w-[90px] text-xs">
            <ItemStatus key={file.id} file={file} />
          </div>
        </div>

        {file.status === "error" && file.error && (
          <p className="text-xs text-destructive mt-1">{file.error}</p>
        )}
      </div>
    </div>
  );
};

export default UploadedItem;
