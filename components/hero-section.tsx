"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Instagram, Sparkles, Zap, Brain } from "lucide-react";

const typewriterPhrases = [
  "AI Magic",
  "Viral Captions",
  "Trending Hashtags",
  "Pro Bios",
  "Instagram Growth"
];

const shimmerVariants = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Morphing blob SVG path animation
const blobVariants = {
  animate: {
    scale: [1, 1.08, 1],
    rotate: [0, 8, -8, 0],
    filter: ["blur(0px)", "blur(8px)", "blur(0px)"],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function HeroSection() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  // Typewriter effect with per-character fade-in
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const phrase = typewriterPhrases[currentPhrase];
    if (typing) {
      if (displayed.length < phrase.length) {
        timeout = setTimeout(() => {
          setDisplayed(phrase.slice(0, displayed.length + 1));
        }, 60);
      } else {
        timeout = setTimeout(() => setTyping(false), 1200);
      }
    } else {
      timeout = setTimeout(() => {
        setDisplayed("");
        setTyping(true);
        setCurrentPhrase((prev) => (prev + 1) % typewriterPhrases.length);
      }, 700);
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, currentPhrase]);

  // Helper for per-character animation
  const renderAnimatedText = (text: string) => (
    <span className="inline-block">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: i * 0.04 }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );

  return (
    <section className="relative pt-16 sm:pt-20 overflow-hidden hero-gradient">
      {/* Morphing animated blob background */}
      <motion.svg
        width="700"
        height="700"
        viewBox="0 0 700 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -top-40 -left-40 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] opacity-40 pointer-events-none z-0"
        variants={blobVariants}
        animate="animate"
      >
        <motion.path
          d="M350,100 Q500,150 600,350 Q500,550 350,600 Q200,550 100,350 Q200,150 350,100 Z"
          fill="url(#blob-gradient)"
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <defs>
          <radialGradient id="blob-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0.3" />
          </radialGradient>
        </defs>
      </motion.svg>

      <div className="container px-4 sm:px-4 md:px-6 flex flex-col items-center text-center pt-12 sm:pt-16 pb-16 sm:pb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 border rounded-full py-1.5 sm:py-2 px-3 sm:px-4 mb-6 sm:mb-8 bg-background/50 backdrop-blur-sm gradient-border"
        >
          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
          <span className="text-xs sm:text-sm font-medium">Free Instagram AI Tools</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 leading-tight"
        >
          <motion.span
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="inline-block align-middle mr-3"
          >
            <Brain className="w-10 h-10 text-primary drop-shadow-lg" />
          </motion.span>
          <motion.span
            className="gradient-text relative inline-block"
            variants={shimmerVariants}
            animate="animate"
            style={{
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={displayed}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="inline-block"
              >
                {renderAnimatedText(displayed)}
                <span className="blinking-cursor">|</span>
              </motion.span>
            </AnimatePresence>
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-[340px] xs:max-w-[420px] sm:max-w-[700px] text-sm xs:text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10"
        >
          Access powerful, free AI tools to enhance your Instagram content, grow your audience, and save time with automated solutions.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-xs sm:max-w-none justify-center"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
          >
            <motion.div
              whileHover={{ scale: 1.06, boxShadow: '0 8px 32px 0 rgba(99,102,241,0.25)' }}
              whileTap={{ scale: 0.97 }}
              className="w-full"
            >
              <Button 
                size="lg" 
                className="relative group bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white shadow-xl transition-all duration-300 transform text-base xs:text-lg px-6 py-4 sm:px-8 sm:py-6 rounded-xl overflow-hidden border-2 border-transparent focus:ring-2 focus:ring-primary"
                asChild
              >
                <Link href="#tools" className="gap-2">
                  <span className="relative z-10">Explore Tools</span>
                  <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  {/* Animated border */}
                  <span className="absolute inset-0 rounded-xl pointer-events-none border-2 border-transparent group-hover:border-purple-400 group-hover:animate-pulse-border transition-all duration-300" />
                  {/* Glass highlight */}
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 w-3/4 h-1/3 bg-white/20 rounded-b-full blur-md opacity-60" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
          >
            <motion.div
              whileHover={{ scale: 1.06, boxShadow: '0 8px 32px 0 rgba(99,102,241,0.15)' }}
              whileTap={{ scale: 0.97 }}
              className="w-full"
            >
              <Button 
                size="lg" 
                variant="outline" 
                className="relative group border-2 border-primary/40 hover:border-primary bg-white/30 dark:bg-background/30 backdrop-blur-md transition-all duration-300 transform text-base xs:text-lg px-6 py-4 sm:px-8 sm:py-6 rounded-xl overflow-hidden focus:ring-2 focus:ring-primary"
                asChild
              >
                <Link href="#features" className="gap-2">
                  <span className="relative z-10 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent group-hover:text-white transition-colors duration-300">Learn More</span>
                  <Zap className="h-5 w-5 relative z-10 text-primary group-hover:text-white transition-colors duration-300 group-hover:rotate-12 transition-transform duration-300" />
                  {/* Animated border */}
                  <span className="absolute inset-0 rounded-xl pointer-events-none border-2 border-transparent group-hover:border-pink-400 group-hover:animate-pulse-border transition-all duration-300" />
                  {/* Glass highlight */}
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 w-3/4 h-1/3 bg-white/20 rounded-b-full blur-md opacity-60" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      {/* Animated Instagram icon background with floating effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 0 }}
        animate={{ opacity: 0.15, scale: 1, y: [0, 20, 0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-20 -right-20 xs:-top-24 xs:-right-24 md:-top-32 md:-right-32 lg:-top-40 lg:-right-40"
      >
        <Instagram className="w-[180px] h-[180px] xs:w-[240px] xs:h-[240px] md:w-[400px] md:h-[400px] text-primary/30 blur-2xl" />
      </motion.div>
    </section>
  );
}

// Add blinking cursor style
// ... existing code ...