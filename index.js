const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./database");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//Get all bookings
app.get("/getBookings", async (req, res) => {
    try {
        const allBookings = await pool.query("SELECT * FROM bookings");
        res.json(allBookings.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//Get bookings by id
app.get("/getBookings/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await pool.query("SELECT * FROM bookings WHERE bookingid = $1", [
            id,
        ]);
        res.json(booking.rows[0]);
        } catch (err) {
        console.error(err.message);
        }
});

//Create new booking
app.post("/addBooking", async (req, res) => {
    try {
        const { bodyPart } = req.body;
        const newBooking = await pool.query(
            "INSERT INTO bookings(bodypart) VALUES ($1) RETURNING *", 
            [bodyPart]
        );

        res.json(newBooking);
    } catch (error) {
        console.error(error.message)
    }
});

//Update booking
app.put("/updateBooking/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { bodyPart } = req.body;
        const updateBooking = await pool.query(
            "UPDATE bookings SET bodypart = $1 WHERE bookingid = $2",
            [bodyPart, id]
        );
        res.json("Todo was updated!");
    } catch (error) {
        console.error(error.message)
    }
});

//Delete booking
app.delete("/deleteBooking/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteBooking = await pool.query("DELETE FROM bookings WHERE bookingid = $1", [id]);
        res.json("Bookings was deleted!");    
    } catch (error) {
        console.error(error.message);
    }
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})