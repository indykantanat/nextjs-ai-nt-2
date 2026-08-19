import Link from "next/link";
import { Button } from "@/components/ui/button";

const specs = [
  ["สินค้า", "PRODUCTS / DATABASE"],
  ["หลักสูตร", "COURSES / REST API"],
  ["ตะกร้า", "CART / LOCALSTORAGE"],
  ["สมาชิก", "AUTH / SESSION"],
];

export default function Hero() {
  return (
    <section className="border-b-5 border-foreground">
      {/* Status strip */}
      <div className="flex items-center justify-between gap-4 overflow-hidden border-b-3 border-foreground px-4 py-2 sm:px-6 lg:px-8">
        <span className="rb-meta whitespace-nowrap">EST. 2026</span>
        <span className="rb-meta hidden whitespace-nowrap sm:block">
          BANGKOK / TH
        </span>
        <span className="rb-meta whitespace-nowrap">NEXT.JS 16</span>
        <span className="rb-meta whitespace-nowrap">NO STYLE / ALL STRUCTURE</span>
      </div>

      <div className="mx-auto grid max-w-(--breakpoint-xl) grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Left column — the shout */}
        <div className="px-4 py-sp6 sm:px-6 lg:border-r-5 lg:border-foreground lg:px-8 lg:py-sp7">
          <p className="rb-meta">[ 01 ] &mdash; INDEX</p>

          <h1 className="mt-sp3 rb-h1">
            COSCI
            <br />
            <span className="mt-1 inline-block bg-foreground px-2 text-background">
              E&mdash;COMMERCE
            </span>
          </h1>

          <p className="mt-sp4 max-w-[52ch] text-[16px] leading-[1.6]">
            ระบบร้านค้าออนไลน์ที่ตัดทุกอย่างที่ไม่จำเป็นออก
            เหลือไว้แค่โครงสร้าง ตัวหนังสือ และเส้นขอบหนา ๆ
            เลือกสินค้า ดูหลักสูตร แล้วสั่งซื้อได้ทันที
          </p>

          <div className="mt-sp5 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/product">สินค้าทั้งหมด &rarr;</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/course">หลักสูตร</Link>
            </Button>
          </div>

          {/* Status legend — chips, no icons */}
          <div className="mt-sp6 flex flex-wrap gap-2">
            <span className="border-2 border-success px-2.5 py-0.5 text-[11px] font-semibold tracking-[1px] text-success uppercase">
              พร้อมส่ง
            </span>
            <span className="border-2 border-warning px-2.5 py-0.5 text-[11px] font-semibold tracking-[1px] text-warning uppercase">
              จำนวนจำกัด
            </span>
            <span className="border-2 border-destructive px-2.5 py-0.5 text-[11px] font-semibold tracking-[1px] text-destructive uppercase">
              สินค้าหมด
            </span>
          </div>
        </div>

        {/* Right column — spec sheet */}
        <aside className="border-t-5 border-foreground lg:border-t-0">
          <p className="border-b-3 border-foreground bg-foreground px-4 py-2 rb-meta text-background">
            SYSTEM / INDEX
          </p>
          <dl>
            {specs.map(([th, en], i) => (
              <div key={en} className="flex items-baseline justify-between gap-3 border-b-3 border-foreground px-4 py-4">
                <dt className="rb-h4">{th}</dt>
                <dd className="font-mono text-[12px] tracking-[1px] text-muted-foreground uppercase">
                  {String(i + 1).padStart(2, "0")} / {en}
                </dd>
              </div>
            ))}
          </dl>
          <div className="px-4 py-4">
            <p className="rb-meta text-muted-foreground">CONTACT</p>
            <a
              href="mailto:codingthailand@gmail.com"
              className="mt-1 block font-mono text-[15px] rb-link break-all"
            >
              codingthailand@gmail.com
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
