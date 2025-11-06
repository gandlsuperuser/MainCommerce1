import { HeroCarousel } from "@/components/home/hero-carousel"
import { FeaturedCategories } from "@/components/home/featured-categories"
import { FeaturedProducts } from "@/components/home/featured-products"
import { LatestProducts } from "@/components/home/latest-products"
import { SpecialOffers } from "@/components/home/special-offers"
import { Testimonials } from "@/components/home/testimonials"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Banner Carousel */}
      <section className="mb-8 pt-8">
        <div className="container px-4">
          <HeroCarousel />
        </div>
      </section>

      {/* Featured Categories */}
      <FeaturedCategories />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Latest Products */}
      <LatestProducts />

      {/* Special Offers */}
      <SpecialOffers />

      {/* Customer Testimonials */}
      <Testimonials />
    </div>
  )
}
