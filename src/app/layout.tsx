import { FC } from "react";
import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import Providers from "@/components/providers/Providers";
import { Toaster } from "@/components/ui/sonner";
import { RootLayoutProps } from "@/interfaces/RootLayoutProps";

import "@/styles/globals.css";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Image AI",
  description: "An AI powered image editor app.",
};

const RootLayout: FC<Readonly<RootLayoutProps>> = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} ${firaCode.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster theme="light" richColors />
      </body>
    </html>
  );
};

export default RootLayout;
