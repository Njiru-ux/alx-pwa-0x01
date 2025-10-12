import React from 'react';
import Layout from '../../components/layout/Layout';
import MovieCard from '../../components/commons/MovieCard';
import Loading from '../../components/commons/Loading';

const MovesPage: React.FC = () => {
  // Temporary data - will be replaced with API data later
  const sampleMovies = [
    {
      id: 1,
      title: 'Inception',
      year: 2010,
      rating: 8.8,
      imageUrl: '/api/placeholder/300/450'
    },
    {
      id: 2,
      title: 'The Shawshank Redemption',
      year: 1994,
      rating: 9.3,
      imageUrl: '/api/placeholder/300/450'
    },
    {
      id: 3,
      title: 'The Dark Knight',
      year: 2008,
      rating: 9.0,
      imageUrl: '/api/placeholder/300/450'
    },
    {
      id: 4,
      title: 'Pulp Fiction',
      year: 1994,
      rating: 8.9,
      imageUrl: '/api/placeholder/300/450'
    },
    {
      id: 5,
      title: 'Forrest Gump',
      year: 1994,
      rating: 8.8,
      imageUrl: '/api/placeholder/300/450'
    },
    {
      id: 6,
      title: 'The Matrix',
      year: 1999,
      rating: 8.7,
      imageUrl: '/api/placeholder/300/450'
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Discover Movies</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse through our collection of amazing movies. Find your next favorite film!
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search movies..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Genres</option>
              <option value="action">Action</option>
              <option value="drama">Drama</option>
              <option value="comedy">Comedy</option>
              <option value="sci-fi">Sci-Fi</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Years</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Movies Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Popular Movies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {sampleMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                year={movie.year}
                rating={movie.rating}
                imageUrl={movie.imageUrl}
                onClick={() => console.log(`Clicked on ${movie.title}`)}
              />
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
            Previous
          </button>
          <span className="px-4 py-2 text-gray-700">Page 1 of 10</span>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default MovesPage;