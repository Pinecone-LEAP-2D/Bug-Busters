"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./provider/UserProvider";
import { DonationProvider } from "./provider/DonationProvider";
import { ToastContainer } from "react-toastify";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import AuthProvider from "./provider/AuthProvider";
import { BankCardProvider } from "./provider/BankCardProvider";
import { ProfileProvider } from "./provider/ProfileProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProfileAuthProvider from "./provider/ProfileAuthProvider";
import AllProfileProvider from "./provider/AllProfileProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <QueryClientProvider client={queryClient}>
          <ToastContainer />
          <AuthProvider>
            <NuqsAdapter>
              <UserProvider>
                <ProfileProvider>
                  <ProfileAuthProvider>
                    <AllProfileProvider>
                      <BankCardProvider>
                        <DonationProvider>{children}</DonationProvider>
                      </BankCardProvider>
                    </AllProfileProvider>
                  </ProfileAuthProvider>
                </ProfileProvider>
              </UserProvider>
            </NuqsAdapter>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
``;
