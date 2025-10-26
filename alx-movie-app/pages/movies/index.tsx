import Button from "@/components/commons/Button";
import Loading from "@/components/commons/Loading";
import MovieCard from "@/components/commons/MovieCard";
import { MoviesProps } from "@/interfaces";
import { useCallback, useEffect, useState } from "react";

const Movies: React.FC = () => {

  const [page, setPage] = useState<number>(1)
  const [year, setYear] = useState<number | null>(null)
  const [genre, setGenre] = useState<string>("All")
  const [movies, setMovies] = useState<MoviesProps[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const fetchMovies = useCallback(async () => {
    setLoading(true)
    setError("")
    
    try {
      const response = await fetch('/api/fetch-movies', {
        method: 'POST',
        body: JSON.stringify({
          page,
          year, 
          genre: genre === "All" ? "" : genre
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        setError(errorData.message || `Error: ${response.status} ${response.statusText}`)
        setLoading(false)
        return
      }

      const data = await response.json()
      const results = data.movies || []
      console.log(results)
      setMovies(results)
      setLoading(false)
    } catch (err) {
      console.error('Fetch error:', err)
      setError('Failed to fetch movies. Please check your API.')
      setLoading(false)
      setMovies([])
    }
  }, [page, year, genre])

  useEffect(() => {
    fetchMovies()
  }, [fetchMovies])

  return (
    <div className="min-h-screen bg-[#110F17] text-white px-4 md:px-10 lg:px-44">
      <div className="py-16">
        <div className="flex flex-col md:flex-row justify-between mb-4 items-center space-x-0 md:space-x-4">
          <input
            type="text"
            placeholder="Search for a movie..."
            className="border-2 w-full md:w-96 border-[#E2D609] outline-none bg-transparent px-4 py-2 rounded-full text-white placeholder-gray-400"
          />

          <select
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setYear(Number(event.target.value))}
            className="border-2 border-[#E2D609] outline-none bg-transparent px-4 md:px-8 py-2 mt-4 md:mt-0 rounded-full w-full md:w-auto"
          >
            <option value="">Select Year</option>
            {
              [2024, 2023, 2022, 2021, 2020, 2019].map((year: number) => (
                <option value={year} key={year}>{year}</option>
              ))
            }
          </select>
        </div>

        <p className="text-[#E2D609] text-xl mb-6 mt-6">Online streaming</p>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-lg md:text-6xl font-bold">{year} {genre} Movie List</h1>
          <div className="flex flex-wrap space-x-0 md:space-x-4 mt-4 md:mt-0">
            {
              ['All', 'Animation', 'Comedy', 'Fantasy'].map((genre: string, key: number) => (
                <Button title={genre} key={key} action={() => setGenre(genre)} />
              ))
            }
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded mt-6">
            {error}
          </div>
        )}

        {/* Movies output */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-10">
          {
            movies?.map((movie: MoviesProps, key: number) => {
              if (!movie?.titleText?.text || !movie?.releaseYear?.year) {
                return null;
              }
              
              return (
                <MovieCard
                  title={movie.titleText.text}
                  posterImage={movie.primaryImage?.url || '/placeholder.jpg'}
                  releaseYear={movie.releaseYear.year}
                  key={key}
                />
              );
            })
          }
        </div>

        {movies.length === 0 && !loading && !error && (
          <p className="text-center text-gray-400 mt-10">No movies found.</p>
        )}

        <div className="flex justify-end space-x-4 mt-6">
          <Button 
            title="Previous" 
            action={() => setPage(prev => prev > 1 ? prev - 1 : 1)} 
          />
          <Button 
            title="Next" 
            action={() => setPage(page + 1)} 
          />
        </div>
      </div>
      {loading && <Loading />}
    </div>
  )
}

export default Movies;