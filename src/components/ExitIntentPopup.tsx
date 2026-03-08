import { useState, useEffect } from "react";
import { X, Gift, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    const dismissed = sessionStorage.getItem("exit-popup-dismissed");
    if (dismissed) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShow(true);
      }
    };

    // Also show after 45 seconds on page
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem("exit-popup-dismissed")) {
        setShow(true);
      }
    }, 45000);

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);

  const handleDismiss = () => {
    setShow(false);
    sessionStorage.setItem("exit-popup-dismissed", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setLoading(true);
    const { error } = await supabase.from("leads").insert({
      name: name.trim().slice(0, 100),
      email: email.trim().slice(0, 255) || null,
      phone: phone.trim().slice(0, 20),
      company: company.trim().slice(0, 200) || null,
      source: "exit_intent_free_trial",
    });

    setLoading(false);
    if (error) {
      toast.error("Error al enviar. Intente de nuevo.");
      return;
    }

    setSubmitted(true);
    sessionStorage.setItem("exit-popup-dismissed", "true");
    toast.success("¡Solicitud enviada! Le contactaremos pronto.");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-border"
          >
            {/* Top banner */}
            <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground relative">
              <button
                onClick={handleDismiss}
                className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <Gift className="w-8 h-8" />
                <h2 className="text-2xl font-bold">¡Espere!</h2>
              </div>
              <p className="text-primary-foreground/90 text-lg">
                Pruebe nuestro aceite premium <strong>GRATIS</strong> en su cocina
              </p>
            </div>

            <div className="p-6">
              {submitted ? (
                <div className="text-center py-6">
                  <ChefHat className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    ¡Solicitud Recibida!
                  </h3>
                  <p className="text-muted-foreground">
                    Nuestro equipo le contactará en menos de 24 horas para coordinar su muestra gratuita.
                  </p>
                  <Button onClick={handleDismiss} className="mt-4">
                    Cerrar
                  </Button>
                </div>
              ) : (
                <>
                  <div className="bg-accent/50 rounded-xl p-4 mb-5 border border-border">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <ChefHat className="w-5 h-5 text-primary" />
                      Prueba Gratuita Incluye:
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-1.5">
                      <li>✅ Muestra gratuita de aceite Bonlife 99.9% pureza</li>
                      <li>✅ Asesoría técnica personalizada</li>
                      <li>✅ Reporte de ahorro comparativo</li>
                      <li>✅ Sin compromiso de compra</li>
                    </ul>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <Input
                      placeholder="Nombre completo *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      maxLength={100}
                    />
                    <Input
                      placeholder="Hotel / Restaurante"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      maxLength={200}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="Teléfono *"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        maxLength={20}
                        type="tel"
                      />
                      <Input
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        maxLength={255}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full text-lg py-6"
                      disabled={loading}
                    >
                      {loading ? "Enviando..." : "🎁 Solicitar Muestra Gratis"}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Sin compromiso · Entrega en 24h · Solo para negocios
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
