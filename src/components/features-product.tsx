import CartButton from "@/app/(front)/components/CartButton";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export type ProductListItem = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
  /** ชื่อไฟล์ใน public/product-image — null เมื่อยังไม่มีรูปจริง */
  picture: string | null;
};

type Props = {
  products: ProductListItem[];
};

const FeaturesProduct = ({ products }: Props) => {
  return (
    <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-sp6 sm:px-6 lg:px-8">
      {/* Section head — asymmetric, left aligned, rule underneath */}
      <header className="border-b-5 border-foreground pb-sp3">
        <p className="rb-meta">[ 02 ] &mdash; CATALOG</p>
        <div className="mt-sp2 flex flex-wrap items-end justify-between gap-sp3">
          <h2 className="rb-h2">สินค้าทั้งหมด</h2>
          <p className="font-mono text-[15px] tracking-[1px] uppercase">
            {String(products.length).padStart(3, "0")} ITEMS
          </p>
        </div>
      </header>

      <div className="mt-sp5 grid grid-cols-1 gap-sp4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="group flex flex-col border-3 border-foreground bg-card"
          >
            <div className="relative aspect-square w-full overflow-hidden border-b-3 border-foreground bg-sunken">
              {product.picture ? (
                <Image
                  alt={product.name}
                  className="size-full object-cover grayscale transition-[filter] duration-150 group-hover:grayscale-0"
                  width={0}
                  height={0}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  src={`/product-image/${product.picture}`}
                  loading="eager"
                />
              ) : (
                // ไม่มีไฟล์รูป — ใช้ตัวอักษรทำงานแทนตามหลัก RawBlock
                <div className="flex size-full flex-col items-center justify-center gap-2 p-sp3 text-center">
                  <span className="rb-meta text-muted-foreground">NO IMAGE</span>
                  <span className="font-heading text-[40px] leading-none uppercase">
                    {String(product.id).padStart(2, "0")}
                  </span>
                </div>
              )}
              <span className="absolute top-0 left-0 border-r-3 border-b-3 border-foreground bg-background px-2 py-1 font-mono text-[11px] font-bold tracking-[1px]">
                NO.{String(product.id).padStart(3, "0")}
              </span>
              {product.category && (
                <Badge variant="featured" className="absolute top-2 right-2">
                  {product.category}
                </Badge>
              )}
            </div>

            <div className="flex flex-1 flex-col p-sp3">
              <h3 className="rb-h4">{product.name}</h3>
              {product.description && (
                <p className="mt-sp2 line-clamp-2 text-[14px] leading-[1.5] text-muted-foreground">
                  {product.description}
                </p>
              )}

              <div className="mt-auto">
                <div className="mt-sp3 flex items-baseline justify-between gap-3 border-t-3 border-foreground pt-sp2">
                  <span className="rb-meta text-muted-foreground">ราคา / THB</span>
                  <span className="font-mono text-[22px] font-bold">
                    {product.price.toLocaleString("th-TH")}
                  </span>
                </div>

                <div className="mt-sp3">
                  <CartButton product={product} />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default FeaturesProduct;
