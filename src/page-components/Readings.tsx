"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Clock } from "lucide-react";
import BookingModal from "@/src/components/BookingModal";

const Readings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    type: "natal_chart" | "natal_chart_30" | "compatibility";
    title: string;
    price: number;
  } | null>(null);

  const handleBookClick = (type: "natal_chart" | "natal_chart_30" | "compatibility", title: string, price: number) => {
    setSelectedService({ type, title, price });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4 text-center">
            Personal Readings
          </h1>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Book a one-on-one reading for personalized cosmic guidance delivered as an audio recording
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 30-Minute Natal Chart Reading Card */}
            <Card className="flex flex-col bg-gradient-to-br from-accent/5 to-primary/5 border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-glow overflow-hidden">
              <Image 
                src="/reading-30min-header.jpg" 
                alt="30-Minute Astrology Reading" 
                width={400}
                height={192}
                className="w-full h-48 object-cover"
              />
              <CardHeader className="space-y-4">
                <CardTitle className="text-2xl font-display text-center">
                  30-Minute Astrology Reading
                </CardTitle>
                <CardDescription className="text-center text-base">
                  A focused 30-minute audio recording covering key aspects of your birth chart. 
                  Perfect for getting quick insights or exploring specific questions.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 space-y-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Delivery time: ~2 weeks (audio file)</span>
                </div>
                <p className="text-3xl font-bold text-center text-foreground">$99</p>
              </CardContent>

              <CardFooter>
                <Button 
                  className="w-full bg-primary text-foreground border-2 border-primary hover:bg-foreground hover:text-primary hover:border-primary transition-all text-lg py-6"
                  onClick={() => handleBookClick("natal_chart_30", "30-Minute Astrology Reading", 99)}
                >
                  Book This Reading
                </Button>
              </CardFooter>
            </Card>

            {/* Natal Chart Reading Card */}
            <Card className="flex flex-col bg-gradient-to-br from-primary/5 to-accent/5 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-glow overflow-hidden">
              <Image 
                src="/reading-60min-header.jpg" 
                alt="60-Minute Natal Chart Reading" 
                width={400}
                height={192}
                className="w-full h-48 object-cover"
              />
              <CardHeader className="space-y-4">
                <CardTitle className="text-2xl font-display text-center">
                  60-Minute Natal Chart Reading
                </CardTitle>
                <CardDescription className="text-center text-base">
                  An in-depth, personalized 60-minute reading of your birth chart including key planetary positions and life themes. 
                  Delivered as an audio recording, with your specific questions answered.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 space-y-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Delivery time: ~2 weeks (audio file)</span>
                </div>
                <p className="text-3xl font-bold text-center text-foreground">$149</p>
              </CardContent>

              <CardFooter>
                <Button 
                  className="w-full bg-primary text-foreground border-2 border-primary hover:bg-foreground hover:text-primary hover:border-primary transition-all text-lg py-6"
                  onClick={() => handleBookClick("natal_chart", "60-Minute Natal Chart Reading", 149)}
                >
                  Book This Reading
                </Button>
              </CardFooter>
            </Card>

            {/* Compatibility Reading Card */}
            <Card className="flex flex-col bg-gradient-to-br from-secondary/5 to-accent/5 border-2 hover:border-secondary/50 transition-all duration-300 hover:shadow-glow overflow-hidden">
              <Image 
                src="/reading-compatibility-header.jpg" 
                alt="Compatibility / Couple's Reading" 
                width={400}
                height={192}
                className="w-full h-48 object-cover"
              />
              <CardHeader className="space-y-4">
                <CardTitle className="text-2xl font-display text-center">
                  Compatibility / Couple's Reading
                </CardTitle>
                <CardDescription className="text-center text-base">
                  Astrological compatibility insight for couples: understand your relationship dynamics, strengths, 
                  and growth areas, delivered as a personalized audio interpretation.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 space-y-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Delivery time: ~2 weeks (audio file)</span>
                </div>
                <p className="text-3xl font-bold text-center text-foreground">$199</p>
              </CardContent>

              <CardFooter>
                <Button 
                  className="w-full bg-primary text-foreground border-2 border-primary hover:bg-foreground hover:text-primary hover:border-primary transition-all text-lg py-6"
                  onClick={() => handleBookClick("compatibility", "Compatibility / Couple's Reading", 199)}
                >
                  Book This Reading
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />

      {selectedService && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedService(null);
          }}
          serviceType={selectedService.type}
          serviceTitle={selectedService.title}
          price={selectedService.price}
        />
      )}
    </div>
  );
};

export default Readings;
