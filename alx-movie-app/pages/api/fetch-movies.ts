import { MoviesProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== "POST") {
    response.setHeader("Allow", ["POST"]);
    return response.status(405).end(`Method ${request.method} Not Allowed`);
  }

  try {
    const { year, page, genre } = request.body;
    const date = new Date();

    const params = new URLSearchParams({
      year: String(year || date.getFullYear()),
      sort: "year.decr",
      limit: "12",
      page: String(page || 1),
    });

    if (genre) params.append("genre", genre);

    const url = `https://moviesdatabase.p.rapidapi.com/titles?${params.toString()}`;

    console.log("🎬 Fetching from:", url);

    const resp = await fetch(url, {
      headers: {
        "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
        "x-rapidapi-key": process.env.MOVIE_API_KEY as string,
      },
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error("❌ RapidAPI Error:", resp.status, resp.statusText, text);
      return response.status(resp.status).json({ error: "Failed to fetch movies" });
    }

    const moviesResponse = await resp.json();
    const movies: MoviesProps[] = moviesResponse.results || [];

    console.log("✅ Movies fetched:", movies.length);

    return response.status(200).json({ movies });
 } catch (error: unknown) {

    console.error("🔥 API Error:", error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
}
