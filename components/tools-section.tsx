"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  MessageSquareText, 
  Hash, 
  Image, 
  Download, 
  BarChart, 
  Sparkles,
  Megaphone,
  X,
  Loader2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ToolCard from "@/components/tool-card";
import { motion, AnimatePresence } from "framer-motion";

// Tool data with gradients
const toolsData = [
  {
    id: 1,
    title: "AI Caption Generator",
    description: "Generate engaging captions for your Instagram posts with AI.",
    icon: MessageSquareText,
    category: "generators",
    popular: true,
    comingSoon: false,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    title: "Hashtag Finder",
    description: "Discover trending hashtags that boost your post's visibility.",
    icon: Hash,
    category: "generators",
    popular: true,
    comingSoon: false,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    title: "Profile Analyzer",
    description: "Get insights and analytics for any Instagram profile.",
    icon: BarChart,
    category: "analyzers",
    popular: false,
    comingSoon: false,
    gradient: "from-green-500 to-emerald-500"
  },
  {
    id: 4,
    title: "Content Planner",
    description: "Plan and schedule your Instagram content calendar.",
    icon: Image,
    category: "planners",
    popular: false,
    comingSoon: true,
    gradient: "from-orange-500 to-amber-500"
  },
  {
    id: 5,
    title: "Media Downloader",
    description: "Download photos, videos, and stories from Instagram.",
    icon: Download,
    category: "downloaders",
    popular: true,
    comingSoon: false,
    gradient: "from-indigo-500 to-violet-500"
  },
  {
    id: 6,
    title: "Bio Writer",
    description: "Create an attractive and engaging Instagram bio with AI.",
    icon: Megaphone,
    category: "generators",
    popular: false,
    comingSoon: false,
    gradient: "from-rose-500 to-pink-500"
  },
  {
    id: 7,
    title: "Color Palette Generator",
    description: "Generate beautiful color palettes for your Instagram theme.",
    icon: Image,
    category: "generators",
    popular: false,
    comingSoon: false,
    gradient: "from-fuchsia-500 to-purple-500"
  },
  {
    id: 8,
    title: "Engagement Booster",
    description: "AI suggestions to increase engagement on your posts.",
    icon: Sparkles,
    category: "analyzers",
    popular: false,
    comingSoon: true,
    gradient: "from-cyan-500 to-blue-500"
  }
];

const categories = [
  { value: "all", label: "All Tools", gradient: "from-purple-500 to-blue-500" },
  { value: "generators", label: "Generators", gradient: "from-pink-500 to-rose-500" },
  { value: "downloaders", label: "Downloaders", gradient: "from-blue-500 to-cyan-500" },
  { value: "analyzers", label: "Analyzers", gradient: "from-green-500 to-emerald-500" },
  { value: "planners", label: "Planners", gradient: "from-orange-500 to-amber-500" }
];

export default function ToolsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Debounce search input
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredTools = toolsData.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
                         tool.description.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
    const matchesComingSoon = showComingSoon ? true : !tool.comingSoon;
    
    return matchesSearch && matchesCategory && matchesComingSoon;
  });

  return (
    <section id="tools" className="py-12 sm:py-20 tools-gradient">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-3 sm:mb-4 gradient-border">
              Tools
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
              Discover Our <span className="gradient-text">Instagram AI Tools</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-[700px]">
              Browse our collection of free AI-powered tools designed to enhance your Instagram presence.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-8 sm:mb-12"
        >
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Enhanced Search Box */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300 -z-10" />
              <div className="relative">
                <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 group-hover:from-purple-500/30 group-hover:via-pink-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-110" />
                </div>
                <Input
                  type="search"
                  placeholder="Search tools by name or description..."
                  className="pl-11 sm:pl-14 pr-10 sm:pr-12 py-4 sm:py-6 text-base sm:text-lg bg-background/80 backdrop-blur-sm border-2 focus:border-primary transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  {isSearching && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 text-primary animate-spin" />
                    </motion.div>
                  )}
                  {searchQuery && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => setSearchQuery("")}
                      className="p-1 rounded-full hover:bg-muted transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Clear search"
                    >
                      <X className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    </motion.button>
                  )}
                </div>
              </div>
              <AnimatePresence>
                {searchQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 right-0 top-full mt-2 p-2 bg-background/80 backdrop-blur-sm border rounded-lg shadow-lg"
                  >
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {filteredTools.length} {filteredTools.length === 1 ? 'result' : 'results'} found
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Category Filters */}
            <div className="flex flex-col gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-background/50 backdrop-blur-sm border gradient-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <span className="text-xs sm:text-sm font-medium">Filter by Category</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="md:hidden"
                  aria-label={isFilterOpen ? "Hide category filters" : "Show category filters"}
                >
                  {isFilterOpen ? "Hide Filters" : "Show Filters"}
                </Button>
              </div>

              <AnimatePresence>
                {(!isMobile || isFilterOpen) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {categories.map((category) => (
                        <Button
                          key={category.value}
                          variant={selectedCategory === category.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category.value)}
                          className={`relative group transition-all duration-300 text-xs sm:text-sm ${
                            selectedCategory === category.value 
                              ? `bg-gradient-to-r ${category.gradient} text-white hover:opacity-90` 
                              : "gradient-border hover:bg-background/80"
                          }`}
                        >
                          <span className="relative z-10">{category.label}</span>
                          {selectedCategory === category.value && (
                            <motion.div
                              layoutId="activeCategory"
                              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-md"
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ToolCard tool={tool} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 sm:py-16">
              <h3 className="text-base sm:text-lg font-medium mb-2">No tools found</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mt-8 sm:mt-12"
        >
          <Button
            variant="outline"
            onClick={() => setShowComingSoon(!showComingSoon)}
            className="gradient-border hover:bg-background/80 transition-colors text-sm sm:text-base"
            aria-label={showComingSoon ? "Hide coming soon tools" : "Show coming soon tools"}
          >
            {showComingSoon ? "Hide Coming Soon" : "Show Coming Soon"} Tools
          </Button>
        </motion.div>
      </div>
    </section>
  );
}