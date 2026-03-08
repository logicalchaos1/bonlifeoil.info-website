"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BonlifeLogo from '@/components/BonlifeLogo';
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Comparación', href: '#comparacion' },
    { name: 'Calculadora', href: '#calculadora' },
    { name: 'Productos', href: '#productos' },
    { name: 'Descargas', href: '#descargas' },
    { name: 'Blog', href: '/blog' },
    { name: 'Chef Partners', href: '/chef-partners' },
    { name: 'Contacto', href: '#contacto' },
  ];

  const NavItem = ({ link }: { link: typeof navLinks[0] }) => {
    const isRoute = link.href.startsWith('/');
    const className_ = cn(
      "text-sm font-medium transition-colors hover:text-primary",
      isScrolled ? "text-foreground" : "text-white"
    );
    return isRoute ? (
      <Link to={link.href} className={className_}>{link.name}</Link>
    ) : (
      <a href={link.href} className={className_}>{link.name}</a>
    );
  };

  const MobileNavItem = ({ link }: { link: typeof navLinks[0] }) => {
    const isRoute = link.href.startsWith('/');
    const props = {
      className: "text-xl font-bold text-foreground hover:text-primary transition-colors py-2",
      onClick: () => setIsMobileMenuOpen(false),
    };
    return isRoute ? (
      <Link to={link.href} {...props}>{link.name}</Link>
    ) : (
      <a href={link.href} {...props}>{link.name}</a>
    );
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4",
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-md py-2" : "bg-transparent py-3 md:py-4"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <BonlifeLogo
            variant={isScrolled ? 'gold' : 'light'}
            className={cn("transition-all duration-500", isScrolled ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl")}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <NavItem key={link.name} link={link} />
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
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
          className="lg:hidden p-2 z-50 relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="text-foreground w-6 h-6" />
          ) : (
            <Menu className={cn("w-6 h-6", isScrolled ? "text-foreground" : "text-white")} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-white transition-transform duration-500 lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-5 p-8 pt-20">
          <BonlifeLogo variant="gold" className="text-3xl mb-4" />
          
          {navLinks.map((link) => (
            <MobileNavItem key={link.name} link={link} />
          ))}

          <div className="w-full max-w-xs mt-4 space-y-3">
            <a 
              href="tel:+18299876764" 
              className="flex items-center justify-center gap-2 text-primary font-semibold py-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Phone size={18} />
              +1 (829) 987-6764
            </a>
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
      </div>
    </nav>
  );
};

export default Navbar;
