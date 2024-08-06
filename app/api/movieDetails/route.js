// app/api/movieDetails/route.js (for App Router)

import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const movieId = searchParams.get('id');

  if (!movieId) {
    return NextResponse.json({ error: 'Movie ID is required' }, { status: 400 });
  }

  const apiKey = process.env.OMDB_API_KEY;
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
  const data = await response.json();

  return NextResponse.json(data);
}