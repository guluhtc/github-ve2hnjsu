import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Just return an empty array for now
  return NextResponse.json([]);
} 