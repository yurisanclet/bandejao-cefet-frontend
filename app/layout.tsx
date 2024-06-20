'use client'
import { Inter } from "next/font/google";
import Nav from "./components/nav";
import "./globals.css";
import { usePathname } from "next/navigation";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const showNav = !['/', '/register'].includes(pathname);

  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full overflow-hidden`}>
        <div className="flex flex-row h-full">
          {showNav && (
            <div className="w-52 flex-none h-full">
              <Nav />
            </div>
          )}
          <Providers>
            <div className="flex-grow p-10 overflow-auto h-full">
              {children}
            </div>
          </Providers>
        </div>
      </body>
    </html>
  );
}