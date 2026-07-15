import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/categories", label: "Categories" },
  { href: "/opportunities", label: "Opportunities" },
  { href: "/blog", label: "Learning Centre" },
  { href: "/roadmaps", label: "Roadmaps" },
  { href: "/risks", label: "Risks" },
];

export function Header() {
  return (
    <header className="border-b-4 border-bcentx-green bg-bcentx-blue shadow-sm">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3"
        aria-label="Primary"
      >
        <Link href="/" className="inline-flex items-center" aria-label="Bcentx Home">
          <Image
            src="/brand/LogoSVG.svg"
            alt="Bcentx"
            width={140}
            height={40}
            priority
            unoptimized
            className="h-10 w-auto"
          />
        </Link>
        <ul className="flex flex-wrap items-center gap-2 sm:gap-3">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-white no-underline transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
