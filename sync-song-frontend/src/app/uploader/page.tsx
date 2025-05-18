'use client';

import { useState } from 'react';
// import { uploadMusic } from '@/actions/upload-music';

export default function UploadForm() {
  const [audioUrl, setAudioUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const fileInput = form.file as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (!file) return setError('Selecciona un archivo de audio');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      setAudioUrl(data.url!);
      setError('');
    } else {
      const errorData = await res.json();
      setError(errorData.error || 'Algo salió mal al subir');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        name="file"
        accept="audio/*"
        required
      />
      <button type="submit">Subir música</button>

      {error && <p className="text-red-500">{error}</p>}

      {audioUrl && (
        <audio controls className="mt-4">
          <source src={audioUrl} />
          Tu navegador no soporta la reproducción de audio.
        </audio>
      )}
    </form>
  );
}
