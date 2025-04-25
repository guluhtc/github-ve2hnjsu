"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

const bioStyles = [
  { value: "professional", label: "Professional" },
  { value: "creative", label: "Creative" },
  { value: "personal", label: "Personal" },
  { value: "business", label: "Business" },
  { value: "influencer", label: "Influencer" },
  { value: "minimalist", label: "Minimalist" }
];

const tones = [
  { value: "friendly", label: "Friendly" },
  { value: "professional", label: "Professional" },
  { value: "humorous", label: "Humorous" },
  { value: "inspirational", label: "Inspirational" },
  { value: "casual", label: "Casual" }
];

interface BioOptionsProps {
  onOptionsChange: (options: BioOptions) => void;
}

export interface BioOptions {
  style: string;
  tone: string;
  length: number;
  includeEmojis: boolean;
  includeCallToAction: boolean;
}

export default function BioOptions({ onOptionsChange }: BioOptionsProps) {
  const [options, setOptions] = useState<BioOptions>({
    style: "professional",
    tone: "friendly",
    length: 50,
    includeEmojis: true,
    includeCallToAction: true
  });

  const handleOptionChange = (key: keyof BioOptions, value: any) => {
    const newOptions = { ...options, [key]: value };
    setOptions(newOptions);
    onOptionsChange(newOptions);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 p-3 sm:p-4 md:p-6 rounded-lg bg-card/50 backdrop-blur-sm border"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Bio Style</Label>
          <Select
            value={options.style}
            onValueChange={(value) => handleOptionChange("style", value)}
          >
            <SelectTrigger className="w-full h-9 text-sm">
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              {bioStyles.map((style) => (
                <SelectItem key={style.value} value={style.value} className="text-sm">
                  {style.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Tone</Label>
          <Select
            value={options.tone}
            onValueChange={(value) => handleOptionChange("tone", value)}
          >
            <SelectTrigger className="w-full h-9 text-sm">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              {tones.map((tone) => (
                <SelectItem key={tone.value} value={tone.value} className="text-sm">
                  {tone.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1.5 pt-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Length</Label>
          <span className="text-sm text-muted-foreground">{options.length}%</span>
        </div>
        <Slider
          value={[options.length]}
          onValueChange={(value) => handleOptionChange("length", value[0])}
          min={20}
          max={100}
          step={10}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
        <div className="flex items-center space-x-2">
          <Switch
            id="emojis"
            checked={options.includeEmojis}
            onCheckedChange={(checked) => handleOptionChange("includeEmojis", checked)}
            className="h-5 w-9"
          />
          <Label htmlFor="emojis" className="text-sm">Include Emojis</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="cta"
            checked={options.includeCallToAction}
            onCheckedChange={(checked) => handleOptionChange("includeCallToAction", checked)}
            className="h-5 w-9"
          />
          <Label htmlFor="cta" className="text-sm">Include Call to Action</Label>
        </div>
      </div>
    </motion.div>
  );
} 