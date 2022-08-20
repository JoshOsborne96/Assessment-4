const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getCompliment, getFortune, postQuote, deleteQuote, getQuotes, editQuote } = require('./controller')

// Endpoints
app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune)


app.get("/api/", getQuotes)
app.post("/api/", postQuote)
app.put("/api/:id", editQuote)
app.delete("/api/:id", deleteQuote)

app.listen(4000, () => console.log("Server running on 4000"));
