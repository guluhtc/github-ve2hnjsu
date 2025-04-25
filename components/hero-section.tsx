"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Instagram, Sparkles, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-20 overflow-hidden hero-gradient">
      <div className="container px-4 md:px-6 flex flex-col items-center text-center pt-16 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 border rounded-full py-2 px-4 mb-8 bg-background/50 backdrop-blur-sm gradient-border"
        >
          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
          <span className="text-sm font-medium">Free Instagram AI Tools</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
        >
          Transform Your Instagram with
          <span className="gradient-text"> AI Magic</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-[700px] text-lg md:text-xl text-muted-foreground mb-10"
        >
          Access powerful, free AI tools to enhance your Instagram content, grow your audience, and save time with automated solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-6 w-full justify-center"
        >
          <Button 
            size="lg" 
            className="relative group bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" 
            asChild
          >
            <Link href="#tools" className="gap-2 px-8 py-6">
              <span className="relative z-10">Explore Tools</span>
              <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md" />
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="relative group border-2 hover:border-transparent transition-all duration-300 transform hover:-translate-y-1" 
            asChild
          >
            <Link href="#features" className="gap-2 px-8 py-6">
              <span className="relative z-10 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent group-hover:text-white transition-colors duration-300">Learn More</span>
              <Zap className="h-5 w-5 relative z-10 text-primary group-hover:text-white transition-colors duration-300 group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}