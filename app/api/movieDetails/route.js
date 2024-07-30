// pages/api/movieDetails.js (for Pages Router)
// or app/api/movieDetails/route.js (for App Router)

import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const imdbID = searchParams.get('id');

  if (!imdbID) {
    return NextResponse.json({ error: 'IMDb ID is required' }, { status: 400 });
  }

  const apiKey = process.env.OMDB_API_KEY;
  const response = await fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`);
  const data = await response.json();

  return NextResponse.json(data);
}