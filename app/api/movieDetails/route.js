// app/api/movieDetails/route.js (for App Router)

import { NextResponse } from 'next/server';
import { cache } from '../../_utils/cache';

const CACHE_TTL = 60 * 60 * 24; // 24 hours in seconds

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const movieId = searchParams.get('id');

  if (!movieId) {
    return NextResponse.json({ error: 'Movie ID is required' }, { status: 400 });
  }

  // Check cache first
  const cachedData = cache.get(`movie:${movieId}`);
  if (cachedData) {
    console.log('Serving from cache');
    return NextResponse.json(cachedData);
  }

  const apiKey = process.env.OMDB_API_KEY;
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
  const fullData = await response.json();

  // Extract only the fields we want to cache
  const data = {
    id: fullData.id,
    poster_path: fullData.poster_path,
    original_title: fullData.original_title,
    genres: fullData.genres,
    release_date: fullData.release_date
  };

  // Cache the results
  cache.set(`movie:${movieId}`, data, CACHE_TTL);

  return NextResponse.json(fullData);
}