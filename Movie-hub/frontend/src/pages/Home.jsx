import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link to="/movie">Movies</Link>.
      <div></div>
      <Link to="/signup">SignUp</Link>
    </>
  );
}

export default Home;
