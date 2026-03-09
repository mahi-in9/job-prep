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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={movie.title}
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="year"
          value={movie.year}
          placeholder="Year"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="genre"
          value={movie.genre}
          placeholder="Genre"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="rating"
          min={1}
          max={10}
          value={movie.rating}
          placeholder="Rating"
          onChange={handleChange}
          required
        />
        <button type="submit">Add</button>
      </form>

      <div className="content">
        {movies.map((movie) => (
          <div key={movie._id} className="card">
            <div className="card-view">
              {editingId === movie._id ? (
                <>
                  <input
                    name="title"
                    value={editMovie.title}
                    onChange={handleChange}
                  />

                  <input
                    name="year"
                    type="number"
                    value={editMovie.year}
                    onChange={handleChange}
                  />

                  <input
                    name="genre"
                    value={editMovie.genre}
                    onChange={handleChange}
                  />

                  <input
                    name="rating"
                    type="number"
                    min="1"
                    max="10"
                    value={editMovie.rating}
                    onChange={handleChange}
                  />

                  <button onClick={handleSave}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
