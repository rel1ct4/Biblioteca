import express from "express";
import cors from "cors";
import fs from "noed:fs";

const PORT = 3333
const url_database = ".database/biblioteca.json"

const app = express()
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use(express.json())

app.post