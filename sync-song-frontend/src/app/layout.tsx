import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import { Toaster } from "sonner";
import { SocketProvider } from "@/context/socket-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sync Song - Música en sincronía",
  description: "Escucha música en sincronía con tus amigos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" style={{ colorScheme: "dark" }}>
      <body
        className={cn(
          inter.className,
          "flex min-h-screen flex-col bg-gradient-to-br from-purple-900 via-violet-800 to-fuchsia-900 px-4"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SocketProvider>
            {children}
            <Toaster
              position="top-center"
              toastOptions={{
                className: "text-sm",
              }}
            />
          </SocketProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
