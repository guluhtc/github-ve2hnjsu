"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, Loader2, Copy, Check, Sparkles, AlertCircle, Settings } from "lucide-react";
import GeneratorToggle from "@/components/generator-toggle";
import BioOptions, { BioOptions as BioOptionsType } from "@/components/bio-options";

export default function BiosPage() {
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState<BioOptionsType>({
    style: "professional",
    tone: "friendly",
    length: 50,
    includeEmojis: true,
    includeCallToAction: true
  });

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      setError("");
      
      const response = await fetch('/api/generate-bio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, options }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.details || errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.bio) {
        throw new Error('No bio was generated');
      }

      setGeneratedContent(data.bio);
    } catch (err) {
      console.error("Error generating bio:", err);
      setError(err instanceof Error ? err.message : "Failed to generate bio. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-12 sm:pb-16">
      <div className="container px-3 sm:px-4 md:px-6">
        <GeneratorToggle />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-8 sm:mb-12"
        >
          <Badge variant="outline" className="mb-3 sm:mb-4 gradient-border">
            Bio Generator
          </Badge>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
            Instagram <span className="gradient-text">Bio Generator</span>
          </h1>
          <p className="text-muted-foreground max-w-[700px] text-base sm:text-lg">
            Create engaging bios for your Instagram profile with AI.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-card p-3 sm:p-4 md:p-8 rounded-xl border shadow-lg">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 sm:p-2.5 rounded-lg bg-primary/10">
                    <Megaphone className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold">Create Your Bio</h2>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowOptions(!showOptions)}
                  className="flex items-center gap-2 w-full sm:w-auto h-9"
                >
                  <Settings className="h-4 w-4" />
                  {showOptions ? "Hide Options" : "Show Options"}
                </Button>
              </div>

              <AnimatePresence>
                {showOptions && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <BioOptions onOptionsChange={setOptions} />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-3 sm:space-y-4">
                <p className="text-sm sm:text-base text-muted-foreground">
                  Describe yourself or your brand for the bio.
                </p>
                <Textarea
                  placeholder="E.g., A passionate photographer sharing moments of beauty..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] sm:min-h-[150px] text-sm sm:text-base"
                />
                <div className="flex justify-end">
                  <Button
                    size="lg"
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto h-10 sm:h-11"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      "Generate Bio"
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 sm:mt-8 p-3 sm:p-4 rounded-lg bg-destructive/10 text-destructive flex items-start gap-2 sm:gap-3"
              >
                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm sm:text-base">Error</p>
                  <p className="text-xs sm:text-sm">{error}</p>
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {generatedContent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6 sm:mt-8"
                >
                  <div className="relative p-3 sm:p-4 md:p-6 rounded-lg bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 border border-primary/10">
                    <div className="absolute top-0 right-0 p-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopy}
                        className="hover:bg-primary/10 h-8 w-8 p-0"
                      >
                        {isCopied ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4 text-primary" />
                        )}
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      <h3 className="font-medium text-base sm:text-lg">Generated Bio</h3>
                    </div>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
                        {generatedContent.split('\n').map((line, i) => (
                          <span key={i}>
                            {line}
                            <br />
                          </span>
                        ))}
                      </p>
                    </div>
                    <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-muted-foreground gap-1 sm:gap-2">
                      <span>Click the copy button to copy to clipboard</span>
                      <span className="text-xs">Powered by AI</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}