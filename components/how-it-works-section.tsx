"use client";

import { motion } from "framer-motion";
import { Sparkles, MessageSquareText, BarChart } from "lucide-react";

const steps = [
  {
    icon: <Sparkles className="w-8 h-8 text-primary mb-3" />,
    title: "Choose a Tool",
    description: "Select from our suite of free AI-powered Instagram tools."
  },
  {
    icon: <MessageSquareText className="w-8 h-8 text-primary mb-3" />,
    title: "Generate & Optimize",
    description: "Let AI create captions, hashtags, bios, and more in seconds."
  },
  {
    icon: <BarChart className="w-8 h-8 text-primary mb-3" />,
    title: "Grow Your Presence",
    description: "Boost engagement and followers with smarter content."
  }
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-background/70">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-14"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            How It Works
          </h3>
          <p className="text-muted-foreground max-w-xl text-lg">
            Get started in three simple steps and elevate your Instagram game instantly.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center bg-background/80 rounded-xl p-8 shadow-sm border"
            >
              {step.icon}
              <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
              <p className="text-muted-foreground text-base">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 