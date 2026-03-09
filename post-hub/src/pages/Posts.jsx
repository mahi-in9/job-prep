import { useState, useEffect, useMemo } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const itemsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();
        setPosts(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  const proccessedPosts = useMemo(() => {
    let data = [...posts];

    if (search) {
      data = data.filter((p) =>
        p.title.toLoweCase().includes(search.toLowerCase()),
      );
    }

    if (sortBy == "low") {
      data.sort((a, b) => a.title.localeCompare(b.title));
    }
    return data;
  }, [posts, search, sortBy]);

  //   Pagingation
  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;

  const paginatedData = proccessedPosts.slice(startIndex, endIndex);

  const totalIndex = proccessedPosts.length;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, sortBy]);

  return (
    <>
      <h2>Posts 📩</h2>

      {paginatedData.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
        </div>
      ))}

      {/* Pagination */}
      <button
        disabled={currentPage == 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        prev
      </button>
      <button
        disabled={currentPage === Math.ceil(totalIndex / itemsPerPage)}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        next
      </button>
    </>
  );
}

export default Posts;
