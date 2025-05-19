"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled 
          ? "py-2" 
          : "py-4"
      )}
    >
      <div className="container">
        <div className={cn(
          "rounded-full border transition-all duration-300",
          isScrolled
            ? "bg-background/80 backdrop-blur-md shadow-lg"
            : "bg-background/50 backdrop-blur-sm"
        )}>
          <div className="px-4 sm:px-6 flex h-14 items-center justify-between">
            <Link href="/" className="text-xl font-bold gradient-text">
              TechIGem
            </Link>

            <div className="flex items-center gap-6">
              <Link 
                href="/generators" 
                className="text-sm font-medium transition-colors hover:text-primary hidden md:block"
              >
                Generators
              </Link>
              <Link 
                href="/blog" 
                className="text-sm font-medium transition-colors hover:text-primary hidden md:block"
              >
                Blog
              </Link>
              {/* Mobile menu button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-2">
            <nav 
              id="mobile-menu"
              className="rounded-lg border bg-background/80 backdrop-blur-md shadow-lg p-4 flex flex-col space-y-4"
              role="navigation"
              aria-label="Mobile menu"
            >
              <Link 
                href="/generators" 
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={toggleMenu}
              >
                Generators
              </Link>
              <Link 
                href="/blog" 
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={toggleMenu}
              >
                Blog
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}