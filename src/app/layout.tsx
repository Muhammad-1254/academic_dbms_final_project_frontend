import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import StoreProvider from "@/providers/StoreProvider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Navbar from "@/components/Navbar";
import LoginProvider from "@/providers/LoginProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-sans antialiased", fontSans.variable)}>
        <main className=" mx-auto  flex flex-col max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg  xl:max-w-screen-2xl">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <StoreProvider>
              <Toaster />
<LoginProvider>

          <Navbar />
              <>
              
              {children}</>
</LoginProvider>
            </StoreProvider>
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
