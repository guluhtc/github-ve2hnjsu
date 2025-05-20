"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const captionStyles = [
  { value: "casual", label: "Casual & Fun" },
  { value: "professional", label: "Professional" },
  { value: "storytelling", label: "Storytelling" },
  { value: "question", label: "Question-based" },
  { value: "quote", label: "Quote-style" },
  { value: "call-to-action", label: "Call to Action" }
];

const tones = [
  { value: "friendly", label: "Friendly" },
  { value: "professional", label: "Professional" },
  { value: "humorous", label: "Humorous" },
  { value: "inspirational", label: "Inspirational" },
  { value: "emotional", label: "Emotional" }
];

interface CaptionOptionsProps {
  onOptionsChange: (options: any) => void;
}

export interface CaptionOptions {
  style: string;
  tone: string;
  length: number;
  includeHashtags: boolean;
  includeEmojis: boolean;
  maxHashtags: number;
  creativity: number;
  customHashtags: string;
}

export default function CaptionOptions({ onOptionsChange }: CaptionOptionsProps) {
  const [options, setOptions] = useState<CaptionOptions>({
    style: "casual",
    tone: "friendly",
    length: 150,
    includeHashtags: true,
    includeEmojis: true,
    maxHashtags: 5,
    creativity: 0.7,
    customHashtags: "",
  });

  const handleOptionChange = (key: string, value: any) => {
    const newOptions = { ...options, [key]: value };
    setOptions(newOptions);
    onOptionsChange(newOptions);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-4 rounded-lg border bg-muted/50"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Writing Style</Label>
          <Select
            value={options.style}
            onValueChange={(value) => handleOptionChange("style", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              {captionStyles.map((style) => (
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
            onValueChange={(value) => handleOptionChange("tone", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              {tones.map((tone) => (
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
          onValueChange={([value]) => handleOptionChange("length", value)}
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
            handleOptionChange("creativity", value / 100)
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
              handleOptionChange("includeHashtags", checked)
            }
          />
          <Label>Include Hashtags</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={options.includeEmojis}
            onCheckedChange={(checked) =>
              handleOptionChange("includeEmojis", checked)
            }
          />
          <Label>Include Emojis</Label>
        </div>
      </div>

      {options.includeHashtags && (
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Maximum Hashtags</Label>
              <span className="text-sm text-muted-foreground">
                {options.maxHashtags}
              </span>
            </div>
            <Slider
              value={[options.maxHashtags]}
              onValueChange={([value]) =>
                handleOptionChange("maxHashtags", value)
              }
              max={30}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Custom Hashtags (optional)</Label>
            <Input
              placeholder="#nature #travel #photography"
              value={options.customHashtags}
              onChange={(e) =>
                handleOptionChange("customHashtags", e.target.value)
              }
              className="text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Add your preferred hashtags, separated by spaces
            </p>
          </div>

          {options.customHashtags && (
            <div className="flex flex-wrap gap-2">
              {options.customHashtags
                .split(" ")
                .filter((tag: string) => tag.trim())
                .map((tag: string, index: number) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs"
                  >
                    {tag.startsWith("#") ? tag : `#${tag}`}
                  </Badge>
                ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
} 