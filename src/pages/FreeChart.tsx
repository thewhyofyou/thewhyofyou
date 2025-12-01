"use client";

import { useState } from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { BirthChartForm } from "@/src/components/BirthChartForm";
import { NorthIndianChart } from "@/src/components/NorthIndianChart";
import { SouthIndianChart } from "@/src/components/SouthIndianChart";
import { CircularChart } from "@/src/components/CircularChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Alert, AlertDescription } from "@/src/components/ui/alert";
import { InfoIcon, Loader2 } from "lucide-react";
import { useToast } from "@/src/hooks/use-toast";


const FreeChart = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [chartView, setChartView] = useState<"north" | "south" | "circular">("south");
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (formData: any) => {
    try {
      setIsCalculating(true);
      setChartView(formData.chartStyle);
      
      // Parse location data
      const locationData = JSON.parse(formData.location);
      
      // Call backend edge function to calculate chart
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/calculate-chart`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            date: formData.date.toISOString().split('T')[0],
            time: formData.time,
            latitude: locationData.lat,
            longitude: locationData.lng,
            timezone: locationData.timezone,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to calculate chart');
      }

      const data = await response.json();
      setChartData(data);
      
      toast({
        title: "Chart calculated successfully",
        description: "Your birth chart has been generated using astronomical calculations.",
      });
    } catch (error) {
      console.error('Error calculating chart:', error);
      toast({
        title: "Error calculating chart",
        description: "Please try again or contact support if the issue persists.",
        variant: "destructive",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Get Your Free Birth Chart
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Discover the cosmic blueprint of your life with a personalized Vedic birth chart analysis using the tropical zodiac.
          </p>

          <Alert className="mb-8">
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              This calculator uses the tropical zodiac system with astronomical algorithms for planetary positions and house calculations.
              Timezone is automatically determined from your selected location. For highest accuracy, consider integrating with a Swiss Ephemeris API service.
            </AlertDescription>
          </Alert>

          <Card className="max-w-2xl mx-auto">
            <CardContent className="text-center py-20">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient-divine mb-4">
                Coming Soon!
              </h2>
              <p className="text-2xl text-muted-foreground/80 font-light">
                Your free birthchart generator
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FreeChart;
