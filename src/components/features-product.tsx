/* eslint-disable @typescript-eslint/no-explicit-any */
import CartButton from "@/app/(front)/components/CartButton";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

type Props = {
  products: any[]
}

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
        {products.map((product, index) => (
          <article
            key={product.id}
            className="group flex flex-col border-3 border-foreground bg-card"
          >
            <div className="relative aspect-square w-full overflow-hidden border-b-3 border-foreground bg-sunken">
              <Image
                alt={product.name}
                className="size-full object-cover grayscale transition-[filter] duration-150 group-hover:grayscale-0"
                width={0}
                height={0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                src={`/product-image/${product.picture}`}
                loading="eager"
              />
              <span className="absolute top-0 left-0 border-r-3 border-b-3 border-foreground bg-background px-2 py-1 font-mono text-[11px] font-bold tracking-[1px]">
                NO.{String(product.id).padStart(3, "0")}
              </span>
              {index % 5 === 0 && (
                <Badge variant="featured" className="absolute top-2 right-2">
                  แนะนำ
                </Badge>
              )}
            </div>

            <div className="flex flex-1 flex-col p-sp3">
              <h3 className="rb-h4">{product.name}</h3>

              <div className="mt-sp3 flex items-baseline justify-between gap-3 border-t-3 border-foreground pt-sp2">
                <span className="rb-meta text-muted-foreground">ราคา / THB</span>
                <span className="font-mono text-[22px] font-bold">
                  {Number(product.price).toLocaleString("th-TH")}
                </span>
              </div>

              <div className="mt-sp3">
                <CartButton product={product} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default FeaturesProduct;
