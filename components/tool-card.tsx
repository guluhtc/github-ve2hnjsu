"use client";

import { useState } from "react";
import { DivideIcon as LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";

interface ToolProps {
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

export default function ToolCard({ tool }: ToolProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryLabel = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card 
        className={`h-full transition-all duration-500 overflow-hidden gradient-border tool-card-gradient tool-card-hover ${
          isHovered ? 'shadow-xl shadow-primary/10' : 'shadow-md'
        }`}
      >
        <CardHeader className="relative pb-0">
          <div className="flex justify-between items-start">
            <motion.div 
              className={`rounded-full p-3 transition-all duration-300 bg-gradient-to-br ${tool.gradient} ${
                isHovered ? 'scale-110' : ''
              }`}
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <tool.icon className="h-5 w-5 text-white" />
            </motion.div>
            <div className="flex gap-2">
              {tool.popular && (
                <Badge 
                  variant="secondary" 
                  className={`bg-gradient-to-r ${tool.gradient} text-white`}
                >
                  Popular
                </Badge>
              )}
              {tool.comingSoon && (
                <Badge 
                  variant="outline" 
                  className="animate-pulse gradient-border"
                >
                  Coming Soon
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <motion.h3 
            className="text-lg font-semibold mb-2"
            animate={{ 
              color: isHovered ? "hsl(var(--primary))" : "hsl(var(--foreground))" 
            }}
            transition={{ duration: 0.3 }}
          >
            {tool.title}
          </motion.h3>
          <p className="text-muted-foreground text-sm">{tool.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Badge 
            variant="outline" 
            className={`text-xs bg-gradient-to-r ${tool.gradient} text-white`}
          >
            {getCategoryLabel(tool.category)}
          </Badge>
          
          {tool.comingSoon ? (
            <Button variant="outline" disabled>
              Coming Soon
            </Button>
          ) : (
            <Button 
              className={`transition-all duration-300 bg-gradient-to-r ${tool.gradient} hover:opacity-90 text-white ${
                isHovered ? 'scale-105' : ''
              }`}
              asChild
            >
              <Link href={`/tools/${tool.id}`}>
                Use Tool
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}