import Link from "next/link";
import AppLoading from "../components/app-loading";
import { Suspense } from "react";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

async function ApiVersion() {
  const response = await fetch('https://api.codingthailand.com/api/version');
  const apiInfo = await response.json();

  return (
    <p className="font-mono text-[15px]">
      API VERSION{" "}
      <span className="bg-foreground px-2 py-0.5 font-bold text-background">
        {apiInfo.data.version}
      </span>
    </p>
  );
}

// http://localhost:3000/about
export default function AboutPage() {
  return (
    <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-sp6 sm:px-6 lg:px-8">
      <header className="border-b-5 border-foreground pb-sp3">
        <p className="rb-meta">[ 04 ] &mdash; ABOUT</p>
        <h2 className="mt-sp2 rb-h2">เกี่ยวกับเรา</h2>
      </header>

      <div className="mt-sp5 grid gap-sp4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <section className="border-3 border-foreground p-sp4">
          <h3 className="rb-h3">เรื่องราวของเรา</h3>
          <p className="mt-sp3 max-w-[62ch] text-[16px] leading-[1.6]">
            NT E&mdash;Commerce เกิดจากแนวคิดว่าเว็บไซต์ไม่จำเป็นต้องสวยหรู
            แต่ต้องอ่านง่าย ใช้งานได้จริง และตรงไปตรงมา
            เราตัดเงา ตัดมุมโค้ง และตัดของตกแต่งออกทั้งหมด
            เหลือไว้เพียงเส้นขอบหนา ตัวอักษรขนาดใหญ่ และโครงสร้างที่ชัดเจน
          </p>
          <dl className="mt-sp4 border-t-3 border-foreground">
            {[
              ["ก่อตั้ง", "2026"],
              ["ที่ตั้ง", "BANGKOK / TH"],
              ["เทคโนโลยี", "NEXT.JS 16 / PRISMA / MARIADB"],
              ["ระบบสมาชิก", "BETTER AUTH"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex flex-wrap items-baseline justify-between gap-3 border-b-3 border-foreground py-3"
              >
                <dt className="rb-label">{k}</dt>
                <dd className="font-mono text-[13px] tracking-[1px] uppercase">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="border-5 border-foreground">
          <p className="border-b-3 border-foreground bg-foreground px-sp3 py-2 rb-meta text-background">
            STATUS
          </p>
          <div className="p-sp3">
            <Suspense fallback={<AppLoading />}>
              <ApiVersion />
            </Suspense>
            <p className="mt-sp3 border-t-3 border-foreground pt-sp3 text-[14px] leading-[1.5] text-muted-foreground">
              ข้อมูลหลักสูตรดึงจาก API ภายนอกแบบเรียลไทม์
            </p>
          </div>
        </section>
      </div>

      <div className="mt-sp5 border-t-3 border-foreground pt-sp3">
        <Link href="/" className="rb-link font-mono text-[15px]">
          &larr; กลับหน้าหลัก
        </Link>
      </div>
    </div>
  );
}
