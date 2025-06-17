"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const AudioRequestDialog = () => {
  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="bg-purple-950 text-purple-200 gap-8 w-auto">
        <AlertDialogHeader className="gap-4">
          <AlertDialogTitle className="text-center text-2xl">
            Permitir Música
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-base text-balance">
            Esta página necesita acceso para reproducir audio. Toca Continuar
            para disfrutar de la música en tu sala.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mx-auto">
          <AlertDialogAction className="rounded-lg">
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AudioRequestDialog;
