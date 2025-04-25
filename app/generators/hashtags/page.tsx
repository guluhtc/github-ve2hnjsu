"use client";

import { useState } from "react";
import { Hash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GeneratorToggle from "@/components/generator-toggle";

export default function HashtagsPage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedContent("Your generated hashtags will appear here...");
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container px-4 md:px-6">
        <GeneratorToggle />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 gradient-border">
            Hashtag Generator
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Instagram <span className="gradient-text">Hashtag Generator</span>
          </h1>
          <p className="text-muted-foreground max-w-[700px] text-lg">
            Find trending and relevant hashtags to increase your post visibility.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-card p-8 rounded-xl border shadow-lg">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-primary/10">
                  <Hash className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Generate Hashtags</h2>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Enter keywords related to your post.
                </p>
                <Input
                  placeholder="E.g., travel, photography, sunset..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="text-base py-5"
                />
                <div className="flex justify-end">
                  <Button
                    size="lg"
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    {isGenerating ? "Generating..." : "Generate Hashtags"}
                  </Button>
                </div>
              </div>
            </div>

            {generatedContent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 rounded-lg bg-muted/50"
              >
                <h3 className="font-medium text-lg mb-3">Generated Hashtags:</h3>
                <p className="text-muted-foreground text-base leading-relaxed">{generatedContent}</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}