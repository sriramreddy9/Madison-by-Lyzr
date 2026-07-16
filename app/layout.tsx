import type { Metadata } from "next";
import { Source_Serif_4, Public_Sans, IBM_Plex_Mono } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "./globals.css";

const serif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-serif",
});

const sans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-public-sans",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://madison.ai"),
  title: {
    default: "Madison — The Agentic Banking OS by Lyzr",
    template: "%s | Madison by Lyzr",
  },
  description:
    "Madison is the Agentic Banking OS: governed AI agents across every banking function, deployed in your perimeter with a full audit trail.",
  openGraph: {
    type: "website",
    siteName: "Madison by Lyzr",
    title: "Madison — The Agentic Banking OS by Lyzr",
    description:
      "Governed AI agents across every banking function. One platform. Your data, your perimeter, your control.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
