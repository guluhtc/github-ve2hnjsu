"use client";

import { MessageSquareText, Hash, Megaphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Link from "next/link";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";

const generators = [
  {
    id: "captions",
    title: "Caption Generator",
    description: "Create engaging captions for your Instagram posts",
    icon: MessageSquareText,
    href: "/generators/captions",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: "bios",
    title: "Bio Generator",
    description: "Generate professional and attractive Instagram bios",
    icon: Megaphone,
    href: "/generators/bios",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: "hashtags",
    title: "Hashtag Generator",
    description: "Find trending and relevant hashtags for your posts",
    icon: Hash,
    href: "/generators/hashtags",
    gradient: "from-green-500 to-emerald-500"
  }
];

export default function GeneratorsPage() {
  const [activeGenerator, setActiveGenerator] = useState("captions");

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 gradient-border">
            AI Generators
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Instagram Content <span className="gradient-text">Generators</span>
          </h1>
          <p className="text-muted-foreground max-w-[700px] text-lg mb-8">
            Choose from our collection of AI-powered Instagram content generators.
          </p>

          <ToggleGroup type="single" value={activeGenerator} onValueChange={(value) => value && setActiveGenerator(value)} className="flex flex-wrap justify-center gap-2 mb-8">
            {generators.map((generator) => (
              <ToggleGroupItem
                key={generator.id}
                value={generator.id}
                className={`px-4 py-2 rounded-full transition-all duration-300 data-[state=on]:text-white ${
                  activeGenerator === generator.id 
                    ? `bg-gradient-to-r ${generator.gradient}` 
                    : "gradient-border"
                }`}
              >
                <div className="flex items-center gap-2">
                  <generator.icon className="h-4 w-4" />
                  <span>{generator.title}</span>
                </div>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {generators.map((generator, index) => (
            <motion.div
              key={generator.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: activeGenerator === generator.id || activeGenerator === "all" ? 1 : 0.5,
                y: 0,
                scale: activeGenerator === generator.id ? 1.05 : 1
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={generator.href} className="block h-full">
                <div className="h-full p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${generator.gradient} opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500`}></div>
                  <div className="relative z-10">
                    <div className={`rounded-full p-3 bg-gradient-to-br ${generator.gradient} mb-4 w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                      <generator.icon className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {generator.title}
                    </h2>
                    <p className="text-muted-foreground">
                      {generator.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}