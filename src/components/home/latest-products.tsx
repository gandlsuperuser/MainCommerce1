import { prisma } from "@/lib/prisma"
import { ProductCard } from "./product-card"

export async function LatestProducts() {
  const products = await prisma.product.findMany({
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  })

  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="container px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Latest Products</h2>
          <a
            href="/products"
            className="text-primary hover:underline font-medium"
          >
            View All →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

