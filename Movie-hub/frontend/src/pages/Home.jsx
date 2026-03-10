import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchMovies,
  createMovies,
  updateMovies,
  deleteMovie,
} from "../apps/slices/movieSlice";

function Home() {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);
  const [movie, setMovie] = useState({
    title: "",
    year: 0,
    genre: "",
    rating: 0,
  });

  const [editingId, setEditingId] = useState(null);
  const [editMovie, setEditMovie] = useState({});

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);
  console.log(movies);

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

  return (
    <>
      <h1>Movie 🎥</h1>
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
        {movies.map((movie) => (
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
                    onClick={() => handleDelete(m._id)}
                  >
                    Delete 🗑️
                  </button>
                </div>
              )}
            </>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
