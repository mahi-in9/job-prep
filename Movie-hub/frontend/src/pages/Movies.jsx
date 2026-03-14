import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import {
  fetchMovies,
  createMovies,
  updateMovies,
  deleteMovie,
} from "../apps/slices/movieSlice";

function Movies() {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);

  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("all");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [movie, setMovie] = useState({
    title: "",
    year: 0,
    genre: "",
    rating: 0,
  });

  const [editingId, setEditingId] = useState(null);
  const [editMovie, setEditMovie] = useState({});

  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMovie((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createMovies(movie));

    setMovie({
      title: "",
      year: 0,
      genre: "",
      rating: 0,
    });
  };

  const handleEditClick = (movie) => {
    setEditingId(movie._id);
    setEditMovie(movie);
  };

  const handleSave = () => {
    dispatch(
      updateMovies({
        id: editingId,
        data: editMovie,
      }),
    );

    setEditingId(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditMovie((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (id) => {
    const confirmData = window.confirm(
      "Are you sure you wan to delete this movie from your database",
    );

    if (confirmData) {
      dispatch(deleteMovie(id));
    }
  };

  const processedMovie = useMemo(() => {
    let data = [...movies];

    if (search) {
      data = data.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (genreFilter !== "all") {
      data = data.filter((m) => m.genre === genreFilter);
    }

    if (sortBy === "title") {
      data.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortBy === "year") {
      data.sort((a, b) => a.year - b.year);
    }
    if (sortBy === "rating") {
      data.sort((a, b) => a.rating - b.rating);
    }

    return data;
  }, [search, movies, sortBy, genreFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, genreFilter, sortBy]);

  const firstIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = firstIndex + itemsPerPage;

  const paginatedData = processedMovie.slice(firstIndex, endIndex);

  const totalPage = Math.ceil(movies.length / itemsPerPage);

  const genres = useMemo(() => {
    return [...new Set(movies.map((m) => m.genre))];
  }, [movies]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <>
      <h1>Movie 🎥</h1>

      <header>
        <div className="controlls">
          <input
            type="text"
            placeholder="movies"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              fontWeight: "4px",
              padding: "4px",
            }}
          />

          <select
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
          >
            <option value="all">All Genres</option>

            {genres.map((genre) => (
              <option value={genre} key={genre}>
                {genre}
              </option>
            ))}
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort</option>
            <option value="title">Title</option>
            <option value="year">Year</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="add-movie">
        <div className="input-line">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={movie.title}
            placeholder="Title"
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-line">
          <label htmlFor="year">Year</label>
          <input
            type="number"
            name="year"
            value={movie.year || ""}
            placeholder="Year"
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-line">
          <label htmlFor="title">Genre</label>
          <input
            type="text"
            name="genre"
            value={movie.genre}
            placeholder="Genre"
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-line">
          <label htmlFor="title">Rating</label>
          <input
            type="number"
            name="rating"
            min={1}
            max={10}
            value={movie.rating || ""}
            placeholder="Enter rating✨"
            step={"any"}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add</button>
      </form>

      <div className="content">
        {paginatedData.map((movie) => (
          <div key={movie._id} className="card">
            <>
              {editingId === movie._id ? (
                <div className="card-view">
                  <div className="input-line">
                    <label htmlFor="title">Title</label>
                    <input
                      name="title"
                      value={editMovie.title}
                      onChange={handleEditChange}
                    />
                  </div>

                  <div className="input-line">
                    <label htmlFor="title">Year</label>
                    <input
                      name="year"
                      type="number"
                      value={editMovie.year}
                      onChange={handleEditChange}
                    />
                  </div>

                  <div className="input-line">
                    <label htmlFor="title">Genre</label>
                    <input
                      name="genre"
                      value={editMovie.genre}
                      onChange={handleEditChange}
                    />
                  </div>

                  <div className="input-line">
                    <label htmlFor="title">Rating</label>
                    <input
                      name="rating"
                      type="number"
                      min="1"
                      max="10"
                      value={editMovie.rating}
                      onChange={handleEditChange}
                    />
                  </div>

                  <button className="save-btn" onClick={handleSave}>
                    Save
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="card-view">
                  <h3>{movie.title}</h3>
                  <p>Year: {movie.year}</p>
                  <p>Genre: {movie.genre}</p>
                  <p>Rating: {movie.rating}</p>

                  <button
                    style={{ backgroundColor: "green" }}
                    onClick={() => handleEditClick(movie)}
                  >
                    Edit📝
                  </button>
                  <button
                    style={{ backgroundColor: "red" }}
                    onClick={() => handleDelete(movie._id)}
                  >
                    Delete 🗑️
                  </button>
                </div>
              )}
            </>
          </div>
        ))}
      </div>

      <footer
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        <button
          disabled={currentPage === 1}
          style={{ padding: "0.5rem" }}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>
        <button
          disabled={currentPage === totalPage}
          onClick={() => setCurrentPage(currentPage + 1)}
          style={{ padding: "0.5rem" }}
        >
          Next
        </button>
      </footer>
    </>
  );
}

export default Movies;
