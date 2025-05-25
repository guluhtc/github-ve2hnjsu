"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const brands = [
  {
    name: "Instagram",
    svg: (
      <svg width="80" height="24" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="24" rx="6" fill="#fff" />
        <text x="40" y="16" textAnchor="middle" fontSize="14" fill="#E1306C" fontWeight="bold">Instagram</text>
      </svg>
    )
  },
  {
    name: "YouTube",
    svg: (
      <svg width="80" height="24" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="24" rx="6" fill="#fff" />
        <text x="40" y="16" textAnchor="middle" fontSize="14" fill="#FF0000" fontWeight="bold">YouTube</text>
      </svg>
    )
  },
  {
    name: "Twitter",
    svg: (
      <svg width="80" height="24" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="24" rx="6" fill="#fff" />
        <text x="40" y="16" textAnchor="middle" fontSize="14" fill="#1DA1F2" fontWeight="bold">Twitter</text>
      </svg>
    )
  },
  {
    name: "CreatorOne",
    icon: (
      <Image src="/creators/creator1.png" alt="Creator One" width={48} height={48} className="rounded-full object-cover" />
    )
  },
  {
    name: "CreatorTwo",
    icon: (
      <Image src="/creators/creator2.png" alt="Creator Two" width={48} height={48} className="rounded-full object-cover" />
    )
  },
  {
    name: "CreatorThree",
    icon: (
      <Image src="/creators/creator3.png" alt="Creator Three" width={48} height={48} className="rounded-full object-cover" />
    )
  },
  {
    name: "AI Assistant",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded-full">
        <rect width="48" height="48" rx="24" fill="#EEF2FF" />
        <circle cx="24" cy="24" r="16" fill="#6366F1" />
        <ellipse cx="18" cy="24" rx="2.5" ry="3.5" fill="#fff" />
        <ellipse cx="30" cy="24" rx="2.5" ry="3.5" fill="#fff" />
        <rect x="20" y="30" width="8" height="2" rx="1" fill="#fff" />
      </svg>
    )
  }
];

export default function TrustedBySection() {
  return (
    <section className="py-14 bg-background/60">
      <div className="container px-4 md:px-6 text-center">
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 text-primary">
          Trusted by creators and brands worldwide
        </h3>
        <p className="text-muted-foreground text-base sm:text-lg mb-8">
          Join thousands of professionals who use our tools to grow their Instagram presence.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14">
          {brands.map((brand, idx) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer opacity-80 hover:opacity-100 shadow-md rounded-lg bg-white/70 p-2 flex items-center justify-center min-w-[80px] min-h-[48px]"
              aria-label={brand.name}
            >
              {/* Animated shimmer */}
              <motion.div
                className="absolute inset-0 rounded-lg pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.25 }}
                animate={{
                  background: "linear-gradient(90deg, transparent, #f3e8ff 50%, transparent)",
                  backgroundSize: "200% 100%",
                  backgroundPosition: ["-100% 0", "100% 0"],
                  transition: { duration: 2, repeat: Infinity, ease: "linear" }
                }}
              />
              {brand.svg || brand.icon}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 