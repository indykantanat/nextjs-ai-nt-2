import prisma from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const instant = false;

export default async function CustomerPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const pageSize = 5;

  const [customers, totalCustomers] = await Promise.all([
    prisma.customer.findMany({
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      orderBy: { id: "asc" },
    }),
    prisma.customer.count(),
  ]);

  const totalPages = Math.ceil(totalCustomers / pageSize);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">รายชื่อลูกค้า</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>ชื่อ</TableHead>
              <TableHead>ที่อยู่</TableHead>
              <TableHead>เบอร์โทรศัพท์</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  ไม่พบข้อมูลลูกค้า
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center space-x-2 py-4">
        <Button
          variant="outline"
          disabled={currentPage <= 1}
          asChild
        >
          <Link href={`/customer?page=${currentPage - 1}`}>
            ก่อนหน้า
          </Link>
        </Button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            asChild
          >
            <Link href={`/customer?page=${page}`}>{page}</Link>
          </Button>
        ))}

        <Button
          variant="outline"
          disabled={currentPage >= totalPages}
          asChild
        >
          <Link href={`/customer?page=${currentPage + 1}`}>
            ถัดไป
          </Link>
        </Button>
      </div>
    </div>
  );
}
