"use client";

import { useState } from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";

interface ToolCardProps {
  tool: {
    id: number;
    title: string;
    description: string;
    icon: LucideIcon;
    category: string;
    popular: boolean;
    comingSoon: boolean;
    gradient: string;
  };
}

export default function ToolCard({ tool }: ToolCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryLabel = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative p-6 rounded-xl bg-background/50 backdrop-blur-sm border overflow-hidden tool-card-gradient"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500`}></div>
      
      <div className="relative z-10">
        <div className={`rounded-full p-3 bg-gradient-to-br ${tool.gradient} mb-4 w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
          <tool.icon className="h-7 w-7 text-white" />
        </div>
        
        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
          {tool.title}
        </h3>
        
        <p className="text-muted-foreground mb-6">
          {tool.description}
        </p>
        
        <div className="flex items-center gap-2">
          {tool.popular && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Popular
            </Badge>
          )}
          {tool.comingSoon && (
            <Badge variant="secondary" className="bg-muted text-muted-foreground">
              Coming Soon
            </Badge>
          )}
        </div>
      </div>
    </motion.div>
  );
}