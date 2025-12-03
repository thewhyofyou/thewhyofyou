"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/src/components/ui/button";
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navLinks = [{
    name: "Free Chart",
    href: "/free-chart"
  }, {
    name: "Free Guides",
    href: "/free-guides"
  }, {
    name: "Astro Reports",
    href: "/astro-reports"
  }];
  const rightNavLinks = [{
    name: "Videos",
    href: "/videos"
  }, {
    name: "Articles",
    href: "/articles"
  }, {
    name: "Readings",
    href: "/readings"
  }];
  return <nav className="sticky top-0 z-50 w-full border-b border-primary/20 bg-secondary/95 backdrop-blur supports-[backdrop-filter]:bg-secondary/90">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Left Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => <Link key={link.name} href={link.href} className="text-base font-medium text-primary/70 transition-colors hover:text-primary hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.5)] uppercase">
                {link.name}
              </Link>)}
          </div>

          {/* Center Logo */}
          <Link href="/" className="flex items-center group">
            <Image src="/logo.png" alt="The Why of You" width={144} height={144} className="h-36 w-auto transition-all group-hover:drop-shadow-[0_0_12px_rgba(255,215,0,0.6)]" />
          </Link>

          {/* Right Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {rightNavLinks.map(link => <Link key={link.name} href={link.href} className="text-base font-medium text-primary/70 transition-colors hover:text-primary hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.5)] uppercase">
                {link.name}
              </Link>)}
          </div>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && <div className="md:hidden py-6 space-y-4">
            {[...navLinks, ...rightNavLinks].map(link => <Link key={link.name} href={link.href} className="block text-lg font-medium text-foreground/80 hover:text-primary transition-colors uppercase" onClick={() => setMobileMenuOpen(false)}>
                {link.name}
              </Link>)}
          </div>}
      </div>
    </nav>;
};
export default Navbar;
