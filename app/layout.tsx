'use client'
import { Inter } from "next/font/google";
import Nav from "./components/nav";
import "./globals.css";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const showNav = !['/', '/register'].includes(pathname);

  return (
    <html lang="en">
      <body className={inter.className}>
        {showNav && <Nav />}
        <main className={showNav ? 'main-content' : ''}>
          {children}
        </main>
      </body>
    </html>
  );
}
