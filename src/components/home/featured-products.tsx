import { prisma } from "@/lib/prisma"
import { ProductCard } from "./product-card"

export async function FeaturedProducts() {
  const products = await prisma.product.findMany({
    where: {
      featured: true,
    },
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <section className="py-12 md:py-16">
      <div className="container px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

