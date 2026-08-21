import Link from "next/link";

const links = [
  { href: "/", label: "หน้าหลัก" },
  { href: "/product", label: "สินค้า" },
  { href: "/course", label: "หลักสูตร" },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/contact", label: "ติดต่อเรา" },
];

export default async function AppFooter() {
  // Cache Components: the copyright year is a time-dependent value, so the
  // footer is cached rather than blocking prerender on new Date().
  "use cache";

  return (
    <footer className="border-t-5 border-foreground">
      <div className="mx-auto flex max-w-(--breakpoint-xl) flex-col gap-sp4 px-4 py-sp5 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div>
          <p className="rb-h3">NT</p>
          <p className="mt-sp2 rb-meta text-muted-foreground">
            E&mdash;COMMERCE / BANGKOK TH
          </p>
        </div>

        <nav className="lg:min-w-[240px]">
          <p className="rb-meta text-muted-foreground">SITEMAP</p>
          <ul className="mt-sp2 border-t-3 border-foreground">
            {links.map((l) => (
              <li key={l.href} className="border-b-3 border-foreground">
                <Link
                  href={l.href}
                  className="block py-3 text-[16px] transition-colors duration-75 hover:bg-foreground hover:text-background hover:no-underline"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t-3 border-foreground">
        <div className="mx-auto flex max-w-(--breakpoint-xl) flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-6 lg:px-8">
          <p className="rb-meta">
            &copy; {new Date().getFullYear()} NT
          </p>
          <a href="mailto:codingthailand@gmail.com" className="rb-link font-mono text-[13px]">
            codingthailand@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
