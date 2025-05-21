import { Metadata } from "next";
import ClientPage from "./ClientPage";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const category = params.category.trim().toLowerCase();
  let { data, error } = await supabase
    .from("related_captions")
    .select("meta_title, meta_description")
    .ilike("category", category)
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

export default async function Page({ params }: any) {
  const category = params.category.toLowerCase();
  const { data } = await supabase
    .from("related_captions")
    .select("category, captions")
    .ilike("category", category)
    .single();

  return <ClientPage categoryData={data ?? { category, captions: [] }} />;
} 