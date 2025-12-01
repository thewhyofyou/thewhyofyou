"use client";

import { useState } from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import Newsletter from "@/src/components/Newsletter";
import DownloadGuideModal from "@/src/components/DownloadGuideModal";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Download } from "lucide-react";

const freeGuides = [
  {
    id: 1,
    title: "House Indications Quick Guide",
    description: "Comprehensive reference for all 12 astrological houses. Learn the core meanings, life areas, and planetary influences for each house.",
    thumbnail: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=400&h=300&fit=crop",
    downloadLink: "/guides/House_Indications.pdf",
  },
  {
    id: 2,
    title: "Rahu & Ketu in Each House Reference",
    description: "Deep insights into the shadowy planets' placements. Discover how Rahu and Ketu influence different houses and life areas.",
    thumbnail: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=300&fit=crop",
    downloadLink: "/guides/Rahu_Ketu_in_Each_House.pdf",
  },
];

const FreeGuides = () => {
  const [selectedGuide, setSelectedGuide] = useState<typeof freeGuides[0] | null>(null);

  const handleDownload = (guide: typeof freeGuides[0]) => {
    setSelectedGuide(guide);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <DownloadGuideModal
        isOpen={selectedGuide !== null}
        onClose={() => setSelectedGuide(null)}
        guideTitle={selectedGuide?.title || ""}
        guideFile={selectedGuide?.downloadLink || ""}
      />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Free Astrology Guides
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Download our comprehensive astrology reference guides and deepen your cosmic understanding. 
            All guides are completely free and yours to keep forever.
          </p>

          <Newsletter />

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {freeGuides.map((guide) => {
              return (
                <Card key={guide.id} className="shadow-soft hover:shadow-glow transition-shadow duration-300 overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="w-full h-48 overflow-hidden">
                      <img 
                        src={guide.thumbnail} 
                        alt={guide.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 pb-0">
                      <CardTitle className="text-2xl mb-2">{guide.title}</CardTitle>
                      <CardDescription className="text-base">
                        {guide.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardFooter className="pt-6">
                    <Button 
                      onClick={() => handleDownload(guide)}
                      className="w-full"
                      size="lg"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Free Guide
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FreeGuides;
