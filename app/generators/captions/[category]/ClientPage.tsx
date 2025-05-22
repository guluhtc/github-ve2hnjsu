"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Loader2,
  Copy,
  Check,
  ArrowLeft,
  Heart,
  HeartOff,
  RefreshCcw,
  Search,
  Hash,
  Clock,
  Settings,
  Info
} from "lucide-react";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import GeneratorToggle from "@/components/generator-toggle";

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

export default function ClientPage({ categoryData }: { categoryData: { category: string, captions: string[] } }) {
  const categoryName = categoryData?.category || "Unknown";
  const displayCategoryName = categoryName.replace(/-/g, ' ');
  const exampleCaptions = useMemo(() => categoryData?.captions || [], [categoryData]);

  const [prompt, setPrompt] = useState("");
  const [generatedCaptions, setGeneratedCaptions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [filteredCaptions, setFilteredCaptions] = useState(exampleCaptions);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState({
    style: "casual",
    tone: "friendly",
    length: 150,
    includeHashtags: true,
    includeEmojis: true,
    maxHashtags: 5,
    creativity: 0.7,
    customHashtags: "",
  });
  const [promptCharCount, setPromptCharCount] = useState(0);
  const [error, setError] = useState("");

  // Related generators state
  const [related, setRelated] = useState<{ category: string; meta_title: string }[]>([]);

  // Available categories state
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [visibleCount, setVisibleCount] = useState(35);
  const [visibleRelated, setVisibleRelated] = useState(35);
  const [visibleCategories, setVisibleCategories] = useState(35);

  useEffect(() => {
    async function fetchRelated() {
      try {
        const res = await fetch("/api/get-categories");
        const all = await res.json();
        // Fetch meta_title for each category except the current one
        if (Array.isArray(all)) {
          const filtered = all.filter((cat: string) => cat.toLowerCase() !== categoryName.toLowerCase());
          // Fetch meta_title for each
          const metaRes = await fetch("/api/get-related-meta", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ categories: filtered })
          });
          const meta = await metaRes.json();
          setRelated(meta);
        }
      } catch (e) {
        setRelated([]);
      }
    }
    fetchRelated();
  }, [categoryName]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/get-categories");
        const data = await res.json();
        if (Array.isArray(data)) {
          setCategories(data);
          setLoading(false);
        }
      } catch (e) {
        setCategories([]);
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    setFilteredCaptions(exampleCaptions);
    setVisibleCount(35);
    setVisibleRelated(35);
    setVisibleCategories(35);
  }, [exampleCaptions]);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredCaptions(exampleCaptions);
    } else {
      setFilteredCaptions(
        exampleCaptions.filter((caption) =>
          caption.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, exampleCaptions]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError("");
    setGeneratedCaptions([]);
    try {
      const response = await fetch("/api/generate-related-caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, options }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate captions");
      }
      setGeneratedCaptions(data.captions || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate captions");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async (caption: string, idx?: number) => {
    try {
      await navigator.clipboard.writeText(caption);
      if (typeof idx === "number") {
        setCopiedIndex(idx);
        setTimeout(() => setCopiedIndex(null), 2000);
      } else {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (err) {}
  };

  const toggleFavorite = (idx: number) => {
    setFavorites((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const regenerateCaption = (caption: string, idx: number) => {
    // For demo, just shuffle the caption slightly
    const words = caption.split(" ");
    const shuffled = words.sort(() => 0.5 - Math.random()).join(" ");
    setFilteredCaptions((prev) =>
      prev.map((c, i) => (i === idx ? shuffled : c))
    );
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-12 sm:pb-16 bg-gradient-to-b from-background to-background/80">
      <div className="container px-3 sm:px-4 md:px-6 max-w-2xl mx-auto">
        <GeneratorToggle />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-8 sm:mb-12"
        >
          <Badge variant="outline" className="mb-3 sm:mb-4 gradient-border">
            {displayCategoryName} Captions Generator
          </Badge>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
            {displayCategoryName} <span className="gradient-text">Instagram Captions Generator</span>
          </h1>
          <p className="text-muted-foreground max-w-[700px] text-base sm:text-lg">
            Create and discover the best {displayCategoryName.toLowerCase()} captions for your Instagram posts.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card p-6 rounded-xl border shadow-lg backdrop-blur-sm bg-background/95 mb-10"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-lg bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Generate a {displayCategoryName} Caption</h2>
            </div>
            <Textarea
              placeholder={`E.g., A cool ${displayCategoryName.toLowerCase()} moment...`}
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                setPromptCharCount(e.target.value.length);
              }}
              className="min-h-[120px] text-base resize-none border focus:ring-2 focus:ring-primary/30"
            />
            <div className="flex justify-between items-center mt-1 mb-2 text-xs text-muted-foreground">
              <span>{promptCharCount} / 300 characters</span>
              <span>Describe your post for best results</span>
            </div>
            <div className="flex items-center gap-2 justify-end mb-2">
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
            <AnimatePresence>
              {showOptions && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6 p-4 rounded-xl border bg-muted/50 mb-4 shadow-sm"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Writing Style</Label>
                      <Select
                        value={options.style}
                        onValueChange={(value) => setOptions((prev) => ({ ...prev, style: value }))}
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
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><Info className="h-3 w-3" />Choose the overall writing style</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Tone</Label>
                      <Select
                        value={options.tone}
                        onValueChange={(value) => setOptions((prev) => ({ ...prev, tone: value }))}
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
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><Info className="h-3 w-3" />Set the mood of your caption</p>
                    </div>
                    <div className="space-y-2 col-span-1 sm:col-span-2">
                      <div className="flex justify-between">
                        <Label>Caption Length</Label>
                        <span className="text-xs text-muted-foreground">{options.length} characters</span>
                      </div>
                      <Slider
                        value={[options.length]}
                        onValueChange={([value]) => setOptions((prev) => ({ ...prev, length: value }))}
                        max={300}
                        min={50}
                        step={10}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><Info className="h-3 w-3" />Controls the maximum length of the generated caption</p>
                    </div>
                    <div className="space-y-2 col-span-1 sm:col-span-2">
                      <div className="flex justify-between">
                        <Label>Creativity Level</Label>
                        <span className="text-xs text-muted-foreground">{Math.round(options.creativity * 100)}%</span>
                      </div>
                      <Slider
                        value={[options.creativity * 100]}
                        onValueChange={([value]) => setOptions((prev) => ({ ...prev, creativity: value / 100 }))}
                        max={100}
                        step={10}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><Info className="h-3 w-3" />Higher creativity = more unique captions</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={options.includeHashtags}
                        onCheckedChange={(checked) => setOptions((prev) => ({ ...prev, includeHashtags: checked }))}
                      />
                      <Label>Include Hashtags</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={options.includeEmojis}
                        onCheckedChange={(checked) => setOptions((prev) => ({ ...prev, includeEmojis: checked }))}
                      />
                      <Label>Include Emojis</Label>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
                  `Generate ${displayCategoryName} Caption`
                )}
              </Button>
            </div>
            <AnimatePresence>
              {generatedCaptions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6 grid gap-4"
                >
                  {generatedCaptions.map((caption, idx) => (
                    <div
                      key={idx}
                      className="relative p-6 rounded-lg bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 border border-primary/10"
                    >
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(caption)}
                          className="h-8 w-8 p-0"
                        >
                          {isCopied ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4 text-primary" />
                          )}
                        </Button>
                      </div>
                      <div className="space-y-4">
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
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 mb-2 rounded-lg bg-destructive/10 text-destructive flex items-center gap-2"
              >
                <Info className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card p-6 rounded-xl border shadow-lg backdrop-blur-sm bg-background/95"
        >
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-lg text-primary">{displayCategoryName} Captions</h2>
          </div>
          <div className="mb-4 flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search captions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border bg-background/70 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          {filteredCaptions.length > 0 ? (
            <div className="grid gap-4">
              {filteredCaptions.slice(0, visibleCount).map((caption, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="relative p-4 rounded-lg border bg-gradient-to-br from-primary/5 via-pink-500/5 to-blue-500/5 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Hash className="h-4 w-4 text-primary" />
                      <span className="font-medium text-base text-foreground/90">Caption</span>
                    </div>
                    <div className="text-sm sm:text-base text-foreground/80 mb-2">
                      {caption}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{caption.length} characters</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 sm:gap-3 items-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(caption, i)}
                      className="h-8 w-8 p-0"
                    >
                      {copiedIndex === i ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-primary" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(i)}
                      className="h-8 w-8 p-0"
                    >
                      {favorites.includes(i) ? (
                        <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                      ) : (
                        <HeartOff className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => regenerateCaption(caption, i)}
                      className="h-8 w-8 p-0"
                    >
                      <RefreshCcw className="h-4 w-4 text-primary" />
                    </Button>
                  </div>
                </motion.div>
              ))}
              {visibleCount < filteredCaptions.length && (
                <div className="flex justify-center mt-4">
                  <Button
                    onClick={() => setVisibleCount((prev) => prev + 35)}
                    className="bg-primary hover:bg-primary/90 text-white px-8"
                  >
                    Load More
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground">No captions found for this category.</p>
          )}
        </motion.div>
        {/* Related Generators Section */}
        {related.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-4 text-blue-700">Related Captions Generators</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.slice(0, visibleRelated).map((item) => (
                <Link key={item.category} href={`/generators/captions/${item.category.toLowerCase()}`} className="block p-4 rounded-xl border bg-white shadow hover:shadow-lg transition">
                  <div className="font-semibold text-blue-700 mb-1">{item.meta_title || item.category}</div>
                  <div className="text-muted-foreground text-sm">Instagram Captions Generator</div>
                </Link>
              ))}
            </div>
            {visibleRelated < related.length && (
              <div className="flex justify-center mt-4">
                <Button
                  onClick={() => setVisibleRelated((prev) => prev + 35)}
                  className="bg-primary hover:bg-primary/90 text-white px-8"
                >
                  Load More
                </Button>
              </div>
            )}
          </div>
        )}
        {/* Available Categories Section */}
        {loading ? (
          <div className="flex justify-center mt-12">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-destructive mt-12">
            <p>{error}</p>
          </div>
        ) : categories.length > 0 && (
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
        )}
      </div>
    </div>
  );
} 