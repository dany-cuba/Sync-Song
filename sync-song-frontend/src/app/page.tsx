import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Music, PlusCircle, Users } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 text-center">
        <div className="max-w-3xl">
          <h2 className="mb-6 text-5xl font-bold text-white md:text-6xl">
            Escucha música en sincronía con tus amigos
          </h2>
          <p className="mb-12 text-xl text-purple-100">
            Crea una sala, invita a tus amigos y disfruten juntos de la misma
            música en tiempo real.
          </p>

          <div className="flex flex-col sm:w-min mx-auto gap-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button className="bg-white text-purple-900 hover:bg-purple-100 p-0 h-fit">
                <Link
                  className="flex items-center justify-center gap-2 px-8 h-11"
                  href={ROUTES.createRoom}
                >
                  <PlusCircle className="size-5" />
                  Crear una sala
                </Link>
              </Button>

              <Button
                className="border border-white text-white p-0 h-fit"
                variant={"outline"}
              >
                <Link
                  className="flex items-center justify-center gap-2 px-8 h-11"
                  href={ROUTES.joinRoom}
                >
                  <Users className="size-5" />
                  Unirse a una sala
                </Link>
              </Button>
            </div>
            <Button className="border bg-white/10 border-white text-white hover:bg-transparent p-0 h-fit">
              <Link
                className="flex items-center justify-center gap-2 w-full rounded-md h-11"
                href={ROUTES.uploadMusic}
              >
                <Music className="size-5" />
                Agregar música
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-20 flex w-full max-w-4xl justify-center">
          <div className="relative w-full rounded-xl bg-black/30 p-6 backdrop-blur-lg">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 transform rounded-full bg-purple-600 p-4 shadow-lg">
              <div className="h-10 w-10 rounded-full bg-white"></div>
            </div>
            <p className="mt-6 text-center text-lg text-white">
              Sincroniza la música que amas con las personas que te importan
            </p>
          </div>
        </div>
      </main>

      <footer className="container mx-auto py-6">
        <p className="text-center text-sm text-purple-200">
          © {new Date().getFullYear()} Sync Song. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
