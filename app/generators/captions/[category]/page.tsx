import { Metadata } from "next";
import ClientPage from "./ClientPage";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const category = params.category.charAt(0).toUpperCase() + params.category.slice(1);
  const { data } = await supabase
    .from("related_captions")
    .select("meta_title, meta_description")
    .eq("category", category)
    .single();

  return {
    title: data?.meta_title || "Instagram Captions Generator | TechIGem",
    description: data?.meta_description || "Generate the best Instagram captions for your posts. Free, creative, and unique captions generator by TechIGem."
  };
}

export default async function Page({ params }: any) {
  const category = params.category.charAt(0).toUpperCase() + params.category.slice(1);
  const { data } = await supabase
    .from("related_captions")
    .select("category, captions")
    .eq("category", category)
    .single();

  return <ClientPage categoryData={data ?? { category, captions: [] }} />;
} 