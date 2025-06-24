import type {Metadata, Viewport} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {TransitionWrapper} from "@/components/customize/transition-wrapper";
import {Toaster} from "@/components/ui/sonner"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import React from "react";
import ReactQueryClientWrapper from "./react-query-client-wrapper";

const APP_NAME = "DeepMemo";
const APP_DEFAULT_TITLE = "Entraîne-toi à memoriser les versets par coeur";
const APP_TITLE_TEMPLATE = "%s - DeepMemo";
const APP_DESCRIPTION = "Entraîne-toi à memoriser les versets par coeur";

export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: APP_DEFAULT_TITLE,
        // startUpImage: [],
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: "website",
        siteName: APP_NAME,
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
    twitter: {
        card: "summary",
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
};

export const viewport: Viewport = {
    themeColor: "#141F25",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-bgPrimary text-white`}
      >
      <ReactQueryClientWrapper>
        <TransitionWrapper>
            {children}
        </TransitionWrapper>
        <Toaster/>
        <ReactQueryDevtools initialIsOpen={false} />
      </ReactQueryClientWrapper>
      </body>
      </html>
  );
}
