const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./database");
let port = process.env.PORT || 3000;

app.use(express.json(), cors());

app.get("/getBookings", async (req, res) => {
    try {
        const allBookings = await pool.query("SELECT * FROM bookings");
        res.json(allBookings.rows);
    } catch (error) {
        console.error(error.message);
    }
})


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})