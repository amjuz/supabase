import { ThemeSwitcher } from "@/components/theme-switcher";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "react-hot-toast";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <Toaster/>
            <div className="flex-1 w-full flex flex-col  items-center">
              <Navbar />
              <div className="flex justify-center items-center max-w-5xl w-full border-x shadow-lg min-h-[calc(100vh-64px)]">
                {children}
              </div>
              {/* <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16"></footer> */}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
