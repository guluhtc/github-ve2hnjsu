"use client";

import { MessageSquareText, Hash, Megaphone } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

const generators = [
  {
    id: "captions",
    title: "Captions",
    icon: MessageSquareText,
    href: "/generators/captions",
    gradient: "from-purple-500 via-fuchsia-500 to-pink-500",
    iconGradient: "bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500",
    glow: "hover:shadow-purple-500/25"
  },
  {
    id: "bios",
    title: "Bios",
    icon: Megaphone,
    href: "/generators/bios",
    gradient: "from-blue-500 via-cyan-400 to-teal-500",
    iconGradient: "bg-gradient-to-br from-blue-500 via-cyan-400 to-teal-500",
    glow: "hover:shadow-blue-500/25"
  },
  {
    id: "hashtags",
    title: "Hashtags",
    icon: Hash,
    href: "/generators/hashtags",
    gradient: "from-green-500 via-emerald-400 to-teal-500",
    iconGradient: "bg-gradient-to-br from-green-500 via-emerald-400 to-teal-500",
    glow: "hover:shadow-green-500/25"
  }
];

export default function GeneratorToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const currentGenerator = pathname.split('/').pop();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-20 z-40 flex justify-center mb-8 px-4 sm:px-6"
    >
      <div className="relative w-full max-w-2xl bg-background/60 backdrop-blur-2xl border rounded-full p-1.5 sm:p-2 shadow-xl">
        <motion.div
          className="absolute inset-0 rounded-full opacity-50"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.2), rgba(59,130,246,0.2), rgba(34,197,94,0.2))"
          }}
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-green-500/10"
          animate={{
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <ToggleGroup 
          type="single" 
          value={currentGenerator}
          onValueChange={(value) => value && router.push(`/generators/${value}`)}
          className="relative flex items-center justify-center gap-1 sm:gap-2 z-10"
        >
          {generators.map((generator) => (
            <ToggleGroupItem
              key={generator.id}
              value={generator.id}
              className={`relative flex-1 sm:flex-none px-3 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-500 overflow-hidden whitespace-nowrap ${
                currentGenerator === generator.id 
                  ? `bg-gradient-to-r ${generator.gradient} shadow-lg scale-105 text-white` 
                  : `hover:bg-white/10 ${generator.glow} hover:shadow-lg`
              }`}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              
              <motion.div 
                className="relative flex items-center justify-center gap-1.5 sm:gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className={`p-1.5 sm:p-2 rounded-full ${
                    currentGenerator === generator.id 
                      ? "bg-white/20" 
                      : generator.iconGradient
                  }`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <generator.icon className={`h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 ${
                    currentGenerator === generator.id 
                      ? "text-white scale-110" 
                      : "text-white"
                  }`} />
                </motion.div>
                <span className="font-medium tracking-wide text-xs sm:text-sm">{generator.title}</span>
              </motion.div>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </motion.div>
  );
}