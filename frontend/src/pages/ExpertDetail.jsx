import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

import API from "../services/api";

import Loader from "../components/Loader";

import socket from "../socket/socket";

function ExpertDetail() {
  const { id } = useParams();

  const [expert, setExpert] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchExpert = async () => {
    try {
      const { data } = await API.get(`/experts/${id}`);

      setExpert(data);

      setLoading(false);
    } catch (error) {
      setError("Failed to fetch expert");

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpert();
  }, [id]);

  useEffect(() => {
    socket.on("slotBooked", ({ expertId, date, timeSlot }) => {
      if (expertId !== id) return;

      setExpert((prev) => {
        if (!prev) return prev;

        const updatedSlots = prev.availableSlots.map((slotGroup) => {
          if (slotGroup.date !== date) return slotGroup;

          return {
            ...slotGroup,
            slots: slotGroup.slots.filter(
              (slot) => slot !== timeSlot
            ),
          };
        });

        return {
          ...prev,
          availableSlots: updatedSlots,
        };
      });
    });

    return () => {
      socket.off("slotBooked");
    };
  }, [id]);

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="text-red-500 text-center">
        {error}
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-[#151530] border border-purple-700 rounded-2xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold text-purple-400 mb-4">
          {expert.name}
        </h1>

        <p className="text-gray-300 mb-2">
          Category: {expert.category}
        </p>

        <p className="text-gray-300 mb-2">
          Experience: {expert.experience} Years
        </p>

        <p className="text-gray-300 mb-2">
          Rating: ⭐ {expert.rating}
        </p>

        <p className="text-gray-300 mb-8">
          {expert.bio}
        </p>

        <h2 className="text-2xl font-bold text-purple-400 mb-6">
          Available Slots
        </h2>

        <div className="space-y-6">
          {expert.availableSlots.map((slotGroup, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold mb-3">
                {slotGroup.date}
              </h3>

              <div className="flex flex-wrap gap-3">
                {slotGroup.slots.length > 0 ? (
                  slotGroup.slots.map((slot, idx) => (
                    <Link
                      key={idx}
                      to={`/booking/${expert._id}?date=${slotGroup.date}&time=${slot}`}
                      className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
                    >
                      {slot}
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No slots available
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExpertDetail;