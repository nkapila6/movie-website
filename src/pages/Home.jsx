import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css"


function Home() {
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // console.log({ searchQuery, movies, error, loading }); // Add this line

    useEffect(()=>{
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError("Failed to load movies. Error.")
            } finally {
                setLoading(false)
            }
        }
        loadPopularMovies()
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true)
        try {
            // console.log('Searching for: %s', searchQuery)
            const searchResults = await searchMovies(searchQuery)
            // console.log('Results: %s', searchResults)
            setMovies(searchResults)
            // console.log('Movies: %s', movies)
            setError(null)
        } catch(err) {
            console.log(err)
            setError("Failed to search movies.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                type="text" 
                placeholder="Search for movies.." 
                className="search-input" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
            <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}
            
            {loading ? (
                <div className="loading">Loading.</div>
            ) : (
                <div className="movies-grid">
                    {movies.map(movie => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home