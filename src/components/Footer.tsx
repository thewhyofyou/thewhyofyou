"use client";

import Link from "next/link";
import { Facebook, Instagram, Youtube, Twitter, Mail, Sparkles } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useState } from "react";
import { useToast } from "@/src/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success!",
      description: "You've been subscribed to our newsletter.",
    });
    setEmail("");
  };

  return (
    <footer className="bg-gradient-celestial border-t border-primary/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-primary drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
              <span className="font-display text-xl font-semibold text-primary">Celestial Wisdom</span>
            </div>
            <p className="text-sm text-primary/70">
              Your guide to cosmic understanding and celestial navigation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/free-chart" className="text-sm text-primary/70 hover:text-primary transition-colors">
                  Free Birth Chart
                </Link>
              </li>
              <li>
                <Link href="/astro-reports" className="text-sm text-primary/70 hover:text-primary transition-colors">
                  Astro Reports
                </Link>
              </li>
              <li>
                <Link href="/readings" className="text-sm text-primary/70 hover:text-primary transition-colors">
                  Book a Reading
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display font-semibold mb-4 text-primary">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/articles" className="text-sm text-primary/70 hover:text-primary transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/videos" className="text-sm text-primary/70 hover:text-primary transition-colors">
                  Videos
                </Link>
              </li>
              <li>
                <Link href="/free-guides" className="text-sm text-primary/70 hover:text-primary transition-colors">
                  Free Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display font-semibold mb-4 text-primary">Stay Connected</h3>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2 mb-4">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-secondary/50 border-primary/30 text-primary placeholder:text-primary/50"
              />
              <Button type="submit" variant="accent" className="w-full">
                Subscribe
              </Button>
            </form>
            <div className="flex space-x-4">
              <a href="#" className="text-primary/70 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary/70 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary/70 hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary/70 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-primary/60">
            © 2024 Celestial Wisdom. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/about" className="text-sm text-primary/70 hover:text-primary transition-colors">
              About Us
            </Link>
            <Link href="/privacy" className="text-sm text-primary/70 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-primary/70 hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
