import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((d) => setProducts(d));
  }, []);

  return (
    <main className="m-2 ">
      <h2>Products List</h2>

      <section>
        {products &&
          products.map((p) => (
            <div key={pi}>
              <p>p.title</p>
            </div>
          ))}
      </section>
    </main>
  );
}

export default Products;
