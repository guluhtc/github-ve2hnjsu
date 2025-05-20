"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ModeToggle } from "./mode-toggle";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 py-1 shadow-none"
      )}
      style={{backdropFilter: 'blur(18px)'}}
    >
      <div className="container">
        <div className={cn(
          "rounded-full border gradient-border transition-all duration-300 bg-white/40 dark:bg-background/60 backdrop-blur-xl shadow-lg"
        )}>
          <div className="px-2 sm:px-3 flex h-9 sm:h-10 items-center justify-between">
            <Link href="/" className="text-base font-extrabold gradient-text tracking-tight select-none" style={{letterSpacing: '0.01em'}}>
              TechIGem
            </Link>

            <nav className="flex items-center gap-2 sm:gap-4 relative">
              {/* Animated active underline */}
              <motion.div
                layoutId="nav-underline"
                className="absolute bottom-0 left-0 h-0.5 w-full pointer-events-none"
                style={{ zIndex: 1 }}
              />
              {[
                { href: "/generators", label: "Generators" },
                { href: "/blog", label: "Blog" },
                { href: "/names", label: "Stylish Names" }
              ].map((item) => (
                <motion.div
                  key={item.href}
                  whileHover={{ scale: 1.05, boxShadow: '0 2px 8px 0 rgba(99,102,241,0.08)' }}
                  whileTap={{ scale: 0.97 }}
                  className="relative hidden md:block"
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "nav-link nav-underline px-2 py-1 text-xs sm:text-sm font-medium transition-all duration-200",
                      pathname === item.href && "text-primary font-bold"
                    )}
                    tabIndex={0}
                  >
                    {item.label}
                    {/* Animated underline for active link */}
                    {pathname === item.href && (
                      <motion.span
                        layoutId="nav-underline-bar"
                        className="absolute left-0 right-0 bottom-0 h-0.5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
                        style={{ zIndex: 2 }}
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
              {/* Mobile menu button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden p-1"
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </Button>
            </nav>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-40 md:hidden"
              onClick={toggleMenu}
              aria-hidden="true"
            />
            {/* Slide-down menu with staggered links */}
            <motion.div
              key="mobile-menu"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="md:hidden mt-1 fixed left-0 right-0 top-12 z-50"
            >
              <nav 
                id="mobile-menu"
                className="rounded-xl border gradient-border bg-background/95 backdrop-blur-xl shadow-2xl p-3 flex flex-col space-y-2 mx-2 relative"
                role="navigation"
                aria-label="Mobile menu"
              >
                <button
                  className="absolute top-2 right-2 p-1 rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={toggleMenu}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.10 } }
                  }}
                >
                  {[
                    { href: "/generators", label: "Generators" },
                    { href: "/blog", label: "Blog" },
                    { href: "/names", label: "Stylish Names" }
                  ].map((item) => (
                    <motion.div
                      key={item.href}
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
                      }}
                    >
                      <Link 
                        href={item.href} 
                        className={cn(
                          "text-base font-semibold transition-colors hover:text-primary nav-underline py-1",
                          pathname === item.href && "text-primary font-bold"
                        )}
                        onClick={toggleMenu}
                        tabIndex={0}
                      >
                        {item.label}
                        {pathname === item.href && (
                          <motion.span
                            layoutId="mobile-nav-underline-bar"
                            className="absolute left-0 right-0 bottom-0 h-0.5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
                            style={{ zIndex: 2 }}
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            exit={{ opacity: 0, scaleX: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/* Add to the bottom of the file (or in your global CSS if preferred):

.nav-link {
  @apply text-xs sm:text-sm font-medium transition-all duration-200 relative px-2 py-1 rounded-lg overflow-hidden;
}
.nav-link:hover, .nav-link:focus {
  @apply text-primary scale-105 bg-accent/30 shadow-md;
}
.nav-underline::after {
  content: '';
  display: block;
  position: absolute;
  left: 0; right: 0; bottom: -2px;
  height: 2px;
  background: linear-gradient(90deg, #6366f1 0%, #ec4899 100%);
  border-radius: 2px;
  transform: scaleX(0);
  transition: transform 0.3s cubic-bezier(.4,0,.2,1);
}
.nav-link:hover .nav-underline::after, .nav-link:focus .nav-underline::after {
  transform: scaleX(1);
}
*/