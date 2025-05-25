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
  Info,
  ChevronDown,
  HelpCircle,
  UserCheck,
  Star,
  Globe,
  Lock,
  Globe2,
  Image as ImageIcon,
  Video,
  Film,
  BookMarked
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
    language: "en",
    postType: "photo",
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

  // Memoized steps and faqs for performance
  const howToSteps = [
    {
      icon: <Sparkles className="h-8 w-8 text-primary mb-2" />, title: "Pick a Caption", desc: "Browse the best captions for your post or use the search.",
    },
    {
      icon: <Copy className="h-8 w-8 text-primary mb-2" />, title: "Copy or Favorite", desc: "Copy your favorite or save it for later use.",
    },
    {
      icon: <Settings className="h-8 w-8 text-primary mb-2" />, title: "Generate Custom", desc: "Use the advanced generator for a unique caption.",
    }
  ];
  const faqs = [
    {
      q: "Is this captions generator free?",
      a: "Yes! All features are free to use for everyone.",
      icon: <HelpCircle className="h-7 w-7 text-primary" />
    },
    {
      q: "Can I generate captions for any category?",
      a: "Absolutely. You can browse or generate captions for any category listed.",
      icon: <Globe className="h-7 w-7 text-primary" />
    },
    {
      q: "How do I get the best results?",
      a: "Describe your post in detail and use the advanced options for more tailored captions.",
      icon: <Star className="h-7 w-7 text-primary" />
    },
    {
      q: "Do I need to sign up?",
      a: "No sign up is required. Just use and enjoy!",
      icon: <UserCheck className="h-7 w-7 text-primary" />
    },
    {
      q: "Are my captions private?",
      a: "Yes, everything you generate is private and not stored or shared.",
      icon: <Lock className="h-7 w-7 text-primary" />
    },
    {
      q: "Can I use these captions for commercial accounts?",
      a: "Yes, you can use generated captions for personal or business/brand accounts.",
      icon: <Globe className="h-7 w-7 text-primary" />
    }
  ];

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
            {displayCategoryName} Captions
          </Badge>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4 gradient-text">
            {displayCategoryName.charAt(0).toUpperCase() + displayCategoryName.slice(1)} Instagram Captions
          </h1>
          <p className="text-muted-foreground max-w-[700px] text-base sm:text-lg">
            Discover the best {displayCategoryName} captions for your Instagram posts. Copy, favorite, or generate your own!
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } }
          }}
          className="grid gap-4 mb-10"
        >
          {filteredCaptions.slice(0, visibleCount).map((caption, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              className={`relative p-5 rounded-xl bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 border border-primary/10 shadow-sm hover:shadow-lg transition-shadow duration-300 ${favorites.includes(idx) ? 'ring-2 ring-primary/60' : ''}`}
            >
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(caption, idx)}
                  className="h-8 w-8 p-0"
                  aria-label="Copy caption"
                >
                  {copiedIndex === idx ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-primary" />}
                </Button>
                <Button
                  variant={favorites.includes(idx) ? "default" : "ghost"}
                  size="sm"
                  onClick={() => toggleFavorite(idx)}
                  className="h-8 w-8 p-0"
                  aria-label={favorites.includes(idx) ? "Remove from favorites" : "Add to favorites"}
                >
                  {favorites.includes(idx) ? <Heart className="h-4 w-4 text-pink-500" /> : <HeartOff className="h-4 w-4 text-muted-foreground" />}
                </Button>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="font-medium text-lg">Caption {idx + 1}</h3>
              </div>
              <div className="prose prose-sm max-w-none">
                <p className="text-base leading-relaxed text-foreground/90">
                  {caption.split('\n').map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
                </p>
              </div>
              {caption.match(/#[\w]+/g) && (
                <div className="flex items-center gap-2 mt-2">
                  <Hash className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground truncate max-w-xs">
                    {caption.match(/#[\w]+/g)?.join(' ')}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t mt-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{caption.length} characters</span>
                </div>
                <span>Category: {displayCategoryName}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {/* Advanced Generator Section */}
        <section className="bg-background/80 rounded-xl border shadow-lg p-6 mb-10">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2"><Settings className="h-5 w-5 text-primary" /> Advanced Caption Generator</h2>
          <p className="text-muted-foreground mb-4">Generate custom captions for this category with advanced options.</p>
          {/* Example Prompts */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[`A fun day at the beach with friends`, `Delicious homemade pizza night`, `Exploring a new city`, `My morning workout routine`, `A cozy rainy day indoors`].map((ex, i) => (
              <button
                key={i}
                className="px-3 py-1 rounded-full bg-muted/60 hover:bg-primary/10 text-sm text-muted-foreground border border-muted-foreground/20 transition-colors"
                onClick={() => setPrompt(ex)}
                type="button"
              >
                {ex}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label>Language</Label>
              <Select value={options.language || "en"} onValueChange={v => setOptions(o => ({ ...o, language: v }))}>
                <SelectTrigger><SelectValue placeholder="Select language" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="ar">Arabic</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                  <SelectItem value="pt">Portuguese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Post Type</Label>
              <Select value={options.postType || "photo"} onValueChange={v => setOptions(o => ({ ...o, postType: v }))}>
                <SelectTrigger><SelectValue placeholder="Select post type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="photo"><ImageIcon className="inline h-4 w-4 mr-1" />Photo</SelectItem>
                  <SelectItem value="video"><Video className="inline h-4 w-4 mr-1" />Video</SelectItem>
                  <SelectItem value="reel"><Film className="inline h-4 w-4 mr-1" />Reel</SelectItem>
                  <SelectItem value="story"><BookMarked className="inline h-4 w-4 mr-1" />Story</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Textarea
            placeholder={`Describe your post for a ${displayCategoryName} caption...`}
            value={prompt}
            onChange={e => { setPrompt(e.target.value); setPromptCharCount(e.target.value.length); }}
            className="min-h-[100px] mb-2"
          />
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-[180px]">
              <Label>Style</Label>
              <Select value={options.style} onValueChange={v => setOptions(o => ({ ...o, style: v }))}>
                <SelectTrigger><SelectValue placeholder="Select style" /></SelectTrigger>
                <SelectContent>{styleOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[180px]">
              <Label>Tone</Label>
              <Select value={options.tone} onValueChange={v => setOptions(o => ({ ...o, tone: v }))}>
                <SelectTrigger><SelectValue placeholder="Select tone" /></SelectTrigger>
                <SelectContent>{toneOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[180px]">
              <Label>Length</Label>
              <Slider value={[options.length]} onValueChange={([v]) => setOptions(o => ({ ...o, length: v }))} min={50} max={300} step={10} />
            </div>
            <div className="flex-1 min-w-[180px]">
              <Label>Creativity</Label>
              <Slider value={[options.creativity * 100]} onValueChange={([v]) => setOptions(o => ({ ...o, creativity: v / 100 }))} min={0} max={100} step={10} />
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <Switch checked={options.includeHashtags} onCheckedChange={v => setOptions(o => ({ ...o, includeHashtags: v }))} />
            <Label>Include Hashtags</Label>
            <Switch checked={options.includeEmojis} onCheckedChange={v => setOptions(o => ({ ...o, includeEmojis: v }))} />
            <Label>Include Emojis</Label>
          </div>
          <Button size="lg" onClick={handleGenerate} disabled={isGenerating || !prompt.trim()} className="bg-gradient-to-r from-primary to-pink-500 text-white px-8 mb-4 shadow-lg hover:scale-105 transition-transform">
            {isGenerating ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating...</>) : "Generate Caption"}
          </Button>
          {/* Progress Bar */}
          {isGenerating && (
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-4">
              <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="h-full bg-gradient-to-r from-primary to-pink-500" />
            </div>
          )}
          {/* Copy All Button */}
          {generatedCaptions.length > 1 && !isGenerating && (
            <div className="flex justify-end mb-2">
              <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(generatedCaptions.join('\n\n'))} className="gap-2">
                <Copy className="h-4 w-4" /> Copy All
              </Button>
            </div>
          )}
          <AnimatePresence>
            {generatedCaptions.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mt-6 grid gap-4">
                {generatedCaptions.map((caption, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.07 }}
                    className="relative p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-pink-500/10 to-blue-500/10 border border-primary/20 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(caption)}
                        className="h-8 w-8 p-0"
                        aria-label="Copy caption"
                      >
                        <Copy className="h-4 w-4 text-primary" />
                      </Button>
                      <Button
                        variant={favorites.includes(idx) ? "default" : "ghost"}
                        size="sm"
                        onClick={() => toggleFavorite(idx)}
                        className="h-8 w-8 p-0"
                        aria-label={favorites.includes(idx) ? "Remove from favorites" : "Add to favorites"}
                      >
                        {favorites.includes(idx) ? <Heart className="h-4 w-4 text-pink-500" /> : <HeartOff className="h-4 w-4 text-muted-foreground" />}
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <h3 className="font-medium text-lg">Generated Caption {idx + 1}</h3>
                    </div>
                    <div className="prose prose-sm max-w-none mb-2"><p className="text-base leading-relaxed text-foreground/90">{caption}</p></div>
                    {/* Hashtag Preview */}
                    {caption.match(/#[\w]+/g) && (
                      <div className="flex items-center gap-2 mt-2">
                        <Hash className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground truncate max-w-xs">
                          {caption.match(/#[\w]+/g)?.join(' ')}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(caption.match(/#[\w]+/g)?.join(' ') || '')}
                          className="h-8 w-8 p-0"
                          aria-label="Copy hashtags"
                        >
                          <Copy className="h-4 w-4 text-primary" />
                        </Button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
        {/* How to Use Section */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Info className="h-5 w-5 text-primary" /> How to Use</h2>
          <p className="text-muted-foreground mb-2">Get the most out of the captions generator. It&apos;s fast, free, and designed for everyone!</p>
          {/* Mobile: vertical stepper, Desktop: horizontal stepper */}
          <div className="flex flex-col sm:flex-row items-stretch justify-center gap-6 sm:gap-6 relative">
            {howToSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-row sm:flex-col items-center sm:items-center text-left sm:text-center bg-gradient-to-br from-primary/5 via-pink-500/5 to-blue-500/5 border shadow-md rounded-2xl p-4 sm:p-6 w-full sm:w-64 min-h-[120px] sm:min-h-[220px] mx-auto`}
                tabIndex={0}
                aria-label={`Step ${i + 1}: ${step.title}`}
              >
                {/* Stepper line for mobile */}
                {i !== howToSteps.length - 1 && (
                  <div className="hidden sm:block absolute left-1/2 top-full w-1 h-6 bg-primary/20" style={{ transform: 'translateX(-50%)' }} />
                )}
                {i !== howToSteps.length - 1 && (
                  <div className="block sm:hidden absolute left-8 top-full w-0.5 h-8 bg-primary/20" />
                )}
                {/* Number badge with animation */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex-shrink-0 z-20 bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-lg border-4 border-background mr-4 sm:mr-0 sm:mb-4"
                  style={{ minWidth: 48, minHeight: 48 }}
                >
                  {i + 1}
                </motion.div>
                <div className="flex-1 flex flex-col items-start sm:items-center">
                  <div className="mb-2 sm:mb-2 mt-0 sm:mt-2">{step.icon}</div>
                  <h3 className="font-semibold mb-1 text-base sm:text-lg mt-0 sm:mt-2">{step.title}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-snug sm:leading-normal">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Info className="h-5 w-5 text-primary" /> FAQ</h2>
          <p className="text-muted-foreground mb-6 text-center max-w-2xl mx-auto">Find answers to the most common questions about using the captions generator. Still have questions? Contact us anytime!</p>
          <div className="space-y-3 sm:space-y-4 bg-gradient-to-br from-primary/5 via-pink-500/5 to-blue-500/5 rounded-2xl p-2 sm:p-8">
            {faqs.map((item, i) => (
              <FAQItem key={i} {...item} />
            ))}
          </div>
        </section>
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

function FAQItem({ q, a, icon }: { q: string; a: string; icon: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <motion.div
      initial={{ borderRadius: 16 }}
      animate={{ borderRadius: open ? 24 : 16 }}
      className={`border bg-background/70 rounded-xl shadow-sm overflow-hidden transition-all group hover:shadow-lg hover:border-primary/40`}
    >
      <button
        className="w-full flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4 text-left focus:outline-none focus:ring-2 focus:ring-primary/30 group-hover:bg-primary/5 transition-colors"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`FAQ: ${q}`}
        tabIndex={0}
        style={{ minHeight: 56 }}
      >
        <span className="flex items-center gap-2 sm:gap-3 font-semibold text-sm sm:text-base">{icon}{q}</span>
        <ChevronDown className={`h-6 w-6 ml-2 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="px-3 sm:px-4 pb-4 pt-2 bg-primary/5 text-black text-sm sm:text-base rounded-b-xl"
          >
            {a}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
} 