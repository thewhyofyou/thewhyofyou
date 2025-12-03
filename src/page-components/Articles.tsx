"use client";

import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { useEffect, useState } from "react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  url: string;
}

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    // Sample astrology articles
    setArticles([
      {
        id: "1",
        title: "The Art of Astrological Timing",
        excerpt: "Discover how to use planetary transits to make important life decisions and align with cosmic rhythms. Learn to work with the natural flow of the universe.",
        image: "https://images.unsplash.com/photo-1484600899469-230e8d1d59c0?w=400",
        url: "#",
      },
      {
        id: "2",
        title: "Venus and Relationships: Understanding Your Love Language",
        excerpt: "Explore how Venus placement in your chart influences your love style, relationship patterns, and what you truly value in partnerships.",
        image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400",
        url: "#",
      },
      {
        id: "3",
        title: "Saturn Return: Your Cosmic Coming of Age",
        excerpt: "Navigate this transformative transit that occurs around age 29-30 and emerge stronger, wiser, and more aligned with your authentic purpose.",
        image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400",
        url: "#",
      },
      {
        id: "4",
        title: "New Moon Intentions: Planting Seeds of Change",
        excerpt: "Learn how to harness the potent energy of the new moon to set powerful intentions and create meaningful change in your life.",
        image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400",
        url: "#",
      },
      {
        id: "5",
        title: "The North Node: Your Soul's Purpose",
        excerpt: "Discover how your North Node placement reveals your karmic path and the qualities you're meant to develop in this lifetime.",
        image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400",
        url: "#",
      },
      {
        id: "6",
        title: "Mars in Your Chart: Understanding Your Drive",
        excerpt: "Explore how Mars placement influences your motivation, assertiveness, and how you pursue your goals and desires.",
        image: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400",
        url: "#",
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
          Articles & Insights
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          Read in-depth articles about astrology, cosmic events, and spiritual guidance.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-soft transition-shadow duration-300 group cursor-pointer">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-display">{article.title}</CardTitle>
                <CardDescription>{article.excerpt}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Articles;
