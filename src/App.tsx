import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { SearchBar } from './components/SearchBar/SearchBar';
import { MovieGrid } from './components/movieGrid/movieGrid';
import { Loader } from './components/Loader/Loader';
import { ErrorMessage } from './components/Error/ErrorMessage';
import { fetchMovies } from './services/movieService';
import type { Movie } from './types/movie';
import { MovieModal } from './components/MovieModal/MovieModal';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setMovies([]);
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await fetchMovies(query);

      if (!response.length) {
        toast.error('No movies found for your request.');
      }

      setMovies(response);
      setIsLoading(false);
    } catch {
      setIsError(true);
      setIsLoading(false);
      toast.error('There was an error, please try again...');
    }
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader isLoading={isLoading} />}
      {isError && <ErrorMessage isError={isError} />}
      {!isLoading && !isError && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default App;
