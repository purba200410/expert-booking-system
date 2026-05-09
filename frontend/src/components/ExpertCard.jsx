import { Link } from "react-router-dom";

function ExpertCard({ expert }) {
  return (
    <div className="bg-[#151530cc] backdrop-blur-lg border border-purple-800 rounded-3xl p-6 shadow-xl hover:scale-[1.02] hover:border-purple-400 transition duration-300">
      <h2 className="text-2xl font-bold text-purple-400 mb-3">
        {expert.name}
      </h2>

      <div className="space-y-2 text-gray-300">
        <p>
          <span className="text-purple-300">
            Category:
          </span>{" "}
          {expert.category}
        </p>

        <p>
          <span className="text-purple-300">
            Experience:
          </span>{" "}
          {expert.experience} Years
        </p>

        <p>
          <span className="text-purple-300">
            Rating:
          </span>{" "}
          ⭐ {expert.rating}
        </p>
      </div>

      <Link
        to={`/experts/${expert._id}`}
        className="mt-6 inline-block bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-xl font-semibold transition"
      >
        View Details
      </Link>
    </div>
  );
}

export default ExpertCard;