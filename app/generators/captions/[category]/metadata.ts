import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = params.category.charAt(0).toUpperCase() + params.category.slice(1);
  return {
    title: `${category} Instagram Captions Generator - Free AI Captions for ${category}`,
    description: `Generate the best ${category} Instagram captions with our free AI-powered tool. Perfect for ${category} posts!`,
  };
} 