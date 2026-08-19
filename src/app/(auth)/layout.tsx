import type { Metadata } from "next";
import {
  Prompt,
  Work_Sans,
  Archivo_Black,
  Space_Mono,
} from "next/font/google";
import { cn } from "@/lib/utils";
import "../globals.css";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

// Prompt stays as the Thai fallback for every family below.
const prompt = Prompt({
  weight: ["400", "500", "600", "700"],
  subsets: ["thai"],
  variable: "--font-prompt",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ระบบ ล็อกอิน",
  description: "เรียนรู้การเขียน Next.js",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={cn(
        "font-sans",
        prompt.variable,
        workSans.variable,
        archivoBlack.variable,
        spaceMono.variable
      )}
    >
      {/* ส่วนขยายเบราว์เซอร์บางตัว (เช่น ColorZilla) เติม attribute ใส่ body
          ก่อน React hydrate — ปิด warning เฉพาะ attribute ของ body เท่านั้น */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
