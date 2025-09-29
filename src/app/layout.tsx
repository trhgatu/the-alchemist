import type { Metadata } from "next";
import { Share_Tech_Mono, Space_Mono, Kings } from "next/font/google";
import "./globals.css";
import ViewCanvas from "@/components/ViewCanvas";
import LenisScroll from "@/components/common/LenisScroll";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { ReduxProvider } from "@/store/provider";
import { ReactQueryProvider } from "@/app/providers/react-query-provider";
import { siteConfig } from "@/config/site";

const kings = Kings({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-kings",
  display: "swap",
})

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
  display: "swap"

})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${shareTechMono.variable} ${kings.variable}`}>
      <body suppressHydrationWarning={false}>
        <div className="lenis-body">
          <div className="lenis-content">
            <ReduxProvider>
              <ReactQueryProvider>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
                >
                  <LenisScroll />
                  <main>{children}</main>
                  <ViewCanvas />
                </ThemeProvider>
              </ReactQueryProvider>
            </ReduxProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
