import { useEffect, useState } from "react";

import API from "../services/api";

import ExpertCard from "../components/ExpertCard";
import Loader from "../components/Loader";

function Experts() {
  const [experts, setExperts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const fetchExperts = async () => {
    try {
      setLoading(true);

      const { data } = await API.get(
        `/experts?search=${search}&category=${category}&page=${page}&limit=6`
      );

      setExperts(data.experts);

      setTotalPages(data.totalPages);

      setLoading(false);
    } catch (error) {
      setError("Failed to fetch experts");

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperts();
  }, [search, category, page]);

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="text-red-500 text-center">
        {error}
      </div>
    );

  return (
    <div>
      <h1 className="text-4xl font-bold text-purple-400 mb-8">
        Available Experts
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search experts..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="bg-[#151530] border border-purple-700 rounded-lg px-4 py-2 w-full"
        />

        <select
          value={category}
          onChange={(e) => {
            setPage(1);
            setCategory(e.target.value);
          }}
          className="bg-[#151530] border border-purple-700 rounded-lg px-4 py-2"
        >
          <option value="">All Categories</option>

          <option value="Technology">Technology</option>

          <option value="Career">Career</option>

          <option value="Finance">Finance</option>

          <option value="Astronomy">Astronomy</option>

          <option value="Data Analytics">Data Analytics</option>

          <option value="AI/ML Engineer">AI/ML Engineer</option>

          <option value="Graphic Designer">Graphic Designer</option>
          
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {experts.map((expert) => (
          <ExpertCard key={expert._id} expert={expert} />
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-10">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="bg-purple-600 px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-lg">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="bg-purple-600 px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Experts;
