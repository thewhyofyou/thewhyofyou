"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Mail } from "lucide-react";
import { useToast } from "@/src/hooks/use-toast";
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const {
    toast
  } = useToast();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // WordPress API integration would go here
    toast({
      title: "Success!",
      description: "You've been subscribed to our cosmic newsletter."
    });
    setEmail("");
  };
  return <section className="py-6 px-6 bg-gradient-mystical rounded-lg">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-2 text-2xl md:text-3xl font-display font-semibold text-primary flex items-center justify-center gap-2">
          <Mail className="h-7 w-7 self-center my-[2px] mb-0 mt-[5px]" />
          Stay Updated
        </h2>
        <p className="mb-4 text-base text-primary/80">
          Subscribe to our newsletter for updates on new free resources and guides to support your astrological journey.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required className="flex-1 h-11" aria-label="Email address" />
          <Button type="submit" size="lg" variant="accent">
            Subscribe
          </Button>
        </form>
      </div>
    </section>;
};
export default Newsletter;
