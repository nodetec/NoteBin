import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";

import "./styles/globals.css";

export const metadata = {
  title: "notebin",
  description: "Decentralized notes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="container mx-auto flex min-h-screen max-w-5xl flex-col bg-slate-50 px-4 transition-colors duration-500 dark:bg-smoke-800">
        {children}
      </body>
    </html>
  );
}
