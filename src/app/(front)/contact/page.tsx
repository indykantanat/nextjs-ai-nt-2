import Link from "next/link";
import ContactForm from "./contact-form";

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

const faqs = [
  {
    question: "สั่งซื้อสินค้าได้อย่างไร?",
    answer: "ท่านสามารถเลือกสินค้าลงตะกร้า และดำเนินการชำระเงินตามขั้นตอนที่ระบุในหน้าตะกร้าสินค้าได้ทันที",
  },
  {
    question: "ใช้เวลาจัดส่งนานเท่าไหร่?",
    answer: "โดยปกติจะใช้เวลา 2-3 วันทำการ สำหรับพื้นที่กรุงเทพฯ และปริมณฑล และ 3-5 วันทำการ สำหรับต่างจังหวัด",
  },
  {
    question: "สามารถคืนสินค้าได้หรือไม่?",
    answer: "สามารถคืนสินค้าได้ภายใน 7 วันหลังจากได้รับสินค้า หากสินค้ามีความเสียหายหรือชำรุดจากการขนส่ง",
  },
  {
    question: "มีช่องทางการชำระเงินแบบใดบ้าง?",
    answer: "เรารองรับการชำระเงินผ่าน บัตรเครดิต/เดบิต, Mobile Banking และ PromptPay",
  },
];

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

      <div className="mt-sp5 grid gap-sp8 sm:grid-cols-2">
        <div className="flex flex-col gap-sp6">
          <div className="grid gap-sp4">
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

          <section className="border-3 border-foreground">
            <div className="flex items-center justify-between border-b-3 border-foreground bg-foreground px-sp3 py-2">
              <span className="rb-meta text-background">FAQ</span>
              <span className="rb-meta text-background">05</span>
            </div>
            <div className="p-sp3 space-y-sp4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b last:border-b-0 border-foreground/20 pb-sp2 last:pb-0">
                  <h4 className="rb-h4 text-[15px] mb-sp1">{faq.question}</h4>
                  <p className="text-[14px] leading-[1.5] text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="border-3 border-foreground p-sp4 sm:p-sp6">
          <h3 className="rb-h4 mb-sp4">ส่งข้อความหาเรา</h3>
          <ContactForm />
        </div>
      </div>

      <div className="mt-sp5 border-t-3 border-foreground pt-sp3">
        <Link href="/" className="rb-link font-mono text-[15px]">
          &larr; กลับหน้าหลัก
        </Link>
      </div>
    </div>
  );
}
