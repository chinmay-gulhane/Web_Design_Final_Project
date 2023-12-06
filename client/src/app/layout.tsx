import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";
import "bootstrap/dist/css/bootstrap.min.css";
import ToastifyContainer from "@/components/ToastifyContainer";
import Footer from "@/components/Footer/Footer";
import Layout from "@/components/Layout/Layout";

export const metadata: Metadata = {
  title: "Husky Bites App",
  description: "A food delivery application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body>
        <ReduxProvider>
          <Layout>{children}</Layout>
        </ReduxProvider>
        <ToastifyContainer />
      </body>
    </html>
  );
}
