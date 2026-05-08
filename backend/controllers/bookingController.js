const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
  try {
    const {
      expertId,
      name,
      email,
      phone,
      date,
      timeSlot,
      notes,
    } = req.body;

    if (
      !expertId ||
      !name ||
      !email ||
      !phone ||
      !date ||
      !timeSlot
    ) {
      return res.status(400).json({
        message: "All required fields must be filled",
      });
    }

    const booking = await Booking.create({
      expertId,
      name,
      email,
      phone,
      date,
      timeSlot,
      notes,
    });

    const io = req.app.get("io");

io.emit("slotBooked", {
  expertId,
  date,
  timeSlot,
});

    res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "This slot is already booked",
      });
    }

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getBookingsByEmail = async (req, res) => {
  try {
    const email = req.query.email;

    const bookings = await Booking.find({ email }).populate(
      "expertId",
      "name category"
    );

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.status = req.body.status || booking.status;

    await booking.save();

    res.json({
      message: "Booking status updated",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createBooking,
  getBookingsByEmail,
  updateBookingStatus,
};