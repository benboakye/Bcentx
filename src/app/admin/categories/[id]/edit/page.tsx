import Link from "next/link";
import { notFound } from "next/navigation";
import { updateCategory } from "@/app/admin/categories/actions";
import { CategoryForm } from "@/app/admin/categories/category-form";
import { getAdminCategory } from "@/lib/admin/categories";

export const metadata = {
  title: "Admin · Edit category",
};

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await getAdminCategory(id);

  if (!category) {
    notFound();
  }

  const boundUpdate = updateCategory.bind(null, category.id);

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
          / Edit
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-bcentx-blue">
          Edit category
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-bcentx-gray">
          {category.code} · {category.name}
        </p>
      </div>

      <div className="rounded-2xl border border-bcentx-blue/10 bg-white p-6 shadow-[0_4px_20px_rgba(27,20,94,0.06)] sm:p-8">
        <CategoryForm
          category={category}
          action={boundUpdate}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
}
