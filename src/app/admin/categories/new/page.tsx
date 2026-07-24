import Link from "next/link";
import { createCategory } from "@/app/admin/categories/actions";
import { CategoryForm } from "@/app/admin/categories/category-form";

export const metadata = {
  title: "Admin · New category",
};

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bcentx-green-dark">
          <Link href="/admin" className="hover:underline">
            Admin
          </Link>{" "}
          /{" "}
          <Link href="/admin/categories" className="hover:underline">
            Categories
          </Link>{" "}
          / New
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-bcentx-blue">
          New category
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-bcentx-gray">
          Draft by default until you set status to published.
        </p>
      </div>

      <div className="rounded-2xl border border-bcentx-blue/10 bg-white p-6 shadow-[0_4px_20px_rgba(27,20,94,0.06)] sm:p-8">
        <CategoryForm action={createCategory} submitLabel="Create category" />
      </div>
    </div>
  );
}
