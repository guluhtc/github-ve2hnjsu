"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const GENERATOR_TYPES = [
  { key: "classic", label: "Classic" },
  { key: "ai", label: "AI" },
  { key: "funny", label: "Funny" },
  { key: "classy", label: "Classy" },
  { key: "tamil", label: "Tamil" },
  { key: "cool", label: "Cool" },
  { key: "aesthetic", label: "Aesthetic" },
];

const usernameStyles = {
  classic: [
    (base: string) => `${base}_official`,
    (base: string) => `the_real_${base}`,
    (base: string) => `${base}xoxo`,
    (base: string) => `its_${base}`,
    (base: string) => `${base}_insta`,
    (base: string) => `hey_${base}`,
    (base: string) => `${base}_vibes`,
    (base: string) => `iam_${base}`,
    (base: string) => `${base}_online`,
    (base: string) => `just_${base}`,
    (base: string) => `${base}_gram`,
    (base: string) => `real_${base}`,
    (base: string) => `${base}_diary`,
    (base: string) => `itsme_${base}`,
    (base: string) => `${base}_life`,
  ],
  ai: [
    (base: string) => `${base}_dreamer`,
    (base: string) => `x_${base}_x`,
    (base: string) => `${base}ify`,
    (base: string) => `the${base.charAt(0).toUpperCase() + base.slice(1)}Era`,
    (base: string) => `${base}_legend`,
    (base: string) => `its${base.charAt(0).toUpperCase() + base.slice(1)}`,
    (base: string) => `${base}_bot`,
    (base: string) => `@${base}_ai`,
    (base: string) => `${base}_genius`,
    (base: string) => `not_a_${base}`,
    (base: string) => `theonly${base}`,
    (base: string) => `0x${base}`,
    (base: string) => `${base}_hq`,
    (base: string) => `get${base.charAt(0).toUpperCase() + base.slice(1)}`,
    (base: string) => `try${base.charAt(0).toUpperCase() + base.slice(1)}`,
  ],
  funny: [
    (base: string) => `lol_${base}`,
    (base: string) => `${base}_haha`,
    (base: string) => `rofl_${base}`,
    (base: string) => `punny_${base}`,
    (base: string) => `notso${base}`,
    (base: string) => `silly_${base}`,
    (base: string) => `meme_${base}`,
    (base: string) => `giggle_${base}`,
    (base: string) => `witty_${base}`,
    (base: string) => `jokester_${base}`,
    (base: string) => `haha_${base}_lol`,
    (base: string) => `funny_${base}_guy`,
    (base: string) => `chuckle_${base}`,
    (base: string) => `snicker_${base}`,
    (base: string) => `banter_${base}`,
  ],
  classy: [
    (base: string) => `the_${base}_society`,
    (base: string) => `mr_${base}`,
    (base: string) => `ms_${base}`,
    (base: string) => `sir_${base}`,
    (base: string) => `lady_${base}`,
    (base: string) => `dr_${base}`,
    (base: string) => `lord_${base}`,
    (base: string) => `duchess_${base}`,
    (base: string) => `countess_${base}`,
    (base: string) => `baron_${base}`,
    (base: string) => `the_${base}_affair`,
    (base: string) => `elite_${base}`,
    (base: string) => `royal_${base}`,
    (base: string) => `noble_${base}`,
    (base: string) => `the_${base}_club`,
  ],
  tamil: [
    (base: string) => `${base}_anna`,
    (base: string) => `${base}_thambi`,
    (base: string) => `${base}_kutty`,
    (base: string) => `${base}_amma`,
    (base: string) => `${base}_thala`,
    (base: string) => `${base}_mass`,
    (base: string) => `${base}_rowdy`,
    (base: string) => `singam_${base}`,
    (base: string) => `kolly_${base}`,
    (base: string) => `chennai_${base}`,
    (base: string) => `madras_${base}`,
    (base: string) => `super_${base}`,
    (base: string) => `vera_${base}_level`,
    (base: string) => `thamizhan_${base}`,
    (base: string) => `mass_${base}`,
  ],
  cool: [
    (base: string) => `cool_${base}`,
    (base: string) => `xX_${base}_Xx`,
    (base: string) => `the_${base}_zone`,
    (base: string) => `ice_${base}`,
    (base: string) => `chill_${base}`,
    (base: string) => `dope_${base}`,
    (base: string) => `swag_${base}`,
    (base: string) => `vibe_${base}`,
    (base: string) => `urban_${base}`,
    (base: string) => `fresh_${base}`,
    (base: string) => `hype_${base}`,
    (base: string) => `lit_${base}`,
    (base: string) => `savage_${base}`,
    (base: string) => `boss_${base}`,
    (base: string) => `zone_${base}`,
  ],
  aesthetic: [
    (base: string) => `✧${base}✧`,
    (base: string) => `『${base}』`,
    (base: string) => `꧁${base}꧂`,
    (base: string) => `•°${base}°•`,
    (base: string) => `✿${base}✿`,
    (base: string) => `《${base}》`,
    (base: string) => `❥${base}❥`,
    (base: string) => `°•¤${base}¤•°`,
    (base: string) => `✧彡${base}彡✧`,
    (base: string) => `✪${base}✪`,
    (base: string) => `❦${base}❦`,
    (base: string) => `✧彡${base}彡✧`,
    (base: string) => `✧${base}✧`,
    (base: string) => `✿${base}✿`,
    (base: string) => `❥${base}❥`,
  ],
};

export default function UsernameGeneratorPage() {
  const [input, setInput] = useState("");
  const [type, setType] = useState<keyof typeof usernameStyles>("classic");

  function generateUsernames(base: string, type: keyof typeof usernameStyles) {
    if (!base) return [];
    const clean = base.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    return usernameStyles[type].map((fn) => fn(clean));
  }

  const usernames = generateUsernames(input, type);

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-12 sm:pb-16 bg-gradient-to-b from-purple-50 via-white to-blue-50 flex flex-col items-center">
      <div className="container px-3 sm:px-4 md:px-6 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-center text-blue-700 gradient-text">Instagram Usernames Generator</h1>
        <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto text-lg">
          Generate unique, stylish, and AI-powered Instagram usernames instantly. Choose a style below and try as many as you like!
        </p>
        {/* Floating bar for generator type selection */}
        <div className="sticky top-4 z-20 flex justify-center mb-8">
          <div className="bg-white/95 rounded-2xl shadow-xl flex gap-1 py-2 flex-wrap justify-center backdrop-blur supports-backdrop-blur:backdrop-blur-md transition-all
            sm:flex-nowrap sm:overflow-x-auto sm:gap-2 sm:px-2">
            {GENERATOR_TYPES.map((g) => (
              <button
                key={g.key}
                onClick={() => setType(g.key as keyof typeof usernameStyles)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400
                  ${type === g.key as keyof typeof usernameStyles
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow scale-105"
                    : "bg-blue-50 text-blue-700 hover:bg-blue-100"}
                `}
                style={{ minWidth: 80 }}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>
        <Card className="w-full bg-white border border-blue-200 shadow">
          <CardHeader>
            <CardTitle className="text-blue-700 text-lg sm:text-2xl">{GENERATOR_TYPES.find(g => g.key === type)?.label} Username Generator</CardTitle>
            <CardDescription className="text-blue-500 text-xs sm:text-base">Enter a word or your name to generate {GENERATOR_TYPES.find(g => g.key === type)?.label?.toLowerCase()} Instagram usernames.</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Enter a keyword or name..."
              className="mb-4 text-base sm:text-lg px-3 sm:px-4 py-2 sm:py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            {usernames.length > 0 && (
              <div className="mt-2">
                <h2 className="text-base sm:text-lg font-semibold mb-2 text-purple-700">{GENERATOR_TYPES.find(g => g.key === type)?.label} Username Ideas</h2>
                <ul className="grid gap-2 grid-cols-1 sm:grid-cols-2">
                  {usernames.map((name, i) => (
                    <li key={i} className="p-2 sm:p-3 bg-white border border-gray-200 rounded-lg text-base sm:text-lg font-mono select-all shadow-sm flex items-center gap-2 hover:bg-blue-50 transition cursor-pointer text-blue-700">
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="w-full bg-white border border-blue-200 shadow mt-8">
          <CardHeader>
            <CardTitle className="text-blue-700 text-lg sm:text-2xl">Tips for Creating a Good Username</CardTitle>
            <CardDescription className="text-blue-500 text-xs sm:text-base">Follow these tips to make your username stand out and be memorable!</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-blue-900 text-sm sm:text-base">
              <li>Keep it short, simple, and easy to remember.</li>
              <li>Avoid using too many numbers or special characters.</li>
              <li>Use keywords that reflect your personality or niche.</li>
              <li>Try combining two words or adding a unique twist.</li>
              <li>Check availability on Instagram before finalizing.</li>
              <li>Use styles or symbols for extra flair, but don&apos;t overdo it.</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="w-full bg-white border border-purple-200 shadow mt-8">
          <CardHeader>
            <CardTitle className="text-purple-700 text-lg sm:text-2xl">Sample Usernames</CardTitle>
            <CardDescription className="text-purple-500 text-xs sm:text-base">Here are some example usernames for inspiration:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "the_real_raj",
                "cool_anu",
                "chennai_star",
                "funny_vibes",
                "aesthetic_queen",
                "tamil_thala",
                "mr_classy",
                "swag_boss",
                "xX_rockstar_Xx",
                "itsme_sam",
                "urban_kutty",
                "vibe_with_me",
                "singam_anna",
                "elite_girl",
                "dope_dude",
                "madras_magic",
                "punny_guy",
                "royal_lady",
                "lit_life",
                "banter_boy"
              ].map((sample, idx) => (
                <div key={idx} className="p-2 bg-blue-50 border border-blue-100 rounded text-blue-700 font-mono select-all text-base sm:text-lg">
                  {sample}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="w-full bg-white border border-blue-100 shadow mt-8 mb-8">
          <CardHeader>
            <CardTitle className="text-blue-700 text-lg sm:text-2xl">FAQ</CardTitle>
            <CardDescription className="text-blue-500 text-xs sm:text-base">Frequently Asked Questions about Instagram Usernames</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5 divide-y divide-blue-50">
              <div className="pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-purple-500">💡</span>
                  <strong className="text-blue-700">Is this username generator free?</strong>
                </div>
                <p className="text-blue-900 ml-7">Yes! You can generate as many usernames as you want, completely free and unlimited.</p>
              </div>
              <div className="py-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-purple-500">🌐</span>
                  <strong className="text-blue-700">Can I use these usernames on other platforms?</strong>
                </div>
                <p className="text-blue-900 ml-7">Absolutely! These usernames work on Instagram, Facebook, Twitter, and more.</p>
              </div>
              <div className="pt-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-purple-500">🧐</span>
                  <strong className="text-blue-700">What if the username I like is taken?</strong>
                </div>
                <p className="text-blue-900 ml-7">Try adding underscores, numbers, or extra words to make it unique. Or use a different style from the generator!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 