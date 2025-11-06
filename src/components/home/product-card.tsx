import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart, Star } from "lucide-react"
import { Decimal } from "@prisma/client/runtime/library"

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number | Decimal
    images: string[]
    featured: boolean
    stock: number
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.images[0] || "/images/placeholder.jpg"
  const isOutOfStock = product.stock === 0
  const price = typeof product.price === "number" 
    ? product.price 
    : Number(product.price)

  return (
    <Card className="group hover:shadow-lg transition-shadow overflow-hidden">
      <Link href={`/products/${product.id}`}>
        <CardHeader className="p-0">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.featured && (
              <Badge className="absolute top-2 left-2 bg-primary">Featured</Badge>
            )}
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="destructive" className="text-lg px-4 py-2">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">(0)</span>
          </div>
          <p className="text-2xl font-bold">${price.toFixed(2)}</p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          className="flex-1"
          disabled={isOutOfStock}
        >
          <Heart className="h-4 w-4 mr-2" />
          Wishlist
        </Button>
        <Button className="flex-1" disabled={isOutOfStock}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

