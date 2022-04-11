const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./database");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/getBookings", async (req, res) => {
    try {
        const allBookings = await pool.query("SELECT * FROM bookings");
        res.json(allBookings.rows);
    } catch (error) {
        console.error(error.message);
    }
});

app.get("/getBookings/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await pool.query("SELECT * FROM bookings WHERE 'bookingId' = $1", [
            id,
        ]);
        res.json(booking.rows[0]);
        } catch (err) {
        console.error(err.message);
        }
});

app.post("/addBooking", async (req, res) => {
    const { bodyPart } = req.body;
    try {
        const newBooking = await pool.query(
            "INSERT INTO bookings('bodyPart') VALUES ($1) RETURNING *", 
            [bodyPart]
        );

        res.json(newBooking);
    } catch (error) {
        console.error(error.message)
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})