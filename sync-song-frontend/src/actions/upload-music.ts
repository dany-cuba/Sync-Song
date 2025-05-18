'use server';

import { imagekit } from '@/lib/imagekit';

export async function uploadMusic(formData: FormData) {
  const file = formData.get('file') as File | null;
  const fileName = formData.get('fileName') as string | null;

  if (!file || !fileName) {
    throw new Error('Faltan datos del archivo');
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const result = await imagekit.upload({
      file: buffer, // puede ser Buffer, base64 o URL
      fileName,
    });

    console.log('Resultado de la subida:', result);

    return {
      success: true,
      url: result.url,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Error desconocido al subir',
    };
  }
}
