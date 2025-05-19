import express from "express";
import cors from "cors";
import { promises as fs } from "fs"; 

const PORT = 3333
const url_database = ".database/biblioteca.json"

const app = express()
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use(express.json())

//lista todos

app.get("/biblioteca/livros", (req, res) => {});

app.get("/biblioteca/usuarios", (req, res) => {});

app.get("/biblioteca/emprestimos", (req, res) => {});

app.get("/biblioteca/reservas", (req, res) => {});

app.get("/biblioteca/multas", (req, res) => {});

//cria todos

app.post("/biblioteca/usuarios/cadastro", (req, res) => {});

app.post("/biblioteca/livros/cadastro", (req, res) => {});

app.post("/biblioteca/emprestimos", (req, res) => {});

app.post("/biblioteca/reservas", (req, res) => {});

app.post("/biblioteca/multas/registrar/:emprestimoId", (req, res) => {});

//lista um em especifico

app.get("/biblioteca/usuarios/:id", (req, res) => {});

app.get("/biblioteca/livros/:id", (req, res) => {});

app.get("/biblioteca/emprestimos/:id", (req, res) => {});

app.get("/biblioteca/reservas/:id", (req, res) => {});

app.get("/biblioteca/multas/:emprestimoId", (req, res) => {});

//atualiza as informações de determinado item

app.put("/biblioteca/usuarios/:id", (req, res) => {});

app.put("/biblioteca/livros/:id", (req, res) => {});

app.put("/biblioteca/emprestimos/:id/devolucao", (req, res) => {});

app.put("/biblioteca/multas/:id/pagar", (req, res) => {});

app.put("/biblioteca/reservas/:id", (req, res) => {});

//deletar um item


app.listen(PORT, () => {
    console.log("Servidor iniciado na porta: " + PORT)
})