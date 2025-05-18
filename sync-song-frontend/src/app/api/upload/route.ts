import { imagekit } from "@/lib/imagekit";

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get("file") as File | null; // puede ser base64 o un buffer
  const fileName = data.get("fileName") as string | null;

  if (!file || !fileName) {
    return new Response(JSON.stringify({ error: "Faltan datos" }), {
      status: 400,
    });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const result = await imagekit.upload({
      file: buffer,
      fileName: fileName,
    });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || "Error desconocido" }), {
      status: 500,
    });
  }
}
