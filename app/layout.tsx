import "@/styles/globals.css";

import type { Metadata } from "next";
import { fontMono, fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import ThemeProvider from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Ledger Lunacy",
  description: "An awesome ledger table for the customer to view transactions.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <>
      <html lang='en' suppressHydrationWarning className='bg-background'>
        <body
          className={cn(
            "font-sans antialiased",
            fontSans.variable,
            fontMono.variable
          )}
        >
          <ThemeProvider>
            <div
              className='relative flex flex-col overflow-hidden'
              style={{ height: "100svh" }}
            >
              <Navbar />

              <div className='flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 scrollbar-thumb-rounded-lg'>
                {children}
              </div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
};

export default RootLayout;
