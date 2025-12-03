"use client";

import { useState } from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { ShoppingCart, Star, FileText } from "lucide-react";
import PurchaseModal from "@/src/components/PurchaseModal";

const astroReports = [
  {
    id: "natal-chart-report",
    title: "Complete Natal Chart Analysis",
    description: "A comprehensive 25-30 page analysis of your birth chart including planetary positions, house placements, aspects, and detailed life predictions.",
    preview: "Discover your karmic path, strengths, challenges, and life purpose through detailed Vedic astrology calculations.",
    icon: Star,
    price: 49.99,
    features: [
      "Detailed planetary analysis",
      "House-by-house breakdown",
      "Major yogas and combinations",
      "Dasha predictions (10 years)",
      "Remedial suggestions"
    ]
  },
  {
    id: "career-report",
    title: "Career & Finance Report",
    description: "Specialized report focusing on your professional life, career path, financial prospects, and ideal vocations based on your chart.",
    preview: "Understand your professional strengths, optimal career timing, and wealth-building periods through astrological analysis.",
    icon: FileText,
    price: 34.99,
    features: [
      "Career aptitude analysis",
      "Financial prospect timeline",
      "Business vs. job suitability",
      "Favorable career periods",
      "Wealth yoga analysis"
    ]
  },
  {
    id: "relationship-report",
    title: "Relationship & Marriage Report",
    description: "In-depth analysis of your romantic relationships, marriage timing, compatibility factors, and partnership prospects.",
    preview: "Explore your relationship patterns, marriage timing, and what you need in a life partner through Vedic wisdom.",
    icon: Star,
    price: 39.99,
    features: [
      "Marriage timing analysis",
      "Relationship patterns",
      "Partner characteristics",
      "Love vs. arranged marriage",
      "Compatibility factors"
    ]
  },
];

const AstroReports = () => {
  const [selectedReport, setSelectedReport] = useState<typeof astroReports[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyClick = (report: typeof astroReports[0]) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Premium Astrology Reports
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Professional astrology reports tailored to your unique cosmic signature. 
            Instant digital delivery with detailed insights and personalized predictions.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {astroReports.map((report) => {
              const IconComponent = report.icon;
              return (
                <Card key={report.id} className="shadow-soft hover:shadow-glow transition-shadow duration-300 flex flex-col">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-divine flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-secondary" />
                    </div>
                    <CardTitle className="text-xl">{report.title}</CardTitle>
                    <CardDescription className="text-base">
                      {report.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="mb-4 p-3 bg-muted rounded-md">
                      <p className="text-sm text-muted-foreground italic">
                        {report.preview}
                      </p>
                    </div>
                    <ul className="space-y-2">
                      {report.features.map((feature, idx) => (
                        <li key={idx} className="text-sm flex items-start">
                          <span className="text-primary mr-2">✦</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3">
                    <div className="w-full text-center">
                      <span className="text-3xl font-bold text-gradient-divine">
                        ${report.price}
                      </span>
                    </div>
                    <Button 
                      onClick={() => handleBuyClick(report)}
                      className="w-full"
                      size="lg"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Buy This Report
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 p-6 bg-gradient-mystical rounded-lg border border-border">
            <h2 className="text-2xl font-display font-semibold mb-3 text-primary">Secure Digital Delivery</h2>
            <p className="text-primary/80 mb-4">
              All reports are professionally prepared and delivered securely to your email within 24-48 hours. 
              Payment processing is handled by Stripe for maximum security.
            </p>
            <div className="flex gap-4 text-sm text-primary/70">
              <span>🔒 Secure Payment</span>
              <span>📧 Email Delivery</span>
              <span>📄 PDF Format</span>
              <span>💫 Professional Analysis</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {selectedReport && (
        <PurchaseModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedReport(null);
          }}
          reportTitle={selectedReport.title}
          reportId={selectedReport.id}
          price={selectedReport.price}
        />
      )}
    </div>
  );
};

export default AstroReports;
