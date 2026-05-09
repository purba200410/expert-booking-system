import { useState } from "react";

import { useParams, useLocation, useNavigate } from "react-router-dom";

import API from "../services/api";

function Booking() {
  const { id } = useParams();

  const location = useLocation();

  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);

  const date = queryParams.get("date");

  const timeSlot = queryParams.get("time");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone
    ) {
      setError("Please fill all required fields");

      return;
    }

    try {
      setLoading(true);

      const { data } = await API.post("/bookings", {
        expertId: id,
        date,
        timeSlot,
        ...formData,
      });

      setMessage(data.message);

      setLoading(false);

      setTimeout(() => {
        navigate("/my-bookings");
      }, 1500);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Booking failed"
      );

      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-[#151530] border border-purple-700 rounded-2xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold text-purple-400 mb-8">
          Book Session
        </h1>

        <div className="mb-6">
          <p className="text-gray-300">
            Date: <span className="text-white">{date}</span>
          </p>

          <p className="text-gray-300">
            Time Slot:{" "}
            <span className="text-white">{timeSlot}</span>
          </p>
        </div>

        {message && (
          <div className="bg-green-600 p-3 rounded-lg mb-4">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-600 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-[#0B0B1F] border border-purple-700 rounded-lg px-4 py-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-[#0B0B1F] border border-purple-700 rounded-lg px-4 py-3"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-[#0B0B1F] border border-purple-700 rounded-lg px-4 py-3"
          />

          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            className="w-full bg-[#0B0B1F] border border-purple-700 rounded-lg px-4 py-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg text-lg font-semibold"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Booking;