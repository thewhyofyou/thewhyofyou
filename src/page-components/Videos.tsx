"use client";

import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
}

const Videos = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    // Sample YouTube videos from @theWhyofYou channel
    setVideos([
      {
        id: "1",
        title: "Understanding Your Birth Chart Basics",
        description: "Learn the fundamentals of reading your astrological birth chart and discover what the planets, houses, and signs reveal about your life path.",
        thumbnail: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=400",
        url: "https://www.youtube.com/@theWhyofYou",
      },
      {
        id: "2",
        title: "Mercury Retrograde: What It Really Means",
        description: "Demystifying Mercury retrograde and learning how to navigate communication challenges, technology issues, and travel delays during this cosmic phenomenon.",
        thumbnail: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400",
        url: "https://www.youtube.com/@theWhyofYou",
      },
      {
        id: "3",
        title: "Full Moon Rituals for Manifestation",
        description: "Harness the powerful energy of the full moon with these transformative rituals, release practices, and manifestation techniques.",
        thumbnail: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=400",
        url: "https://www.youtube.com/@theWhyofYou",
      },
      {
        id: "4",
        title: "Saturn Return: Your Cosmic Coming of Age",
        description: "Navigate your Saturn return with wisdom and grace. Learn what to expect during this transformative 2-3 year period and how to make the most of it.",
        thumbnail: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400",
        url: "https://www.youtube.com/@theWhyofYou",
      },
      {
        id: "5",
        title: "Understanding Your Rising Sign",
        description: "Your rising sign is your cosmic mask. Discover how your ascendant shapes your personality, first impressions, and life approach.",
        thumbnail: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=400",
        url: "https://www.youtube.com/@theWhyofYou",
      },
      {
        id: "6",
        title: "Working with Lunar Nodes",
        description: "Explore the North and South Nodes in your chart and understand your soul's karmic journey and life purpose.",
        thumbnail: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400",
        url: "https://www.youtube.com/@theWhyofYou",
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
          Video Library
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          Watch our collection of astrology videos and cosmic insights from @theWhyofYou.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {videos.map((video) => (
            <a key={video.id} href={video.url} target="_blank" rel="noopener noreferrer">
              <Card className="overflow-hidden hover:shadow-soft transition-shadow duration-300 group cursor-pointer">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-secondary/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-display">{video.title}</CardTitle>
                  <CardDescription>{video.description}</CardDescription>
                </CardHeader>
              </Card>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Videos;
