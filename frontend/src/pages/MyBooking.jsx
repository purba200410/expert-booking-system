import { useState } from "react";

import API from "../services/api";

import Loader from "../components/Loader";

function MyBookings() {
  const [email, setEmail] = useState("");

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const fetchBookings = async () => {
    if (!email) {
      setError("Please enter email");

      return;
    }

    try {
      setLoading(true);

      setError("");

      const { data } = await API.get(
        `/bookings?email=${email}`
      );

      setBookings(data);

      setLoading(false);
    } catch (error) {
      setError("Failed to fetch bookings");

      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-purple-400 mb-8">
        My Bookings
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-[#151530] border border-purple-700 rounded-lg px-4 py-3"
        />

        <button
          onClick={fetchBookings}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg"
        >
          Search
        </button>
      </div>

      {loading && <Loader />}

      {error && (
        <div className="bg-red-600 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="grid gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-[#151530] border border-purple-700 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-bold text-purple-400 mb-3">
              {booking.expertId?.name}
            </h2>

            <p className="text-gray-300 mb-2">
              Category: {booking.expertId?.category}
            </p>

            <p className="text-gray-300 mb-2">
              Date: {booking.date}
            </p>

            <p className="text-gray-300 mb-2">
              Time: {booking.timeSlot}
            </p>

            <p className="text-gray-300 mb-2">
              Status:
              <span className="text-green-400 ml-2">
                {booking.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookings;