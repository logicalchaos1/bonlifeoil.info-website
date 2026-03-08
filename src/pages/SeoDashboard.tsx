import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { RefreshCw, FileText, Globe, Key, TrendingUp, Loader2 } from "lucide-react";
import { useState } from "react";

const SeoDashboard = () => {
  const queryClient = useQueryClient();
  const [generating, setGenerating] = useState(false);

  const { data: posts } = useQuery({
    queryKey: ["admin-posts"],
    queryFn: async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*, dr_towns(name)")
        .order("created_at", { ascending: false });
      return data || [];
    },
  });

  const { data: keywords } = useQuery({
    queryKey: ["admin-keywords"],
    queryFn: async () => {
      const { data } = await supabase
        .from("seo_keywords")
        .select("*, dr_towns(name)")
        .order("search_volume", { ascending: false });
      return data || [];
    },
  });

  const { data: towns } = useQuery({
    queryKey: ["admin-towns"],
    queryFn: async () => {
      const { data } = await supabase.from("dr_towns").select("*").order("hotel_count", { ascending: false });
      return data || [];
    },
  });

  const { data: indexLogs } = useQuery({
    queryKey: ["admin-index-logs"],
    queryFn: async () => {
      const { data } = await supabase
        .from("indexing_log")
        .select("*, blog_posts(title)")
        .order("created_at", { ascending: false })
        .limit(20);
      return data || [];
    },
  });

  const generateBlog = async (count = 1) => {
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-blog", {
        body: { batch_count: count },
      });
      if (error) throw error;
      if (data?.success) {
        const successes = data.generated?.filter((r: any) => r.success)?.length || 0;
        toast.success(`${successes} blog(s) creados en español`);
        queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
        queryClient.invalidateQueries({ queryKey: ["admin-keywords"] });
      } else {
        toast.error(data?.error || "Error generando blog");
      }
    } catch (e: any) {
      toast.error(e.message || "Error generando blog");
    } finally {
      setGenerating(false);
    }
  };

  const requestIndexing = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("request-indexing");
      if (error) throw error;
      toast.success(`${data?.indexed?.length || 0} URLs enviadas para indexación`);
      queryClient.invalidateQueries({ queryKey: ["admin-index-logs"] });
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const runFullCron = async () => {
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("seo-cron", {
        body: { action: "generate_and_index" },
      });
      if (error) throw error;
      toast.success("Ciclo SEO completo ejecutado");
      queryClient.invalidateQueries();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setGenerating(false);
    }
  };

  const totalPosts = posts?.length || 0;
  const indexedPosts = posts?.filter((p: any) => p.is_indexed)?.length || 0;
  const unusedKeywords = keywords?.filter((k: any) => !k.is_used)?.length || 0;
  const totalTowns = towns?.length || 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            SEO Dashboard
          </h1>
          <div className="flex flex-wrap gap-2">
            <Button onClick={generateBlog} disabled={generating} size="sm">
              {generating ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <FileText className="w-4 h-4 mr-1" />}
              Generar Blog
            </Button>
            <Button onClick={requestIndexing} variant="outline" size="sm">
              <Globe className="w-4 h-4 mr-1" />
              Indexar
            </Button>
            <Button onClick={runFullCron} variant="secondary" disabled={generating} size="sm">
              <RefreshCw className="w-4 h-4 mr-1" />
              Ciclo Completo
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <FileText className="w-4 h-4" /> Posts
            </div>
            <p className="text-2xl font-bold text-foreground">{totalPosts}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Globe className="w-4 h-4" /> Indexados
            </div>
            <p className="text-2xl font-bold text-foreground">{indexedPosts}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Key className="w-4 h-4" /> Keywords Disponibles
            </div>
            <p className="text-2xl font-bold text-foreground">{unusedKeywords}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <TrendingUp className="w-4 h-4" /> Ciudades
            </div>
            <p className="text-2xl font-bold text-foreground">{totalTowns}</p>
          </Card>
        </div>

        {/* Blog Posts Table */}
        <Card className="mb-8 overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Blog Posts Recientes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 font-medium text-muted-foreground">Título</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Ciudad</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Estado</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Indexado</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {posts?.map((post: any) => (
                  <tr key={post.id} className="border-t border-border">
                    <td className="p-3">
                      <a href={`/blog/${post.slug}`} className="text-primary hover:underline font-medium line-clamp-1">
                        {post.title}
                      </a>
                    </td>
                    <td className="p-3 text-muted-foreground">{(post.dr_towns as any)?.name || "—"}</td>
                    <td className="p-3">
                      <Badge variant={post.status === "published" ? "default" : "secondary"}>
                        {post.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge variant={post.is_indexed ? "default" : "outline"}>
                        {post.is_indexed ? "✓ Sí" : "Pendiente"}
                      </Badge>
                    </td>
                    <td className="p-3 text-muted-foreground whitespace-nowrap">
                      {post.published_at ? new Date(post.published_at).toLocaleDateString("es-DO") : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Keywords */}
        <Card className="mb-8 overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Keywords ({keywords?.length || 0})</h2>
          </div>
          <div className="overflow-x-auto max-h-64 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 sticky top-0">
                <tr>
                  <th className="text-left p-3 font-medium text-muted-foreground">Keyword</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Ciudad</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Volumen</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Usado</th>
                </tr>
              </thead>
              <tbody>
                {keywords?.map((kw: any) => (
                  <tr key={kw.id} className="border-t border-border">
                    <td className="p-3 font-medium">{kw.keyword}</td>
                    <td className="p-3 text-muted-foreground">{(kw.dr_towns as any)?.name || "—"}</td>
                    <td className="p-3 text-muted-foreground">{kw.search_volume}</td>
                    <td className="p-3">
                      <Badge variant={kw.is_used ? "secondary" : "default"}>
                        {kw.is_used ? "Usado" : "Disponible"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Indexing Log */}
        <Card className="overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Log de Indexación</h2>
          </div>
          <div className="overflow-x-auto max-h-64 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 sticky top-0">
                <tr>
                  <th className="text-left p-3 font-medium text-muted-foreground">URL</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Estado</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {indexLogs?.map((log: any) => (
                  <tr key={log.id} className="border-t border-border">
                    <td className="p-3 text-primary truncate max-w-xs">{log.url}</td>
                    <td className="p-3">
                      <Badge variant={log.status === "submitted" ? "default" : "secondary"}>{log.status}</Badge>
                    </td>
                    <td className="p-3 text-muted-foreground whitespace-nowrap">
                      {new Date(log.created_at).toLocaleString("es-DO")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default SeoDashboard;
