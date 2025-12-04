import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { getBlogs } from "@/lib/notion";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  url: string;
}

const Articles = async () => {
  let articles: Article[] = [];

  try {
    const blogs = await getBlogs();
    articles = blogs.map((blog) => ({
      id: blog.id,
      title: blog.title,
      excerpt: blog.summary,
      image: blog.image || "https://images.unsplash.com/photo-1484600899469-230e8d1d59c0?w=400",
      url: "#",
    }));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    articles = [];
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
          Articles & Insights
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          Read in-depth articles about astrology, cosmic events, and spiritual guidance.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-soft transition-shadow duration-300 group cursor-pointer">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-display">{article.title}</CardTitle>
                <CardDescription>{article.excerpt}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Articles;