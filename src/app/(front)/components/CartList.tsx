"use client"

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCartStore } from "@/lib/cart-store";
import { useRouter } from "next/navigation";

export default function CartList() {
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartStore((state) => state.totalPrice());

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-sp6 sm:px-6 lg:px-8">
        <div className="border-5 border-foreground p-sp5 text-center">
          <p className="rb-meta">CART / EMPTY</p>
          <h1 className="mt-sp3 rb-h2">ตะกร้าว่างเปล่า</h1>
          <p className="mx-auto mt-sp3 max-w-[45ch] text-[16px] leading-[1.6] text-muted-foreground">
            ยังไม่มีรายการในตะกร้า เลือกสินค้าจากหน้าแคตตาล็อกได้เลย
          </p>
          <div className="mt-sp5">
            <Button size="lg" onClick={() => router.replace("/product")}>
              ไปหน้าสินค้า &rarr;
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-sp6 sm:px-6 lg:px-8">
      <header className="border-b-5 border-foreground pb-sp3">
        <p className="rb-meta">[ 06 ] &mdash; ORDER</p>
        <div className="mt-sp2 flex flex-wrap items-end justify-between gap-sp3">
          <h1 className="rb-h2">ตะกร้าสินค้า</h1>
          <p className="font-mono text-[15px] tracking-[1px] uppercase">
            {String(items.length).padStart(2, "0")} LINES
          </p>
        </div>
      </header>

      <div className="mt-sp5 border-3 border-foreground">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>รหัส</TableHead>
              <TableHead>ชื่อสินค้า</TableHead>
              <TableHead className="text-right">ราคา</TableHead>
              <TableHead className="text-center">จำนวน</TableHead>
              <TableHead className="text-right">รวม</TableHead>
              <TableHead className="text-right">ลบ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((i) => (
              <TableRow key={i.productId}>
                <TableCell className="font-mono text-[13px] text-muted-foreground">
                  #{String(i.productId).padStart(3, "0")}
                </TableCell>
                <TableCell className="font-semibold">{i.name}</TableCell>
                <TableCell className="text-right font-mono text-[13px]">
                  {i.price.toLocaleString("th-TH")}
                </TableCell>
                <TableCell className="text-center font-mono text-[13px]">
                  {String(i.qty).padStart(2, "0")}
                </TableCell>
                <TableCell className="text-right font-mono text-[15px] font-bold">
                  {(i.price * i.qty).toLocaleString("th-TH", {
                    minimumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="xs"
                    variant="destructive"
                    aria-label={`ลบ ${i.name}`}
                    onClick={() => removeItem(i.productId)}
                  >
                    ลบ
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex flex-col gap-sp3 border-t-5 border-foreground p-sp3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="rb-meta text-muted-foreground">รวมทั้งหมด / TOTAL THB</p>
            <p className="mt-1 font-mono text-[32px] leading-none font-bold">
              {totalPrice.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="secondary" onClick={clearCart}>
              ล้างตะกร้า
            </Button>
            <Button
              onClick={() => {
                clearCart();
                router.replace("/product");
              }}
            >
              ยืนยันการสั่งซื้อ &rarr;
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
