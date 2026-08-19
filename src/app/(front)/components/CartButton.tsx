/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart-store";

export default function CartButton({ product }: any) {
  const addItem = useCartStore((state) => state.addItem);   

  const handleAddItem = () => {
     addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        qty: 1
     });   
  }

  return (
    <Button variant="secondary" className="w-full" onClick={handleAddItem}>
      หยิบใส่ตะกร้า
    </Button>
  );
}
