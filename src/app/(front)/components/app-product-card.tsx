'use client'

type Props = {
  name: string;
  price: number;
  stock?: number;
  onAddToCart: (name: string) => void;
}

export default function AppProductCard({ name, price, stock = 0, onAddToCart }: Props) {
  return (
    <div className="w-60 border-3 border-foreground bg-card p-sp3">
      <h2 className="rb-h4">{name}</h2>
      <p className="mt-sp2 font-mono text-[15px]">ราคา {price.toLocaleString("th-TH")} บาท</p>
      {
        stock > 0 && (
          <div className="mt-sp3 border-t-3 border-foreground pt-sp2">
            <p className="rb-meta text-muted-foreground">คงเหลือ {stock}</p>
            <button
              onClick={() => onAddToCart(name)}
              className="mt-sp2 w-full border-3 border-foreground bg-foreground px-4 py-2 text-[12px] font-semibold tracking-[2px] text-background uppercase transition-colors duration-75 hover:bg-background hover:text-foreground"
            >
              เพิ่มลงตะกร้า
            </button>
          </div>
        )
      }
    </div>
  );
}
