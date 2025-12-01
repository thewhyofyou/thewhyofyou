import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import founderPhoto from "@/src/assets/founder-nadya.jpg";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
          About Us — the Why of You
        </h1>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-1">
            <img 
              src={founderPhoto} 
              alt="Nadya, Founder of the Why of You" 
              className="w-full rounded-lg shadow-luxury"
            />
            <p className="text-center mt-4 text-muted-foreground italic">Nadya, Founder</p>
          </div>

          <div className="md:col-span-2 space-y-6 text-foreground/90 text-lg leading-relaxed">
            <p>
              Welcome to <span className="font-semibold">the Why of You</span>, where your cosmic story is honored with wisdom, warmth, and heart.
            </p>

            <p>
              My name is <span className="font-semibold">Nadya</span>, and I'm the founder and guiding voice behind this space. My fascination with astrology began more than fifteen years ago—starting as a personal journey of self-discovery and blossoming into a lifelong passion for understanding the subtle energies that shape our lives.
            </p>

            <p>
              Over the years, I've immersed myself in the rich traditions of Vedic astrology and, at the same time, marveled at the clarity that the tropical zodiac brings to our modern world. Here at the Why of You, I weave together these two perspectives—combining the deep insight of Vedic techniques and principles with the practical lens of tropical astrology. My goal is to offer you astrological guidance that's not only meaningful, but also deeply compassionate and relevant to your unique path.
            </p>

            <p>
              Whether you're here to explore free charts, join our newsletter community, or dive into personalized readings and digital astrology resources, I'm truly honored to be part of your exploration. Every chart and every reading is prepared with care, respect, and an open-hearted intention to help you understand your soul's journey and life's possibilities.
            </p>

            <p>
              Thank you for being here. I invite you to reach out, ask questions, or simply enjoy discovering what the stars have to say about the "why" of you.
            </p>

            <p className="pt-4">
              <span className="block">With warm regards,</span>
              <span className="block font-display text-xl mt-2">Nadya</span>
              <span className="block text-muted-foreground">Founder, the Why of You</span>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
