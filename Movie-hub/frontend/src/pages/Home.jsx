import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchMovies, createMovies } from "../apps/slices/movieSlice";

function Home() {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);
  const [movie, setMovie] = useState({
    title: "",
    year: 0,
    genre: "",
    rating: 0,
  });

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
        {movies.map((m) => (
          <div key={m._id}>
            <p>
              Title: <strong>{m.title}</strong>
            </p>
            <p>
              Year: <strong>{m.year}</strong>
            </p>
            <p>
              Genre: <strong>{m.genre}</strong>
            </p>
            <p>
              Rating: <strong>{m.rating}✨</strong>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
