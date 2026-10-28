import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";

const Blog = () => {
  useSeo({
    title: "Blog de Aceite Vegetal y Fritura para Hoteles y Restaurantes | Bonlife Oil",
    description: "Guías sobre aceite para freír, aceite vegetal y ahorro en cocinas de hoteles y restaurantes en República Dominicana.",
    path: "/blog",
  });
  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, meta_description, published_at, primary_keyword, town_id, dr_towns(name, slug)")
        .eq("status", "published")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Blog Bonlife Oil
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Guías, consejos y tendencias sobre aceite vegetal premium para la industria hotelera dominicana
            </p>
          </div>
        </section>

        {/* Posts grid */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-card rounded-xl p-6 animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-3" />
                  <div className="h-3 bg-muted rounded w-full mb-2" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : posts?.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                Próximamente nuevos artículos. ¡Vuelve pronto!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts?.map((post: any) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    {post.published_at && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.published_at).toLocaleDateString("es-DO", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    )}
                    {post.dr_towns && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {(post.dr_towns as any).name}
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {post.excerpt || post.meta_description}
                  </p>
                  <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Leer más <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground/70 py-8 text-center text-sm">
        <p>© {new Date().getFullYear()} Bonlife Oil — Aceite Vegetal Premium para Hoteles y Restaurantes en República Dominicana</p>
      </footer>
    </div>
  );
};

export default Blog;
