import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import testimonialChef from '@/assets/testimonial-chef.jpg';
import testimonialManager from '@/assets/testimonial-manager.jpg';
import testimonialDirector from '@/assets/testimonial-director.jpg';
import testimonialPastry from '@/assets/testimonial-pastry.jpg';

const testimonials = [
  {
    name: 'Carlos Méndez',
    role: 'Chef Ejecutivo',
    company: 'Hotel Catalonia, Santo Domingo',
    image: testimonialChef,
    quote: 'Desde que cambiamos a Bonlife, el aceite dura el doble. Los números no mienten — nuestro costo por fritura bajó un 30% y la calidad del producto final mejoró notablemente.',
    stars: 5,
  },
  {
    name: 'María Fernández',
    role: 'Gerente de Operaciones',
    company: 'Cadena de Restaurantes El Mesón',
    image: testimonialManager,
    quote: 'Lo que más me impresionó fue el soporte técnico. Nos ayudaron con las plantillas de registro para Salud Pública y ahora pasamos cada inspección sin problema.',
    stars: 5,
  },
  {
    name: 'Roberto Almánzar',
    role: 'Director de A&B',
    company: 'Resort All-Inclusive, Punta Cana',
    image: testimonialDirector,
    quote: 'Con 12 estaciones de fritura operando 16 horas al día, necesitábamos un aceite que rindiera. Bonlife nos redujo los cambios de aceite de 3 a 1 por día.',
    stars: 5,
  },
  {
    name: 'Ana Lucía Pimentel',
    role: 'Chef Pastelera',
    company: 'Panadería Artesanal La Dorada',
    image: testimonialPastry,
    quote: 'La manteca vegetal Bonlife le da a mis hojaldres una textura increíble. Mis clientes notan la diferencia y yo noto el ahorro a fin de mes.',
    stars: 5,
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-16 md:py-24 px-4 bg-foreground text-primary-foreground overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-accent/15 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Star className="w-4 h-4 fill-current" />
            Lo que dicen nuestros clientes
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Historias de <span className="text-accent">Éxito</span> Reales
          </h2>
          <p className="text-primary-foreground/60 text-lg max-w-2xl mx-auto">
            Chefs y gerentes de toda la República Dominicana confían en Bonlife para sus cocinas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-6 lg:p-8 hover:bg-primary-foreground/8 transition-colors group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-accent/20 group-hover:text-accent/30 transition-colors" />
              
              <div className="flex items-center gap-4 mb-5">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-accent/30"
                />
                <div>
                  <h3 className="font-bold text-primary-foreground">{t.name}</h3>
                  <p className="text-primary-foreground/60 text-sm">{t.role}</p>
                  <p className="text-accent text-xs font-medium">{t.company}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>

              <p className="text-primary-foreground/80 leading-relaxed text-sm lg:text-base italic">
                "{t.quote}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
