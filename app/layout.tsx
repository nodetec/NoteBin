import Footer from "./Footer";
import "./globals.css";
import Providers from "./context/providers.jsx";
import Header from "./Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-color-mode="dark" lang="en" className="font-sans">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="dark:bg-primary container p-6 m-auto md:max-w-[90%] 2xl:max-w-[70%]">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
