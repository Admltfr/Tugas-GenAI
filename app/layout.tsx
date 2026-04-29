import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar, Footer } from "@/components/layout";
import { FormProvider } from "@/context/FormContext";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SuratAI - Generator Surat Otomatis",
  description:
    "Buat surat lamaran kerja dan surat magang profesional dengan mudah",
  keywords: [
    "generator surat",
    "surat lamaran",
    "surat magang",
    "aplikasi online",
  ],
};

const themeScript = `
  (() => {
    try {
      const theme = localStorage.getItem("suratai_theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const resolvedTheme = theme === "dark" || theme === "light" ? theme : prefersDark ? "dark" : "light";
      document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
      document.documentElement.style.colorScheme = resolvedTheme;
    } catch {
      document.documentElement.classList.remove("dark");
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-950 transition-colors dark:bg-slate-950 dark:text-slate-100">
        <Script id="theme-script" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <ThemeProvider>
          <FormProvider>
            <Navbar />
            {children}
            <Footer />
          </FormProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
