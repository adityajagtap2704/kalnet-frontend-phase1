import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/store/redux/Provider";
import { Navbar } from "@/components/layout";
import { Footer } from "@/components/layout";
import CursorSpotlight from "@/components/ui/CursorSpotlight";
import { ScrollProgress, PageLoader, ChatAssistant } from "@/components/ui";
import SmoothScroll from "@/components/animations/SmoothScroll";

export const metadata: Metadata = {
  title: {
    default: "Zentrix — Engineering Digital Infrastructure",
    template: "%s | Zentrix",
  },
  description:
    "Zentrix builds the systems that power modern businesses — cloud platforms, custom applications, cybersecurity, and data engineering. Based in Bengaluru.",
  keywords: [
    "IT company",
    "web development",
    "cloud solutions",
    "cybersecurity",
    "Bengaluru",
    "software engineering",
  ],
  authors: [{ name: "Zentrix Technologies" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Zentrix",
    title: "Zentrix — Engineering Digital Infrastructure",
    description:
      "We build the systems that power modern businesses. Cloud platforms, custom applications, cybersecurity, and data engineering.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased">
        <ReduxProvider>
          <SmoothScroll>
            <PageLoader />
            <ScrollProgress />
            <CursorSpotlight />
            <ChatAssistant />
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </SmoothScroll>
        </ReduxProvider>
      </body>
    </html>
  );
}
