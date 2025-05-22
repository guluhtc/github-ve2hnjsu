"use client";

import { MessageSquareText, Hash, Megaphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Link from "next/link";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";

const generators = [
  {
    id: "captions",
    title: "Caption Generator",
    description: "Create engaging captions for your Instagram posts",
    icon: MessageSquareText,
    href: "/generators/captions",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: "bios",
    title: "Bio Generator",
    description: "Generate professional and attractive Instagram bios",
    icon: Megaphone,
    href: "/generators/bios",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: "hashtags",
    title: "Hashtag Generator",
    description: "Find trending and relevant hashtags for your posts",
    icon: Hash,
    href: "/generators/hashtags",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    id: "usernames",
    title: "Username Generator",
    description: "Generate unique and stylish Instagram usernames",
    icon: MessageSquareText,
    href: "/generators/usernames",
    gradient: "from-pink-500 to-yellow-500"
  }
];

export default function GeneratorsPage() {
  const [activeGenerator, setActiveGenerator] = useState("captions");

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-12 sm:pb-16 bg-gradient-to-b from-purple-50 via-white to-blue-50 flex flex-col items-center">
      <div className="container px-3 sm:px-4 md:px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 gradient-border text-blue-700 border-blue-200 bg-blue-50 text-base">AI Generators</Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 gradient-text">
            to Generate Content Generators
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg mb-8">
            Choose from our collection of AI-powered tools to Generate content. Instantly create captions, bios, hashtags, usernames, and more for your social media success.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-7 md:gap-8 max-w-5xl mx-auto w-full px-1 sm:px-0">
          {generators.map((generator, index) => (
            <motion.div
              key={generator.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={generator.href} className="block h-full">
                <div className="h-full p-4 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl border-2 border-blue-100 bg-gradient-to-br from-white via-blue-50 to-purple-50 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-300 transition-all duration-300 group relative overflow-hidden active:scale-[0.98] sm:active:scale-100">
                  <div className={`absolute inset-0 bg-gradient-to-br ${generator.gradient} opacity-[0.07] group-hover:opacity-[0.15] transition-opacity duration-500 rounded-2xl sm:rounded-3xl`}></div>
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className={`rounded-full p-3 sm:p-4 bg-gradient-to-br ${generator.gradient} mb-3 sm:mb-5 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl`}>
                      <generator.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <h2 className="text-base sm:text-xl font-bold mb-1 sm:mb-2 group-hover:text-primary transition-colors text-blue-700 drop-shadow-sm">{generator.title}</h2>
                    <p className="text-muted-foreground text-xs sm:text-base">
                      {generator.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        {/* Tips and FAQ Section */}
        <div className="w-full max-w-3xl mx-auto mt-16">
          <div className="bg-white border border-blue-100 rounded-2xl shadow p-6 mb-8">
            <h3 className="text-xl font-bold mb-3 text-blue-700">Tips for Using Generators</h3>
            <ul className="list-disc pl-5 space-y-2 text-blue-900 text-sm sm:text-base">
              <li>Try different generators for a variety of content ideas.</li>
              <li>Personalize the generated text to match your brand or personality.</li>
              <li>Use the copy feature to quickly grab results for your posts.</li>
              <li>Experiment with styles and keywords for the best results.</li>
              <li>All tools are free and unlimited—explore as much as you want!</li>
            </ul>
          </div>
          <div className="bg-white border border-purple-100 rounded-2xl shadow p-6">
            <h3 className="text-xl font-bold mb-3 text-purple-700">FAQ</h3>
            <div className="space-y-5 divide-y divide-blue-50">
              <div className="pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-blue-500">💡</span>
                  <strong className="text-blue-700">Are these generators free?</strong>
                </div>
                <p className="text-blue-900 ml-7">Yes! All our Instagram tools are free and unlimited to use.</p>
              </div>
              <div className="py-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-blue-500">🌐</span>
                  <strong className="text-blue-700">Can I use the results on other platforms?</strong>
                </div>
                <p className="text-blue-900 ml-7">Absolutely! The generated content works for Instagram, Facebook, Twitter, and more.</p>
              </div>
              <div className="pt-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-blue-500">🧐</span>
                  <strong className="text-blue-700">How do I get the best results?</strong>
                </div>
                <p className="text-blue-900 ml-7">Try different keywords, styles, and generators. Personalize the output for your audience.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}