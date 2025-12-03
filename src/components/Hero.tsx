import { Button } from "@/src/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-celestial">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(/hero-celestial.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Mystical glow effect */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20 text-center">
        <h1 className="mb-6 text-5xl md:text-7xl font-display font-bold text-primary animate-in fade-in slide-in-from-bottom-4 duration-1000 drop-shadow-[0_0_30px_rgba(255,215,0,0.3)]">
          Discover Your <span className="text-white">Cosmic Path</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg md:text-xl text-primary/90 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
          Unlock the secrets of the stars with personalized astrology readings, free birth charts, and celestial
          guidance tailored just for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <Link href="/readings">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-accent hover:text-white hover:border-white border-2 border-primary shadow-glow-intense"
            >
              Personalized Readings
            </Button>
          </Link>
          <Link href="/astro-reports">
            <Button
              size="lg"
              variant="outline"
              className="border-primary/50 text-primary hover:bg-accent hover:text-white hover:border-white backdrop-blur"
            >
              Astrology Reports
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Hero;
