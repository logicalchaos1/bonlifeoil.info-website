import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Gift, Users, DollarSign, Share2, Copy, Check, Star } from "lucide-react";
import { motion } from "framer-motion";

const ReferralProgram = () => {
  const [searchParams] = useSearchParams();
  const refCode = searchParams.get("ref");

  const [step, setStep] = useState<"info" | "signup" | "share">(refCode ? "signup" : "info");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  // Referrer signup
  const [referrerName, setReferrerName] = useState("");
  const [referrerCompany, setReferrerCompany] = useState("");
  const [referrerEmail, setReferrerEmail] = useState("");
  const [referrerPhone, setReferrerPhone] = useState("");

  // Referred lead signup
  const [leadName, setLeadName] = useState("");
  const [leadCompany, setLeadCompany] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadEmail, setLeadEmail] = useState("");

  const generateCode = () => {
    return referrerCompany
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 6) + Math.random().toString(36).slice(2, 6).toUpperCase();
  };

  const handleReferrerSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referrerName.trim() || !referrerCompany.trim() || !referrerEmail.trim()) return;

    setLoading(true);
    const code = generateCode();

    const { error } = await supabase.from("referrals").insert({
      referrer_name: referrerName.trim().slice(0, 100),
      referrer_company: referrerCompany.trim().slice(0, 200),
      referrer_email: referrerEmail.trim().slice(0, 255),
      referrer_phone: referrerPhone.trim().slice(0, 20) || null,
      referral_code: code,
    });

    setLoading(false);
    if (error) {
      toast.error("Error al registrarse. Intente de nuevo.");
      return;
    }

    setGeneratedCode(code);
    setStep("share");
    toast.success("¡Registro exitoso! Comparta su código para ganar descuentos.");
  };

  const handleLeadSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadPhone.trim()) return;

    setLoading(true);
    const { error } = await supabase.from("leads").insert({
      name: leadName.trim().slice(0, 100),
      company: leadCompany.trim().slice(0, 200) || null,
      phone: leadPhone.trim().slice(0, 20),
      email: leadEmail.trim().slice(0, 255) || null,
      source: "referral_program",
      referral_code: refCode,
    });

    if (!error && refCode) {
      await supabase.rpc("increment_referral_count" as any, { code: refCode }).catch(() => {});
    }

    setLoading(false);
    if (error) {
      toast.error("Error al enviar. Intente de nuevo.");
      return;
    }

    toast.success("¡Solicitud enviada! Le contactaremos pronto con su descuento especial.");
    setStep("info");
  };

  const shareUrl = `https://bonlifeoil.info/referidos?ref=${generatedCode}`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("¡Enlace copiado!");
    setTimeout(() => setCopied(false), 3000);
  };

  const benefits = [
    { icon: DollarSign, title: "5% Descuento", desc: "Por cada hotel que refiera y haga su primera compra" },
    { icon: Users, title: "Sin Límite", desc: "Refiera tantos hoteles como quiera, acumule descuentos" },
    { icon: Gift, title: "Regalo Extra", desc: "Al referir 5+ hoteles, reciba una bonificación especial" },
    { icon: Star, title: "Cliente VIP", desc: "Los referidores activos obtienen precios preferenciales" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm mb-6">
                <Gift className="w-4 h-4" /> Programa de Referidos
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {refCode
                  ? "¡Le Han Referido a Bonlife Oil!"
                  : "Refiera Hoteles, Gane Descuentos"}
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
                {refCode
                  ? "Un colega de confianza le recomienda el aceite vegetal premium #1 de República Dominicana"
                  : "Cada hotel que usted refiera le da un 5% de descuento en su próxima compra. ¡Sin límite!"}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <b.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Forms */}
          <div className="max-w-lg mx-auto">
            {step === "info" && !refCode && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-2 text-center">Únase al Programa</h2>
                <p className="text-muted-foreground text-center mb-6">
                  Regístrese para obtener su código único de referido
                </p>
                <form onSubmit={handleReferrerSignup} className="space-y-4">
                  <Input placeholder="Nombre completo *" value={referrerName} onChange={(e) => setReferrerName(e.target.value)} required maxLength={100} />
                  <Input placeholder="Nombre del Hotel/Restaurante *" value={referrerCompany} onChange={(e) => setReferrerCompany(e.target.value)} required maxLength={200} />
                  <Input placeholder="Email *" type="email" value={referrerEmail} onChange={(e) => setReferrerEmail(e.target.value)} required maxLength={255} />
                  <Input placeholder="Teléfono" type="tel" value={referrerPhone} onChange={(e) => setReferrerPhone(e.target.value)} maxLength={20} />
                  <Button type="submit" className="w-full py-6 text-lg" disabled={loading}>
                    {loading ? "Registrando..." : "Obtener Mi Código de Referido"}
                  </Button>
                </form>
              </motion.div>
            )}

            {step === "signup" && refCode && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border border-border rounded-2xl p-8">
                <div className="bg-primary/10 rounded-xl p-4 mb-6 text-center">
                  <p className="text-sm text-muted-foreground">Código de referido</p>
                  <p className="text-2xl font-bold text-primary">{refCode}</p>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2 text-center">Solicite Su Descuento</h2>
                <p className="text-muted-foreground text-center mb-6">
                  Complete sus datos y reciba un <strong>descuento especial</strong> en su primera compra
                </p>
                <form onSubmit={handleLeadSignup} className="space-y-4">
                  <Input placeholder="Nombre completo *" value={leadName} onChange={(e) => setLeadName(e.target.value)} required maxLength={100} />
                  <Input placeholder="Hotel / Restaurante" value={leadCompany} onChange={(e) => setLeadCompany(e.target.value)} maxLength={200} />
                  <Input placeholder="Teléfono *" type="tel" value={leadPhone} onChange={(e) => setLeadPhone(e.target.value)} required maxLength={20} />
                  <Input placeholder="Email" type="email" value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} maxLength={255} />
                  <Button type="submit" className="w-full py-6 text-lg" disabled={loading}>
                    {loading ? "Enviando..." : "🎁 Solicitar Descuento Especial"}
                  </Button>
                </form>
              </motion.div>
            )}

            {step === "share" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border border-border rounded-2xl p-8 text-center">
                <Gift className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">¡Su Código Está Listo!</h2>
                <div className="bg-primary/10 rounded-xl p-6 my-6">
                  <p className="text-sm text-muted-foreground mb-1">Su código de referido</p>
                  <p className="text-3xl font-bold text-primary tracking-wider">{generatedCode}</p>
                </div>
                <p className="text-muted-foreground mb-6">
                  Comparta este enlace con otros hoteles y restaurantes. Por cada uno que compre, ¡usted gana 5% de descuento!
                </p>
                <div className="flex gap-2 mb-4">
                  <Input value={shareUrl} readOnly className="text-sm" />
                  <Button onClick={copyLink} variant="outline" className="flex-shrink-0">
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <div className="flex gap-3 justify-center">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`¡Prueba el aceite vegetal premium Bonlife Oil! Usa mi código de referido y obtén un descuento especial: ${shareUrl}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#20BA5A] transition-colors"
                  >
                    <Share2 className="w-4 h-4" /> Compartir por WhatsApp
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-foreground text-primary-foreground/70 py-8 text-center text-sm">
        <p>© {new Date().getFullYear()} Bonlife Oil — Programa de Referidos</p>
      </footer>
    </div>
  );
};

export default ReferralProgram;
