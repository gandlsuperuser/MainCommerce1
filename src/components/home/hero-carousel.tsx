"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface HeroSlide {
  id: string
  title: string
  description: string
  image: string
  link: string
  buttonText: string
}

const heroSlides: HeroSlide[] = [
  {
    id: "1",
    title: "New Collection 2024",
    description: "Discover the latest trends in fashion and style",
    image: "/images/banner1.jpg",
    link: "/categories/t-shirts",
    buttonText: "Shop Now",
  },
  {
    id: "2",
    title: "Premium Quality",
    description: "Experience comfort and elegance like never before",
    image: "/images/banner2.jpg",
    link: "/categories/jeans",
    buttonText: "Explore",
  },
  {
    id: "3",
    title: "Special Offers",
    description: "Get up to 50% off on selected items",
    image: "/images/banner3.jpg",
    link: "/products",
    buttonText: "View Deals",
  },
]

export function HeroCarousel() {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {heroSlides.map((slide) => (
          <CarouselItem key={slide.id}>
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover rounded-lg"
                priority={slide.id === "1"}
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="container mx-auto px-4 text-center text-white">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                    {slide.description}
                  </p>
                  <Button asChild size="lg" className="text-lg px-8 py-6">
                    <Link href={slide.link}>{slide.buttonText}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4 bg-white/80 hover:bg-white" />
      <CarouselNext className="right-4 bg-white/80 hover:bg-white" />
    </Carousel>
  )
}
