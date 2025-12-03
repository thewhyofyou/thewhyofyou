import Navbar from "@/src/components/Navbar";
import Hero from "@/src/components/Hero";
import Newsletter from "@/src/components/Newsletter";
import Testimonials from "@/src/components/Testimonials";
import YouTubeVideos from "@/src/components/YouTubeVideos";
import BlogArticles from "@/src/components/BlogArticles";
import Footer from "@/src/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Newsletter />
      <Testimonials />
      <YouTubeVideos />
      <BlogArticles />
      <Footer />
    </div>
  );
};

export default Index;
