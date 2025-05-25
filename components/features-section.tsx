"use client";

import { 
  Zap, 
  Lock, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  BarChart,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Sparkles,
    title: "Advanced AI Technology",
    description: "Powered by cutting-edge AI algorithms for creating engaging Instagram content.",
    benefits: ["Smart caption generation", "Trending hashtag suggestions", "Content optimization"],
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Lock,
    title: "Forever Free",
    description: "Access all premium features without any hidden costs or subscription fees.",
    benefits: ["No credit card required", "Unlimited access", "Regular updates"],
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get instant results with our optimized tools and streamlined processes.",
    benefits: ["Real-time processing", "Quick analytics", "Instant previews"],
    gradient: "from-amber-500 to-orange-500"
  },
  {
    icon: TrendingUp,
    title: "Proven Growth",
    description: "Data-driven strategies to expand your reach and boost engagement.",
    benefits: ["Engagement tracking", "Growth analytics", "Performance insights"],
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Clock,
    title: "Time Saver",
    description: "Automate repetitive tasks and focus on creating amazing content.",
    benefits: ["Batch processing", "Scheduled posts", "Quick workflows"],
    gradient: "from-rose-500 to-pink-500"
  },
  {
    icon: BarChart,
    title: "Deep Analytics",
    description: "Comprehensive insights to understand and improve your Instagram strategy.",
    benefits: ["Performance metrics", "Audience insights", "Content analysis"],
    gradient: "from-indigo-500 to-violet-500"
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-28 features-gradient bg-background/80">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 gradient-border">
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            Why Choose <span className="gradient-text">TechIGem Tools</span>?
          </h2>
          <p className="text-muted-foreground max-w-[700px] text-lg mb-2">
            Discover the unique advantages that set our platform apart and help you grow faster on Instagram.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative p-8 rounded-xl bg-background/50 backdrop-blur-sm border overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className={`rounded-full p-3 bg-gradient-to-br ${feature.gradient} mb-4 w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground mb-6">
                  {feature.description}
                </p>
                
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 * idx }}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className={`h-4 w-4 flex-shrink-0 bg-gradient-to-br ${feature.gradient} text-white rounded-full`} />
                      {benefit}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}