import { MusicUploader } from "@/components/uploader/music-uploader";

export default function Home() {
  return (
    <main className="container py-10 mx-auto">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Subida de Archivos de Música</h1>
          <p className="text-muted-foreground">
            Arrastra y suelta tus archivos de música para subirlos
          </p>
        </div>

        <MusicUploader />
      </div>
    </main>
  );
}
