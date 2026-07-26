import type { Metadata } from "next";
import { Inter, Caveat, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

const siteTitle = "To My Dearest Akka 💖 — A Story of Love";
const siteDescription = "Don't open this unless you're ready to cry. ❤️ Someone has been keeping a secret for a very long time... A surprise made with thousands of memories awaits you. ✨ There's something inside that belongs only to you. Open only when you have a few quiet minutes. 💌 Some feelings are too big for a text message... One click. A thousand emotions. ❤️ This isn't just a website... it's something much more.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: ["birthday", "sister", "love letter", "Anu Akka", "memories"],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>❤️</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${caveat.variable} ${instrumentSerif.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-midnight-deep text-ink overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
