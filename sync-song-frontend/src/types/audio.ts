type Song = {
  name: string
  url: string
  mime: string
  size: number
  createdAt: string
  fileId: string
  embeddedMetadata?: {
    Artist?: string
    Title?: string
  }
  thumbnail?: string
  isPrivateFile: boolean
};

export type { Song };
