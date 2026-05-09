import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-[#151530cc] border-b border-purple-800 px-8 py-4 flex justify-between items-center shadow-lg">
      <Link
        to="/"
        className="text-3xl font-bold text-purple-400 tracking-wide"
      >
        Astro Experts
      </Link>

      <div className="flex gap-6 text-lg">
        <Link
          to="/"
          className="hover:text-purple-400 transition"
        >
          Experts
        </Link>

        <Link
          to="/my-bookings"
          className="hover:text-purple-400 transition"
        >
          My Bookings
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;