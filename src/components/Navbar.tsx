"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import bonlifeLogo from "@/assets/bonlife-logo.png";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Comparación', href: '#comparacion' },
    { name: 'Calculadora', href: '#calculadora' },
    { name: 'Productos', href: '#productos' },
    { name: 'Descargas', href: '#descargas' },
    { name: 'Chef Partners', href: '/chef-partners' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 py-3",
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-md py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src={bonlifeLogo} 
            alt="Bonlife Logo" 
            className={cn(
              "transition-all duration-500 mix-blend-multiply",
              isScrolled ? "h-10" : "h-12 brightness-0 invert"
            )} 
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.href.startsWith('/') ? (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isScrolled ? "text-foreground" : "text-white"
                )}
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isScrolled ? "text-foreground" : "text-white"
                )}
              >
                {link.name}
              </a>
            )
          )}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a 
            href="tel:+18299876764" 
            className={cn(
              "flex items-center gap-2 text-sm font-semibold",
              isScrolled ? "text-primary" : "text-white"
            )}
          >
            <Phone size={16} />
            +1 (829) 987-6764
          </a>
          <Button 
            className="bg-gold hover:bg-gold-light text-white rounded-full px-6 shadow-lg hover:shadow-gold/20 transition-all"
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Cotizar Ahora
            <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className={isScrolled ? "text-foreground" : "text-white"} /> : <Menu className={isScrolled ? "text-foreground" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-white transition-transform duration-500 md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
          {navLinks.map((link) =>
            link.href.startsWith('/') ? (
              <Link
                key={link.name}
                to={link.href}
                className="text-2xl font-bold text-foreground hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="text-2xl font-bold text-foreground hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            )
          )}
          <Button 
            className="w-full bg-primary text-white py-6 text-lg rounded-xl"
            onClick={() => {
              setIsMobileMenuOpen(false);
              document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Cotizar Ahora
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;