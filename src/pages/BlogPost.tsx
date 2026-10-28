import { useQuery } from "@tanstack/react-query";
import { useParams, Link, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Calendar, MapPin, ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSeo, SITE_URL } from "@/hooks/use-seo";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*, dr_towns(name, slug, province)")
        .eq("slug", slug!)
        .eq("status", "published")
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
    // "No rows" is a real miss (e.g. an archived post), not worth retrying.
    retry: (count, err: { code?: string }) => err?.code !== "PGRST116" && count < 3,
  });

  // Pruned posts are archived with a pointer to the post kept for their town.
  const { data: redirectSlug, isLoading: isRedirectLoading } = useQuery({
    queryKey: ["blog-redirect", slug],
    queryFn: async () => {
      const { data } = await supabase.rpc("get_blog_redirect", { p_slug: slug! });
      return data ?? null;
    },
    enabled: !!slug && !!error,
  });

  useSeo({
    title: post ? `${post.title} | Bonlife Oil Blog` : "Blog | Bonlife Oil",
    description: post?.meta_description || "",
    path: `/blog/${slug}`,
    noindex: !post,
    jsonLd: post?.schema_markup
      ? { ...(post.schema_markup as object), mainEntityOfPage: `${SITE_URL}/blog/${slug}` }
      : undefined,
  });

  if (redirectSlug) {
    return <Navigate to={`/blog/${redirectSlug}`} replace />;
  }

  if (isLoading || isRedirectLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 container mx-auto px-4">
          <div className="max-w-3xl mx-auto animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
            <div className="space-y-3 mt-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 bg-muted rounded" />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 container mx-auto px-4 text-center py-16">
          <h1 className="text-2xl font-bold text-foreground mb-4">Artículo no encontrado</h1>
          <Link to="/blog" className="text-primary hover:underline">
            ← Volver al blog
          </Link>
        </main>
      </div>
    );
  }

  const town = post.dr_towns as any;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="bg-muted/50 border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Inicio</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-primary">Blog</Link>
              <span>/</span>
              <span className="text-foreground truncate">{post.title}</span>
            </nav>
          </div>
        </div>

        {/* Article */}
        <article className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
                {post.published_at && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.published_at).toLocaleDateString("es-DO", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                )}
                {town && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {town.name}, {town.province}
                  </span>
                )}
                {post.word_count && (
                  <span>{Math.ceil(post.word_count / 200)} min de lectura</span>
                )}
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="text-lg text-muted-foreground mt-4 leading-relaxed">
                  {post.excerpt}
                </p>
              )}
            </header>

            {/* Content */}
            <div
              className="prose prose-lg max-w-none
                prose-headings:text-foreground prose-headings:font-bold
                prose-h2:text-xl prose-h2:md:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-lg prose-h3:md:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-li:text-muted-foreground
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* CTA */}
            <div className="mt-12 bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 text-center">
              <h3 className="text-xl font-bold text-foreground mb-2">
                ¿Listo para mejorar su cocina?
              </h3>
              <p className="text-muted-foreground mb-4">
                Contacte a Bonlife Oil hoy y ahorre hasta 20% en aceite vegetal premium
              </p>
              <a href="https://wa.me/18299876764" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contactar por WhatsApp
                </Button>
              </a>
            </div>

            {/* Back link */}
            <div className="mt-8">
              <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline">
                <ArrowLeft className="w-4 h-4" />
                Volver al blog
              </Link>
            </div>
          </div>
        </article>
      </main>

      <footer className="bg-foreground text-primary-foreground/70 py-8 text-center text-sm">
        <p>© {new Date().getFullYear()} Bonlife Oil — Aceite Vegetal Premium para Hoteles y Restaurantes en República Dominicana</p>
      </footer>
    </div>
  );
};

export default BlogPost;
