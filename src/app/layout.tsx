import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import {
  Share_Tech_Mono,
  Space_Mono,
  Kings,
  Cinzel_Decorative,
  Playfair_Display,
  EB_Garamond,
  Bilbo,
} from "next/font/google";
import "./globals.css";
import LenisScroll from "@/components/common/LenisScroll";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { ReactQueryProvider } from "@/app/providers/react-query-provider";
import { siteConfig } from "@/config/site";

const bilbo = Bilbo({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bilbo",
  display: "swap",
});
const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-cinzel-decorative",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "700", "900", "500", "600", "800"],
  variable: "--font-playfair-display",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const kings = Kings({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-kings",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-share-tech-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@trhgatu",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-icon.png",
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
      className={`
        ${spaceMono.variable}
        ${bilbo.variable}
        ${playfairDisplay.variable}
        ${cinzelDecorative.variable}
        ${shareTechMono.variable}
        ${kings.variable}
        ${ebGaramond.variable}`}
      suppressHydrationWarning={true}
    >
      <body>
        <div id="page-wrapper">
          <div className="lenis-body">
            <div className="lenis-content">
              <ReactQueryProvider>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="dark"
                  forcedTheme="dark"
                  enableSystem={false}
                  disableTransitionOnChange
                >
                  <LenisScroll />
                  <main>{children}</main>
                  <Analytics />
                </ThemeProvider>
              </ReactQueryProvider>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
