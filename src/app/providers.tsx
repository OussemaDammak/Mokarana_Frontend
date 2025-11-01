"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { GoogleOAuthProvider } from '@react-oauth/google';


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <GoogleOAuthProvider 
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
      
      >

      <AuthProvider>
        {children}
      </AuthProvider>

      </GoogleOAuthProvider>
    </ThemeProvider>
  );
}
