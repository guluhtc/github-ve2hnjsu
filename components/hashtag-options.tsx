"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

const hashtagCategories = [
  { value: "general", label: "General" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "travel", label: "Travel" },
  { value: "food", label: "Food" },
  { value: "fashion", label: "Fashion" },
  { value: "beauty", label: "Beauty" },
  { value: "fitness", label: "Fitness" },
  { value: "business", label: "Business" },
  { value: "technology", label: "Technology" },
  { value: "art", label: "Art" }
];

interface HashtagOptionsProps {
  onOptionsChange: (options: HashtagOptions) => void;
}

export interface HashtagOptions {
  category: string;
  count: number;
  includeTrending: boolean;
  includeNiche: boolean;
  includeLocation: boolean;
}

export default function HashtagOptions({ onOptionsChange }: HashtagOptionsProps) {
  const [options, setOptions] = useState<HashtagOptions>({
    category: "general",
    count: 15,
    includeTrending: true,
    includeNiche: true,
    includeLocation: false
  });

  const handleOptionChange = (key: keyof HashtagOptions, value: any) => {
    const newOptions = { ...options, [key]: value };
    setOptions(newOptions);
    onOptionsChange(newOptions);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3 sm:space-y-4 p-3 sm:p-4 md:p-6 rounded-lg bg-card/50 backdrop-blur-sm border"
    >
      <div className="space-y-1 sm:space-y-1.5">
        <Label className="text-xs sm:text-sm font-medium">Category</Label>
        <Select
          value={options.category}
          onValueChange={(value) => handleOptionChange("category", value)}
        >
          <SelectTrigger className="w-full h-8 sm:h-9 text-xs sm:text-sm" aria-label="Select hashtag category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {hashtagCategories.map((category) => (
              <SelectItem key={category.value} value={category.value} className="text-xs sm:text-sm">
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1 sm:space-y-1.5 pt-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs sm:text-sm font-medium">Number of Hashtags</Label>
          <span className="text-xs sm:text-sm text-muted-foreground">{options.count}</span>
        </div>
        <Slider
          value={[options.count]}
          onValueChange={(value) => handleOptionChange("count", value[0])}
          min={5}
          max={30}
          step={1}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 sm:gap-4 pt-2">
        <div className="flex items-center space-x-2">
          <Switch
            id="trending"
            checked={options.includeTrending}
            onCheckedChange={(checked) => handleOptionChange("includeTrending", checked)}
            className="h-4 w-8 sm:h-5 sm:w-9"
          />
          <Label htmlFor="trending" className="text-xs sm:text-sm">Include Trending</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="niche"
            checked={options.includeNiche}
            onCheckedChange={(checked) => handleOptionChange("includeNiche", checked)}
            className="h-4 w-8 sm:h-5 sm:w-9"
          />
          <Label htmlFor="niche" className="text-xs sm:text-sm">Include Niche</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="location"
            checked={options.includeLocation}
            onCheckedChange={(checked) => handleOptionChange("includeLocation", checked)}
            className="h-4 w-8 sm:h-5 sm:w-9"
          />
          <Label htmlFor="location" className="text-xs sm:text-sm">Include Location</Label>
        </div>
      </div>
    </motion.div>
  );
} 