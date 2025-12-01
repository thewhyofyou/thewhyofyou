"use client";

import { Card, CardContent } from "@/src/components/ui/card";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

interface Testimonial {
  id: number;
  name: string;
  content: string;
  rating: number;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    // WordPress REST API fetch would go here
    // For now, using mock data
    setTestimonials([
      {
        id: 1,
        name: "Sarah M.",
        content: "The reading was incredibly accurate and insightful. It helped me understand my life path better.",
        rating: 5,
      },
      {
        id: 2,
        name: "Michael R.",
        content: "I was skeptical at first, but the birth chart analysis revealed so much about my personality and relationships.",
        rating: 5,
      },
      {
        id: 3,
        name: "Emma L.",
        content: "The celestial guidance I received was transformative. Highly recommend to anyone seeking clarity.",
        rating: 5,
      },
    ]);
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl md:text-4xl font-display font-bold text-foreground">
            What Our Community Says
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover how celestial wisdom has transformed lives
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="shadow-soft hover:shadow-glow transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mb-4 text-foreground/80 italic">"{testimonial.content}"</p>
                <p className="font-semibold text-foreground">— {testimonial.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
