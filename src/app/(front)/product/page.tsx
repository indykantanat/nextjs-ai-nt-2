import FeaturesProduct from "@/components/features-product";
import prisma from "@/lib/prisma";
import { connection } from "next/server";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

// http://localhost:3000/product
export default async function ProductPage() {
  await connection(); // signals this is a dynamic route
  const products = await prisma.product.findMany();

  // แปลง Decimal → number ก่อนส่งให้ Client Component
  const serializedProducts = products.map((p) => ({
    ...p,
    price: Number(p.price), // Decimal → number
  }))

  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-sp6 sm:px-6 lg:px-8">
        <div className="border-5 border-foreground p-sp5 text-center">
          <p className="rb-meta">CATALOG / EMPTY</p>
          <h1 className="mt-sp3 rb-h2">ยังไม่มีสินค้า</h1>
          <p className="mx-auto mt-sp3 max-w-[45ch] text-[16px] leading-[1.6] text-muted-foreground">
            ยังไม่มีข้อมูลสินค้าในฐานข้อมูล
          </p>
        </div>
      </div>
    );
  }

  return <FeaturesProduct products={serializedProducts} />;
}
