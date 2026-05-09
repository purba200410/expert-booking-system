import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Experts from "./pages/Experts";
import ExpertDetail from "./pages/ExpertDetail";
import Booking from "./pages/Booking";
import MyBooking from "./pages/MyBooking";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0B0B1F] text-white">
        <Navbar />

        <div className="p-6">
          <Routes>
            <Route path="/" element={<Experts />} />

            <Route path="/experts/:id" element={<ExpertDetail />} />

            <Route path="/booking/:id" element={<Booking />} />

            <Route path="/my-bookings" element={<MyBooking />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;