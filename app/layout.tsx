"use client";
import { metadata } from "@/lib/metadata";
import "./globals.css";
import { Provider } from "react-redux";

import { store } from "@/store";

import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/layout/Header";
import { AuthProvider } from "./providers/AuthProvider";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/auth";
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>

      <body>
        <Provider store={store}>
          <AuthProvider>
            {!isAuthPage && <Header />}
            {children}
            <Toaster />
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
