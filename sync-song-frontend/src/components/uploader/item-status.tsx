import { UploadFile } from "@/types/uploader-dropzone";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import React, { JSX } from "react";

const ItemStatus = ({ file }: { file: UploadFile }): JSX.Element => {
  switch (file.status) {
    case "pending":
      return <span className="text-muted-foreground">Pendiente</span>;
    case "uploading":
      return (
        <>
          <Loader2 className="h-3 w-3 animate-spin text-primary" />
          <span>{file.progress}%</span>
        </>
      );
    case "success":
      return (
        <>
          <CheckCircle2 className="h-3 w-3 text-green-500" />
          <span className="text-green-500">Completado</span>
        </>
      );
    case "error":
      return (
        <>
          <AlertCircle className="h-3 w-3 text-destructive" />
          <span className="text-destructive">Error</span>
        </>
      );
  }
};

export default ItemStatus;
