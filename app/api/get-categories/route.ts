import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function GET(req: NextRequest) {
  try {
    // Fetch all unique categories from the related_captions table
    const { data, error } = await supabase
      .from('related_captions')
      .select('category');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Extract unique category names
    const categories = Array.from(new Set((data || []).map((row: any) => row.category)));
    return NextResponse.json(categories);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch categories.' }, { status: 500 });
  }
} 