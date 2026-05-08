require("dotenv").config();

const mongoose = require("mongoose");
const Expert = require("./models/Expert");

mongoose.connect(process.env.MONGO_URI);

const experts = [
  {
    name: "John Doe",
    category: "Technology",
    experience: 5,
    rating: 4.8,
    bio: "Full Stack Developer and System Architect",
    availableSlots: [
      {
        date: "2026-05-09",
        slots: ["10:00 AM", "11:00 AM", "2:00 PM"],
      },
      {
        date: "2026-05-10",
        slots: ["1:00 PM", "3:00 PM"],
      },
    ],
  },

  {
    name: "Sarah Smith",
    category: "Career",
    experience: 8,
    rating: 4.9,
    bio: "Career Mentor and HR Specialist",
    availableSlots: [
      {
        date: "2026-05-09",
        slots: ["9:00 AM", "12:00 PM"],
      },
    ],
  },

  {
    name: "Michael Lee",
    category: "Finance",
    experience: 6,
    rating: 4.7,
    bio: "Investment and Financial Planning Expert",
    availableSlots: [
      {
        date: "2026-05-11",
        slots: ["11:00 AM", "4:00 PM"],
      },
    ],
  },
];

const seedData = async () => {
  try {
    await Expert.deleteMany();

    await Expert.insertMany(experts);

    console.log("Experts Seeded");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedData();