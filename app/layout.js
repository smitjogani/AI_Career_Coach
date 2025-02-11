import {ClerkProvider} from '@clerk/nextjs'
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import "./globals.css";
import { dark } from "@clerk/themes";

export const metadata = {
  title: "AI Career Coach",
  description: "",
};

const inter = Inter({subset: ["letin"]})

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className}`}
      >
         <ThemeProvider
             attribute="class"
             defaultTheme="dark"
             enableSystem
             disableTransitionOnChange
          >
            {/* header */}
            <Header/>

            {/* Body */}
            <main className='min-h-screen'>
              {children}
            </main>

            {/* footer */}
            <footer className='bg-black py-12'>
              <div className='container mx-auto px-4 text-center text-gray-200'>
                <p>Made with 💗 by Smit Jogani</p>
              </div>
            </footer>

          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
