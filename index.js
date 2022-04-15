const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./database");
const port = process.env.PORT || 3000;

app.use(express.json(), cors());

//Get all bookings
app.get("/bookings", async (req, res) => {
  try {
    const allBookings = await pool.query("SELECT * FROM bookings");
    res.json(allBookings.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//Get booking by id
app.get("/bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await pool.query(
      "SELECT * FROM bookings WHERE bookingid = $1",
      [id]
    );
    res.json(booking.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Create new booking
app.post("/bookings", async (req, res) => {
  try {
    const { bodyPart, startTime, endTime } = req.body;
    const newBooking = await pool.query(
      "INSERT INTO bookings(bodypart, starttime, endtime) VALUES ($1, $2, $3)",
      [bodyPart, startTime, endTime]
    );

    res.json(newBooking);
  } catch (error) {
    console.error(error.message);
  }
});

//Update booking
app.put("/bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { bodyPart, startTime, endTime } = req.body;
    const updateBooking = await pool.query(
      "UPDATE bookings SET bodypart = $1, starttime = $2, endtime = $3 WHERE bookingid = $4",
      [bodyPart, startTime, endTime, id]
    );
    res.json("Booking was updated!");
  } catch (error) {
    console.error(error.message);
  }
});

//Delete booking
app.delete("/bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBooking = await pool.query(
      "DELETE FROM bookings WHERE bookingid = $1",
      [id]
    );
    res.json("Booking was deleted!");
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
