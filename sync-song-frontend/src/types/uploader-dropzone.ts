export type FileStatus = "pending" | "uploading" | "success" | "error";

export interface UploadFile {
  id: string;
  file: File;
  progress: number;
  status: FileStatus;
  error?: string;
}