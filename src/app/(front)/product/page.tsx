import { readdir } from "node:fs/promises";
import path from "node:path";
import FeaturesProduct from "@/components/features-product";
import prisma from "@/lib/prisma";
import { connection } from "next/server";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const IMAGE_DIR = path.join(process.cwd(), "public", "product-image");

// รูปสินค้าใน DB บางรายการยังไม่มีไฟล์จริงใน public/product-image
// จึงเช็คก่อนว่ามีไฟล์ไหม ถ้าไม่มีจะ render เป็นบล็อกตัวอักษรแทน
async function listAvailableImages() {
  try {
    return new Set(await readdir(IMAGE_DIR));
  } catch {
    return new Set<string>();
  }
}

// http://localhost:3000/product
export default async function ProductPage() {
  await connection(); // signals this is a dynamic route

  const [products, availableImages] = await Promise.all([
    prisma.product.findMany({
      orderBy: { id: "asc" },
      include: {
        category: true,
        images: { orderBy: { id: "asc" }, take: 1 },
      },
    }),
    listAvailableImages(),
  ]);

  const items = products.map((p) => {
    const imageName = p.images[0]?.image_name;

    return {
      id: p.id,
      name: p.name ?? "ไม่ระบุชื่อสินค้า",
      description: p.description,
      price: Number(p.price ?? 0),
      category: p.category?.name ?? null,
      picture: imageName && availableImages.has(imageName) ? imageName : null,
    };
  });

  if (items.length === 0) {
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

  return <FeaturesProduct products={items} />;
}
