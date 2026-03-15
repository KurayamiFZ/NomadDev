import { NextResponse } from "next/server";

export async function GET() {
  console.log('=== TEST PROFILE API CALLED ===');
  return NextResponse.json({ 
    message: "Profile API is working",
    timestamp: new Date().toISOString()
  });
}
