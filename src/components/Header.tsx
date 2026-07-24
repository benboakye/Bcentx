"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/categories", label: "Categories" },
  { href: "/opportunities", label: "Opportunities" },
  { href: "/blog", label: "Learning Centre" },
  { href: "/roadmaps", label: "Roadmaps" },
  { href: "/risks", label: "Risks" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b-4 border-bcentx-green bg-bcentx-blue shadow-sm">
      <nav
        className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
        aria-label="Primary"
      >
        <Link href="/" className="inline-flex shrink-0 items-center" aria-label="Bcentx Home">
          <Image
            src="/brand/LogoSVG.svg"
            alt="Bcentx"
            width={140}
            height={40}
            priority
            unoptimized
            className="h-10 w-auto"
            style={{ width: "auto", height: "2.5rem" }}
          />
        </Link>
        <ul className="flex flex-wrap items-center gap-1 sm:justify-end sm:gap-2">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className="rounded-full px-3 py-1.5 text-sm font-semibold text-white no-underline transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
