import { CloudProvider } from "@/cloud/useCloud";
import { ConfigProvider } from "@/hooks/useConfig";
import { ConnectionProvider } from "@/hooks/useConnection";
import { ToastProvider } from "@/components/toast/ToasterProvider";
import "@livekit/components-styles/components/participant";
import "@/styles/globals.css";
import "@/styles/custom.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>KnoMind | Your AI Mental Health Coach</title>
        <meta name="description" content="KnoMind - Your personal AI mental health coach available 24/7 to support your wellbeing journey." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta property="og:title" content="KnoMind | Your AI Mental Health Coach" />
        <meta property="og:description" content="Your personal AI mental health coach available 24/7 to support your wellbeing journey." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="KnoMind" />
        
        {/* SVG Favicon data URI - brain icon */}
        <link 
          rel="icon" 
          href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAgNUMxNi4yIDUgNSAxNi4yIDUgMzBDNSA0My44IDE2LjIgNTUgMzAgNTVDNDMuOCA1NSA1NSA0My44IDU1IDMwQzU1IDE2LjIgNDMuOCA1IDMwIDVaIiBmaWxsPSIjNjM2NmYxIi8+PHBhdGggZD0iTTMwIDEyQzI0LjUgMTIgMjAgMTYuNSAyMCAyMkMyMCAyNC41IDIxIDI2LjggMjIuNyAyOC4zQzE5LjQgMzAuNCAxNyAzNC4zIDE3IDM4LjhDMTcgNDUuNCAyMi40IDUwLjggMjkgNTAuOEMyOS43IDUwLjggMzAuMyA1MC43IDMxIDUwLjYiIHN0cm9rZT0iI2E1YjRmYyIgc3Ryb2tlLXdpZHRoPSIyLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCAxMkMzNS41IDEyIDQwIDE2LjUgNDAgMjJDNDAgMjQuNSAzOSAyNi44IDM3LjMgMjguM0M0MC42IDMwLjQgNDMgMzQuMyA0MyAzOC44QzQzIDQ1LjQgMzcuNiA1MC44IDMxIDUwLjhDMzAuMyA1MC44IDI5LjcgNTAuNyAyOSA1MC42IiBzdHJva2U9IiNhNWI0ZmMiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMjUgMjJDMjUgMjIgMjggMjUgMzAgMjVDMzIgMjUgMzUgMjIgMzUgMjIiIHN0cm9rZT0iIzRmNDZlNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMjIgMzhDMjIgMzggMjYgNDIgMzAgNDJDMzQgNDIgMzggMzggMzggMzgiIHN0cm9rZT0iIzRmNDZlNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMzAgMjVWNDIiIHN0cm9rZT0iIzRmNDZlNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiLz48L3N2Zz4=" 
          type="image/svg+xml"
        />
      </Head>
      <ToastProvider>
        <ConfigProvider>
          <CloudProvider>
            <ConnectionProvider>
              <Component {...pageProps} />
            </ConnectionProvider>
          </CloudProvider>
        </ConfigProvider>
      </ToastProvider>
    </>
  );
}