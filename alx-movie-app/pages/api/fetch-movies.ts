import { MoviesProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== "POST") {
    response.setHeader("Allow", ["POST"]);
    return response
      .status(405)
      .json({ message: `Method ${request.method} Not Allowed` });
  }

  try {
    const { year, page, genre } = request.body;

    // Check if API key exists
    if (!process.env.MOVIE_API_KEY) {
      console.error("MOVIE_API_KEY is not set in environment variables");
      return response.status(500).json({
        message: "API configuration error. Please check server logs.",
      });
    }

    const date = new Date();
    const currentYear = year || date.getFullYear();
    
    // Build URL properly
    let apiUrl = `https://moviesdatabase.p.rapidapi.com/titles?year=${currentYear}&sort=year.decr&limit=12&page=${page}`;
    
    // Add genre only if it's provided and not empty
    if (genre && genre.trim() !== "") {
      apiUrl += `&genre=${genre}`;
    }

    console.log("Fetching from:", apiUrl);

    const resp = await fetch(apiUrl, {
      headers: {
        "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
        "x-rapidapi-key": process.env.MOVIE_API_KEY,
      },
    });

    if (!resp.ok) {
      const errorText = await resp.text();
      console.error("RapidAPI Error:", resp.status, errorText);
      return response.status(resp.status).json({
        message: `Failed to fetch movies: ${resp.statusText}`,
        movies: [],
      });
    }

    const moviesResponse = await resp.json();
    const movies: MoviesProps[] = moviesResponse.results || [];

    console.log(`Fetched ${movies.length} movies`);

    return response.status(200).json({
      movies,
    });
  } catch (error) {
    console.error("API Handler Error:", error);
    return response.status(500).json({
      message: "Internal server error",
      movies: [],
    });
  }
}