import Link from "next/link";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const contacts = [
  {
    title: "ที่อยู่",
    label: "ADDRESS",
    value: "123 ถนนตัวอย่าง แขวงบางรัก เขตบางรัก กรุงเทพมหานคร 10500",
  },
  {
    title: "อีเมล",
    label: "EMAIL",
    value: "contact@cosci.com",
    href: "mailto:contact@cosci.com",
  },
  {
    title: "โทรศัพท์",
    label: "PHONE",
    value: "02-123-4567",
    href: "tel:021234567",
  },
  {
    title: "เวลาทำการ",
    label: "HOURS",
    value: "จันทร์ - ศุกร์ 09:00 - 18:00 น.",
  },
];

// http://localhost:3000/contact
export default function ContactPage() {
  return (
    <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-sp6 sm:px-6 lg:px-8">
      <header className="border-b-5 border-foreground pb-sp3">
        <p className="rb-meta">[ 05 ] &mdash; CONTACT</p>
        <div className="mt-sp2 flex flex-wrap items-end justify-between gap-sp3">
          <h2 className="rb-h2">ติดต่อเรา</h2>
          <p className="max-w-[40ch] text-[16px] leading-[1.6]">
            สอบถามข้อมูลเพิ่มเติมหรือติดต่อทีมงานได้ตามช่องทางด้านล่าง
          </p>
        </div>
      </header>

      <div className="mt-sp5 grid gap-sp4 sm:grid-cols-2">
        {contacts.map(({ title, label, value, href }, index) => (
          <section key={title} className="border-3 border-foreground">
            <div className="flex items-center justify-between border-b-3 border-foreground bg-foreground px-sp3 py-2">
              <span className="rb-meta text-background">{label}</span>
              <span className="rb-meta text-background">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="p-sp3">
              <h3 className="rb-h4">{title}</h3>
              {href ? (
                <a href={href} className="mt-sp2 block font-mono text-[15px] rb-link break-all">
                  {value}
                </a>
              ) : (
                <p className="mt-sp2 text-[15px] leading-[1.5] text-muted-foreground">
                  {value}
                </p>
              )}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-sp5 border-t-3 border-foreground pt-sp3">
        <Link href="/" className="rb-link font-mono text-[15px]">
          &larr; กลับหน้าหลัก
        </Link>
      </div>
    </div>
  );
}
