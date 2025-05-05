"use client";
import { useProducts, useQuotes } from "@/services/product.service";

export default function ProductList() {
  const { data, isLoading, error } = useProducts();
  const { data: quotesData, isLoading: quotesLoading } = useQuotes();

  if (isLoading || quotesLoading)
    return <div className="p-4">Loading products...</div>;

  if (error) return <div className="p-4">Error loading products</div>;

  const productList = data?.products;
  const quotes = quotesData?.quotes;

  const allCookies = document.cookie;
  console.log("allCookies: ", allCookies);

  return (
    <div>
      <div style={{ margin: "16px 0" }}>
        <ol>
          {quotes &&
            quotes
              ?.slice(0, 1)
              ?.map((item: { id: number; quotes: string; author: string }) => (
                <li
                  key={item.id + item.author}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "18px",
                  }}
                >
                  <blockquote>
                    "{quotes[0].quote}" — {quotes[0].author}
                  </blockquote>
                </li>
              ))}
        </ol>
      </div>
      <div
        className="p-4"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        {productList?.map((product: any) => (
          <div
            key={product.id}
            className="w-64 bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
            style={{
              width: "240px",
              border: "2px solid wheat",
              backgroundColor: "lightpink",
              padding: "2px",
              borderRadius: "10px",
            }}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-32 h-32 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-bold text-blue-600">{product.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {product.description}
            </p>
            <button className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">
              See More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
