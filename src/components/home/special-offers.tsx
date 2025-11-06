import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Sparkles } from "lucide-react"

export function SpecialOffers() {
  const offers = [
    {
      id: "1",
      title: "Free Shipping",
      description: "On orders over $100",
      icon: ShoppingBag,
      color: "bg-blue-500",
    },
    {
      id: "2",
      title: "New Customer Deal",
      description: "Get 20% off your first order",
      icon: Sparkles,
      color: "bg-purple-500",
    },
    {
      id: "3",
      title: "Flash Sale",
      description: "Up to 50% off selected items",
      icon: Sparkles,
      color: "bg-red-500",
    },
  ]

  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
      <div className="container px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Special Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer) => {
            const Icon = offer.icon
            return (
              <Card key={offer.id} className="relative overflow-hidden">
                <div className={`${offer.color} absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-20`} />
                <CardContent className="p-6 relative">
                  <div className={`${offer.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                  <p className="text-muted-foreground mb-4">{offer.description}</p>
                  <Button asChild variant="outline">
                    <Link href="/products">Shop Now</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

