import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

// Mock data only — this page renders sample figures, not live queries.
// http://localhost:3000/dashboard

const stats = [
  {
    label: "INCOME",
    title: "รายรับเดือนนี้",
    value: "฿158,200",
    delta: "+12.2%",
    note: "เทียบเดือนก่อน",
    bars: [40, 55, 45, 70, 60, 80, 65],
  },
  {
    label: "EXPENSE",
    title: "รายจ่ายเดือนนี้",
    value: "฿94,650",
    delta: "-8.4%",
    note: "เทียบเดือนก่อน",
    bars: [70, 60, 65, 50, 58, 42, 48],
  },
];

const orderStat = {
  value: "4,286",
  delta: "+10.8%",
  note: "คำสั่งซื้อ / 7 วันล่าสุด",
};

const paymentHistory = [
  { method: "บัตรเครดิต", masked: "•••• 5688", date: "05 ม.ค.", amount: -2820 },
  { method: "พร้อมเพย์", masked: "•••• 8562", date: "15 ก.พ.", amount: -1450 },
  { method: "โอนผ่านธนาคาร", masked: "•••• 5238", date: "20 มี.ค.", amount: -500 },
  { method: "บัตรเดบิต", masked: "•••• 8562", date: "10 มี.ค.", amount: -750 },
  { method: "บัตรเครดิต", masked: "•••• 5688", date: "25 พ.ค.", amount: -1200 },
];

const months = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค."];
const revenueThisYear = [18, 9, 13, 11, 19, 8, 14];
const revenueLastYear = [10, 8.5, 7, 5.1, 7, 5.8, 5.6];
const REVENUE_MAX = 20;

const GROWTH = 0.78;
const TICK_COUNT = 36;
const DIAL_CENTER = { x: 100, y: 90 };
const dialTicks = Array.from({ length: TICK_COUNT }, (_, i) => {
  const t = i / (TICK_COUNT - 1);
  const active = t <= GROWTH;
  const angleDeg = -120 + t * 240;
  const rad = (angleDeg * Math.PI) / 180;
  const rOuter = 88;
  const rInner = active ? 60 : 76;
  return {
    active,
    x1: DIAL_CENTER.x + rInner * Math.sin(rad),
    y1: DIAL_CENTER.y - rInner * Math.cos(rad),
    x2: DIAL_CENTER.x + rOuter * Math.sin(rad),
    y2: DIAL_CENTER.y - rOuter * Math.cos(rad),
  };
});

const salesByCategory = [
  { name: "หลักสูตรออนไลน์", amount: "฿867,000", delta: "+20.3%", up: true },
  { name: "อุปกรณ์ไอที", amount: "฿1,200,000", delta: "+15.7%", up: true },
  { name: "หนังสือ & ของแถม", amount: "฿750,000", delta: "-18.2%", up: false },
];

const transactions = [
  { title: "ค่าเซิร์ฟเวอร์ (Hosting)", sub: "DigitalOcean", amount: -2820 },
  { title: "รับชำระจากลูกค้า", sub: "โอนเข้าบัญชี", amount: 1260 },
  { title: "ค่าธรรมเนียม Payment Gateway", sub: "Omise", amount: -149 },
];

const totalEarning = {
  value: "฿1,024,650",
  delta: "+10%",
  note: "เทียบปีก่อน (+฿84,325)",
  breakdown: [
    { name: "สินค้า", sub: "PRODUCT SALES", value: "฿612,400", percent: 70 },
    { name: "หลักสูตร", sub: "COURSE SALES", value: "฿412,250", percent: 45 },
  ],
};

function CardHeader({ label, index }: { label: string; index: string }) {
  return (
    <div className="flex items-center justify-between border-b-3 border-foreground bg-foreground px-sp3 py-2">
      <span className="rb-meta text-background">{label}</span>
      <span className="rb-meta text-background">{index}</span>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-sp6 sm:px-6 lg:px-8">
      <header className="border-b-5 border-foreground pb-sp3">
        <p className="rb-meta">[ 07 ] &mdash; DASHBOARD</p>
        <div className="mt-sp2 flex flex-wrap items-end justify-between gap-sp3">
          <h2 className="rb-h2">แดชบอร์ด</h2>
          <p className="max-w-[40ch] text-[16px] leading-[1.6] text-muted-foreground">
            ภาพรวมยอดขายและรายรับ — ข้อมูลตัวอย่างสำหรับสาธิตหน้าตาเท่านั้น
          </p>
        </div>
      </header>

      {/* Row 1 — headline figures */}
      <div className="mt-sp5 grid gap-sp4 sm:grid-cols-3">
        {stats.map(({ label, title, value, delta, note, bars }) => (
          <div key={label} className="border-3 border-foreground p-sp4">
            <p className="rb-meta text-muted-foreground">{label}</p>
            <p className="mt-sp2 text-[15px]">{title}</p>
            <div className="mt-sp2 flex flex-wrap items-end justify-between gap-sp2">
              <p className="font-mono text-[28px] leading-none font-bold sm:text-[32px]">{value}</p>
              <span className="shrink-0 border-3 border-foreground px-sp2 py-0.5 font-mono text-[13px]">
                {delta}
              </span>
            </div>
            <div className="mt-sp3 flex h-10 items-end gap-1">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="min-w-0 flex-1 bg-foreground"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <p className="mt-sp1 rb-meta text-muted-foreground">{note}</p>
          </div>
        ))}

        <div className="border-3 border-foreground p-sp4">
          <p className="rb-meta text-muted-foreground">ORDERS</p>
          <p className="mt-sp2 text-[15px]">คำสั่งซื้อทั้งหมด</p>
          <div className="mt-sp2 flex flex-wrap items-end justify-between gap-sp2">
            <p className="font-mono text-[28px] leading-none font-bold sm:text-[32px]">{orderStat.value}</p>
            <span className="flex shrink-0 items-center gap-1 font-mono text-[13px] font-bold text-success">
              <ArrowUpRight className="size-4" aria-hidden />
              {orderStat.delta}
            </span>
          </div>
          <p className="mt-sp3 border-t-3 border-foreground pt-sp3 rb-meta text-muted-foreground">
            {orderStat.note}
          </p>
        </div>
      </div>

      {/* Row 2 — payment history / revenue / growth */}
      <div className="mt-sp4 grid gap-sp4 lg:grid-cols-3">
        <section className="border-3 border-foreground">
          <CardHeader label="PAYMENT HISTORY" index="04" />
          <div className="p-sp3">
            <div className="flex justify-between border-b-3 border-foreground pb-sp2">
              <span className="rb-meta text-muted-foreground">ช่องทาง</span>
              <span className="rb-meta text-muted-foreground">ยอดใช้จ่าย</span>
            </div>
            <ul>
              {paymentHistory.map((row, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-sp2 border-b border-foreground/20 py-sp2 last:border-b-0"
                >
                  <div>
                    <p className="text-[14px] font-semibold">{row.method}</p>
                    <p className="font-mono text-[12px] text-muted-foreground">
                      {row.masked} &middot; {row.date}
                    </p>
                  </div>
                  <p className="font-mono text-[14px] font-bold text-destructive">
                    -฿{Math.abs(row.amount).toLocaleString("th-TH")}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-3 border-foreground">
          <CardHeader label="REVENUE" index="05" />
          <div className="p-sp3">
            <div className="flex items-center gap-sp4">
              <span className="flex items-center gap-1 font-mono text-[12px]">
                <span className="size-2.5 bg-foreground" /> 2026
              </span>
              <span className="flex items-center gap-1 font-mono text-[12px]">
                <span className="size-2.5 border-2 border-foreground" /> 2025
              </span>
            </div>
            <div className="mt-sp3 flex gap-sp1">
              <div className="flex flex-col justify-between py-1 font-mono text-[10px] text-muted-foreground">
                <span>20</span>
                <span>0</span>
                <span>20</span>
              </div>
              <div className="flex flex-1 items-stretch justify-between gap-1">
                {months.map((m, i) => (
                  <div key={m} className="flex flex-1 flex-col items-center">
                    <div className="flex h-[90px] w-full items-end justify-center">
                      <div
                        className="w-3 bg-foreground sm:w-4"
                        style={{ height: `${(revenueThisYear[i] / REVENUE_MAX) * 100}%` }}
                      />
                    </div>
                    <div className="h-[2px] w-full bg-foreground" />
                    <div className="flex h-[90px] w-full items-start justify-center">
                      <div
                        className="w-3 border-2 border-foreground border-t-0 sm:w-4"
                        style={{ height: `${(revenueLastYear[i] / REVENUE_MAX) * 100}%` }}
                      />
                    </div>
                    <span className="mt-sp1 rb-meta text-muted-foreground">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-3 border-foreground">
          <CardHeader label="GROWTH" index="06" />
          <div className="flex flex-col items-center p-sp3">
            <div className="relative w-full max-w-[220px]">
              <svg viewBox="0 0 200 150" className="w-full">
                {dialTicks.map((tick, i) => (
                  <line
                    key={i}
                    x1={tick.x1}
                    y1={tick.y1}
                    x2={tick.x2}
                    y2={tick.y2}
                    stroke="currentColor"
                    strokeWidth={tick.active ? 3 : 1.5}
                    className={tick.active ? "text-foreground" : "text-foreground/25"}
                  />
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-sp4 text-center">
                <p className="font-mono text-[36px] leading-none font-bold">
                  {Math.round(GROWTH * 100)}%
                </p>
                <p className="mt-sp1 rb-meta text-muted-foreground">อัตราการเติบโต</p>
              </div>
            </div>
            <p className="mt-sp2 text-[13px] text-muted-foreground">
              62% การเติบโตของธุรกิจ
            </p>
            <div className="mt-sp3 grid w-full grid-cols-2 border-t-3 border-foreground pt-sp3">
              <div className="border-r-3 border-foreground pr-sp2">
                <p className="rb-meta text-muted-foreground">ปีนี้</p>
                <p className="font-mono text-[15px] font-bold">฿412,000</p>
              </div>
              <div className="pl-sp3">
                <p className="rb-meta text-muted-foreground">ปีก่อน</p>
                <p className="font-mono text-[15px] font-bold">฿325,000</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Row 3 — categories / transactions / total earning */}
      <div className="mt-sp4 grid gap-sp4 lg:grid-cols-3">
        <section className="border-3 border-foreground">
          <CardHeader label="SALES BY CATEGORY" index="07" />
          <div className="p-sp3">
            <p className="rb-meta text-muted-foreground">ยอดขายรายเดือนแยกตามหมวดหมู่</p>
            <ul className="mt-sp3 space-y-sp3">
              {salesByCategory.map((row, i) => (
                <li key={row.name} className="flex items-center gap-sp3">
                  <span className="flex size-7 shrink-0 items-center justify-center border-3 border-foreground font-mono text-[12px] font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-semibold">{row.name}</p>
                    <p className="font-mono text-[13px]">{row.amount}</p>
                  </div>
                  <span
                    className={`flex items-center gap-0.5 font-mono text-[13px] font-bold ${
                      row.up ? "text-success" : "text-destructive"
                    }`}
                  >
                    {row.up ? (
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    ) : (
                      <ArrowDownRight className="size-3.5" aria-hidden />
                    )}
                    {row.delta}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-3 border-foreground">
          <CardHeader label="TRANSACTIONS" index="08" />
          <ul className="p-sp3">
            {transactions.map((tx, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-sp2 border-b border-foreground/20 py-sp3 first:pt-0 last:border-b-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-semibold">{tx.title}</p>
                  <p className="rb-meta text-muted-foreground">{tx.sub}</p>
                </div>
                <p
                  className={`shrink-0 font-mono text-[14px] font-bold ${
                    tx.amount > 0 ? "text-success" : "text-foreground"
                  }`}
                >
                  {tx.amount > 0 ? "+" : "-"}฿{Math.abs(tx.amount).toLocaleString("th-TH")}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-3 border-foreground">
          <CardHeader label="TOTAL EARNING" index="09" />
          <div className="p-sp3">
            <p className="font-mono text-[32px] leading-none font-bold">{totalEarning.value}</p>
            <p className="mt-sp2 flex items-center gap-1 text-[13px] text-muted-foreground">
              <span className="flex items-center gap-0.5 font-mono font-bold text-success">
                <ArrowUpRight className="size-3.5" aria-hidden />
                {totalEarning.delta}
              </span>
              {totalEarning.note}
            </p>
            <div className="mt-sp4 space-y-sp3 border-t-3 border-foreground pt-sp3">
              {totalEarning.breakdown.map((row) => (
                <div key={row.name}>
                  <div className="flex items-baseline justify-between">
                    <p className="text-[14px] font-semibold">
                      {row.name}{" "}
                      <span className="rb-meta text-muted-foreground">{row.sub}</span>
                    </p>
                    <p className="font-mono text-[13px]">{row.value}</p>
                  </div>
                  <div className="mt-sp1 h-2 w-full border-2 border-foreground">
                    <div
                      className="h-full bg-foreground"
                      style={{ width: `${row.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
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
