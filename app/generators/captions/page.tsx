"use client";

import { useState, lazy, Suspense, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  Megaphone,
  Loader2,
  Copy,
  Check,
  Sparkles,
  AlertCircle,
  Settings,
  Hash,
  Heart,
  HeartOff,
  RefreshCcw,
  Save,
  Clock
} from "lucide-react";
import GeneratorToggle from "@/components/generator-toggle";
import Link from "next/link";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Lazy load the options component
const CaptionOptions = lazy(() => import("@/components/caption-options"));

const toneOptions = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "funny", label: "Funny" },
  { value: "serious", label: "Serious" },
  { value: "inspirational", label: "Inspirational" },
  { value: "friendly", label: "Friendly" },
];

const styleOptions = [
  { value: "minimal", label: "Minimal" },
  { value: "descriptive", label: "Descriptive" },
  { value: "storytelling", label: "Storytelling" },
  { value: "poetic", label: "Poetic" },
  { value: "quote", label: "Quote" },
];

type GenerationHistoryItem = {
  prompt: string;
  captions: string[];
  timestamp: Date;
};

export default function CaptionsPage() {
  const [prompt, setPrompt] = useState("");
  const [generatedCaptions, setGeneratedCaptions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [generationHistory, setGenerationHistory] = useState<GenerationHistoryItem[]>([]);
  const [characterCount, setCharacterCount] = useState(0);
  const [options, setOptions] = useState({
    style: "casual",
    tone: "friendly",
    length: 150,
    includeHashtags: true,
    includeEmojis: true,
    maxHashtags: 5,
    creativity: 0.7,
  });
  const [visibleCount, setVisibleCount] = useState(35);
  const [visibleCategories, setVisibleCategories] = useState(35);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/get-categories');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch categories');
        }

        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err instanceof Error ? err.message : 'Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setCharacterCount(generatedCaptions.join('').length);
    setVisibleCount(35);
    setVisibleCategories(35);
  }, [generatedCaptions]);

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      setError("");
      setGeneratedCaptions([]);
      const response = await fetch('/api/generate-caption', {
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
      if (!data.captions || !Array.isArray(data.captions) || data.captions.length === 0) {
        throw new Error('No captions were generated');
      }
      setGeneratedCaptions(data.captions);
      setGenerationHistory(prev => [...prev, { prompt, captions: data.captions, timestamp: new Date() }]);
    } catch (err) {
      console.error("Error generating caption:", err);
      setError(err instanceof Error ? err.message : "Failed to generate caption. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async (caption: string, idx?: number) => {
    try {
      await navigator.clipboard.writeText(caption);
      setIsCopied(true);
      toast.success("Caption copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
      toast.error("Failed to copy caption");
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      toast.success("Added to favorites!");
    }
  };

  const regenerateCaption = () => {
    if (prompt) {
      handleGenerate();
    }
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-12 sm:pb-16 bg-gradient-to-b from-background to-background/80">
      <div className="container px-3 sm:px-4 md:px-6">
        <GeneratorToggle />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-8 sm:mb-12"
        >
          <Badge variant="outline" className="mb-3 sm:mb-4 gradient-border">
            Caption Generator
          </Badge>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
            Instagram <span className="gradient-text">Captions Generator</span>
          </h1>
          <p className="text-muted-foreground max-w-[700px] text-base sm:text-lg">
            Create engaging captions for your Instagram posts with AI.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-card p-6 rounded-xl border shadow-lg backdrop-blur-sm bg-background/95">
            <div className="space-y-6">
              {/* Header Section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-primary/10">
                    <Megaphone className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">Create Your Caption</h2>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowOptions(!showOptions)}
                    className="flex items-center gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    {showOptions ? "Hide Options" : "Show Options"}
                  </Button>
                </div>
              </div>

              {/* Options Section */}
              <AnimatePresence>
                {showOptions && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4 p-4 rounded-lg border bg-muted/50"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Writing Style</Label>
                        <Select
                          value={options.style}
                          onValueChange={(value) =>
                            setOptions((prev) => ({ ...prev, style: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select style" />
                          </SelectTrigger>
                          <SelectContent>
                            {styleOptions.map((style) => (
                              <SelectItem key={style.value} value={style.value}>
                                {style.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Tone</Label>
                        <Select
                          value={options.tone}
                          onValueChange={(value) =>
                            setOptions((prev) => ({ ...prev, tone: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select tone" />
                          </SelectTrigger>
                          <SelectContent>
                            {toneOptions.map((tone) => (
                              <SelectItem key={tone.value} value={tone.value}>
                                {tone.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Caption Length (characters)</Label>
                        <span className="text-sm text-muted-foreground">{options.length}</span>
                      </div>
                      <Slider
                        value={[options.length]}
                        onValueChange={([value]) =>
                          setOptions((prev) => ({ ...prev, length: value }))
                        }
                        max={300}
                        min={50}
                        step={10}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Creativity Level</Label>
                        <span className="text-sm text-muted-foreground">
                          {Math.round(options.creativity * 100)}%
                        </span>
                      </div>
                      <Slider
                        value={[options.creativity * 100]}
                        onValueChange={([value]) =>
                          setOptions((prev) => ({ ...prev, creativity: value / 100 }))
                        }
                        max={100}
                        step={10}
                        className="w-full"
                      />
                    </div>

                    <div className="flex flex-wrap gap-6">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={options.includeHashtags}
                          onCheckedChange={(checked) =>
                            setOptions((prev) => ({ ...prev, includeHashtags: checked }))
                          }
                        />
                        <Label>Include Hashtags</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={options.includeEmojis}
                          onCheckedChange={(checked) =>
                            setOptions((prev) => ({ ...prev, includeEmojis: checked }))
                          }
                        />
                        <Label>Include Emojis</Label>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Input Section */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-base">Describe your post</Label>
                  <Textarea
                    placeholder="E.g., A beautiful sunset at the beach with friends..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[120px] text-base resize-none"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    size="lg"
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    className="bg-primary hover:bg-primary/90 text-white px-8"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      "Generate Caption"
                    )}
                  </Button>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-destructive/10 text-destructive flex items-start gap-3"
                >
                  <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Error</p>
                    <p className="text-sm">{error}</p>
                  </div>
                </motion.div>
              )}

              {/* Generated Content */}
              <AnimatePresence>
                {isGenerating && (
                  <div className="flex justify-center my-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                )}
                {generatedCaptions.length > 0 && !isGenerating && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-6 grid gap-4"
                  >
                    {generatedCaptions.slice(0, visibleCount).map((caption, idx) => (
                      <div
                        key={idx}
                        className="relative p-6 rounded-lg bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 border border-primary/10"
                      >
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(caption, idx)}
                            className="h-8 w-8 p-0"
                          >
                            {isCopied ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4 text-primary" />
                            )}
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-5 w-5 text-primary" />
                          <h3 className="font-medium text-lg">Generated Caption {idx + 1}</h3>
                        </div>
                        <div className="prose prose-sm max-w-none">
                          <p className="text-base leading-relaxed text-foreground/90">
                            {caption.split('\n').map((line, i) => (
                              <span key={i}>
                                {line}
                                <br />
                              </span>
                            ))}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{caption.length} characters</span>
                          </div>
                          <span>AI Generated</span>
                        </div>
                      </div>
                    ))}
                    {visibleCount < generatedCaptions.length && (
                      <div className="flex justify-center mt-4">
                        <Button
                          onClick={() => setVisibleCount((prev) => prev + 35)}
                          disabled={isGenerating}
                          className="bg-primary hover:bg-primary/90 text-white px-8"
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Loading...
                            </>
                          ) : (
                            "Load More"
                          )}
                        </Button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Categories Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-3xl mx-auto mt-12 px-2"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-6 gradient-text text-center">Related Captions Generators</h2>
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {categories.slice(0, visibleCategories).map((category) => (
              <Link
                key={category}
                href={`/generators/captions/${category.toLowerCase()}`}
                className="px-3 py-2 sm:px-4 sm:py-2 rounded-full border bg-background/70 hover:bg-primary/10 transition-colors font-medium text-xs sm:text-sm shadow-sm border-muted-foreground/50 text-foreground hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 active:scale-95"
                style={{ minWidth: 0 }}
              >
                {category.replace(/-/g, ' ')}
              </Link>
            ))}
          </div>
          {visibleCategories < categories.length && (
            <div className="flex justify-center mt-4">
              <Button
                onClick={() => setVisibleCategories((prev) => prev + 35)}
                className="bg-primary hover:bg-primary/90 text-white px-8"
              >
                Load More
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}