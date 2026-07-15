import Link from "next/link";

const footerLinks = [
  { href: "/platforms", label: "Platforms" },
  { href: "/countries", label: "Countries" },
  { href: "/glossary", label: "Glossary" },
  { href: "/legal", label: "Legal & Disclosures" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-bcentx-blue/20 bg-bcentx-blue text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-semibold">Bcentx</p>
          <p className="mt-1 max-w-md text-sm text-white/80">
            Wealth-building intelligence, without the hype. Educational content only —
            not personalized financial, legal, or tax advice.
          </p>
        </div>
        <ul className="flex flex-wrap gap-3 text-sm">
          {footerLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-white/90 no-underline hover:text-white hover:underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-white/10 px-4 py-3 text-center text-xs text-white/70">
        © {new Date().getFullYear()} Bcentx. All rights reserved.
      </div>
    </footer>
  );
}
