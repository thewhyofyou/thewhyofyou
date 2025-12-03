"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/src/components/ui/carousel";
import { Button } from "@/src/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  url: string;
}

const BlogArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    // Sample astrology articles
    setArticles([
      {
        id: "1",
        title: "Nadya is the best and works from her computer",
        excerpt: "An inspiring story about the amazing Nadya and her incredible journey through the mystical world of astrology and cosmic wisdom.",
        image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400",
        url: "/articles",
      },
      {
        id: "2",
        title: "Venus and Relationships: Understanding Your Love Language",
        excerpt: "Explore how Venus placement in your chart influences your love style, relationship patterns, and what you truly value in partnerships.",
        image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400",
        url: "/articles",
      },
      {
        id: "3",
        title: "Saturn Return: Your Cosmic Coming of Age",
        excerpt: "Navigate this transformative transit that occurs around age 29-30 and emerge stronger, wiser, and more aligned with your authentic purpose.",
        image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400",
        url: "/articles",
      },
      {
        id: "4",
        title: "New Moon Intentions: Planting Seeds of Change",
        excerpt: "Learn how to harness the potent energy of the new moon to set powerful intentions and create meaningful change in your life.",
        image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400",
        url: "/articles",
      },
      {
        id: "5",
        title: "The North Node: Your Soul's Purpose",
        excerpt: "Discover how your North Node placement reveals your karmic path and the qualities you're meant to develop in this lifetime.",
        image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400",
        url: "/articles",
      },
      {
        id: "6",
        title: "Mars in Your Chart: Understanding Your Drive",
        excerpt: "Explore how Mars placement influences your motivation, assertiveness, and how you pursue your goals and desires.",
        image: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400",
        url: "/articles",
      },
    ]);
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl md:text-4xl font-display font-bold text-foreground">
            Astrology Insights
          </h2>
          <p className="text-lg text-muted-foreground">
            Deepen your cosmic knowledge with our latest articles
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {articles.map((article) => (
                <CarouselItem key={article.id} className="md:basis-1/3">
                  <a href={article.url} className="h-full block">
                    <Card className="overflow-hidden hover:shadow-soft transition-shadow duration-300 group cursor-pointer h-full flex flex-col">
                      <div className="relative aspect-video overflow-hidden">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardHeader className="flex-grow">
                        <CardTitle className="text-xl font-display">{article.title}</CardTitle>
                        <CardDescription>{article.excerpt}</CardDescription>
                      </CardHeader>
                    </Card>
                  </a>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 -translate-x-12" />
            <CarouselNext className="right-0 translate-x-12" />
          </Carousel>
        </div>
        
        <div className="text-center mt-8">
          <Link href="/articles">
            <Button size="lg" className="bg-primary text-black border-2 border-primary hover:bg-transparent hover:text-black hover:border-primary">
              View All Articles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogArticles;
