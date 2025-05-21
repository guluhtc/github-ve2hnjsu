import { Metadata } from "next";
import ClientPage from "./ClientPage";
import { createClient } from "@supabase/supabase-js";
import { useMemo } from "react";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = category.trim().toLowerCase();
  let { data, error } = await supabase
    .from("related_captions")
    .select("meta_title, meta_description")
    .ilike("category", cat)
    .single();
  if (!data) {
    // Fallback: log all rows for debugging
    const all = await supabase.from("related_captions").select("category, meta_title, meta_description");
    console.log('Supabase meta fallback, all rows:', all.data, all.error);
  }
  console.log('Supabase meta:', data, error);
  return {
    title: data?.meta_title || "Instagram Captions Generator | TechIGem",
    description: data?.meta_description || "Generate the best Instagram captions for your posts. Free, creative, and unique captions generator by TechIGem."
  };
}

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = category.toLowerCase();
  const { data } = await supabase
    .from("related_captions")
    .select("category, captions")
    .ilike("category", cat)
    .single();

  // Memoize fallback value to avoid infinite re-renders
  const stableData = data ?? { category: cat, captions: [] };

  return <ClientPage categoryData={stableData} />;
} 