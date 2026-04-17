import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HelpMyIELTS — Achieve Your Target Band Score",
  description:
    "AI-powered IELTS & PTE preparation platform. Practice Writing, Speaking, Reading and Listening with personalised feedback and expert guidance.",
  keywords:
    "IELTS preparation, PTE practice, band score, AI feedback, IELTS writing, IELTS speaking, English test prep",
  openGraph: {
    title: "HelpMyIELTS — Achieve Your Target Band Score",
    description:
      "AI-powered IELTS & PTE preparation platform with personalised feedback.",
    type: "website",
    url: "https://helpmyielts.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
