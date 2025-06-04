import express from "express";
import cors from "cors";
import { promises as fs } from "fs"; 

const PORT = 3333
const url_database = "./database/biblioteca.json"

const app = express()
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use(express.json())

//concluido 14/31

//lista todos

app.get("/biblioteca/livros", async(req, res) => {
    //lista de livros da biblioteca
    try {
        const data = await fs.readFile(url_database,'utf-8')
        const database = await JSON.parse(data)

        if(database.livros.length === 0){
            res.status(200).json({mensagem: "Nenhum livro cadastrado!"})
            return
        }

        res.status(200).json({mensagem: "Lista de livros cadastrados:", data: database.livros})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem: "Internal server error!"})

    }
});

app.get("/biblioteca/usuarios", async(req, res) => {
    //lista de usuarios cadastrados
    try {
        const data = await fs.readFile(url_database, 'utf-8')
        const database = await JSON.parse(data)

        if(database.users.length === 0){
            res.status(200).json({mensagem: "Nenhum usuário cadastrado!"})
            return
        }

        res.status(200).json({mensagem: "Lista de usuários cadastrados:", data: database.users})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem: "Internal server error"})
    }
});

app.get("/biblioteca/emprestimos", async(req, res) => {
    //lista de emprestimos 
    try {
        const data = await fs.readFile(url_database, 'utf-8')
        const database = await JSON.parse(data)

        const livrosEmprestimo = database.livros.status.filter((status) => status === "ativo")
        if(livrosEmprestimo.length === 0){
            res.status(200).json({mensagem: "Nenhum livro disponivel para emprestimo no momento, tente reservar algum!"})
        }

        res.status(200).json({mensagem: "Lista de livros emprestados:"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem: "Internal server error!"})
    }
});

app.get("/biblioteca/reservas", async(req, res) => {});

app.get("/biblioteca/multas", async(req, res) => {});

//cria todos

app.post("/biblioteca/usuarios/cadastro", async(req, res) => {
  //cadastro de usuarios
    const { nome, email, CPF, endereco, senha} = req.body

    if(!nome){
      res.status(401).json({mensagem: "Nome é obrigatório!"})
      return
    };
    if(!email){
      res.status(401).json({mensagem: "Email é obrigatório!"})
      return
    };
    if(!CPF){
      res.status(401).json({mensagem: "CPF é obrigatório!"})
      return
    };
    if(!endereco){
      res.status(401).json({mensagem: "Endereço é obrigatório!"})
      return
    };
    if(!senha){
      res.status(401).json({mensagem: "Senha é obrigatório!"})
      return
    };

    const NewUser ={
      id_usuario: Date.now().toString(),
      nome,
      email,
      CPF,
      endereco,
      senha
    }

  try {
  
    const data = await fs.readFile(url_database, 'utf-8')
    const database = await JSON.parse(data)

    const FindUserEmail = database.users.find((user) => user.email === email)
    if(FindUserEmail){
      res.status(401).json({mensagem: "Email já está em uso"})
      return
    };

    const FindUserCPF = database.users.find((user) => user.CPF === CPF)
    if(FindUserCPF){
      res.status(401).json({mensagem: "CPF já em uso!"})
      return
    };

    database.users.push(NewUser)

    await fs.readFile(url_database, JSON.stringify(database, null, 2))
    res.status(201).json({mensagem: "Usuário cadastrado", NewUser})

  } catch (error) {
    console.log(error)
    res.status(500).json({mensagem: "Internal server error"})
  }
});

app.post("/biblioteca/livros/cadastro", async(req, res) => {
  //cadastro de usuarios
    const { marca, editora, referencia, titulo, autor, formato, edicao, categoria, idioma, numero_paginas, ISBN, classificacao_indicativa, quantidade_livros_biblioteca} = req.body

    if(!marca){
      res.status(401).json({mensagem: "Marca do livro é obrigatório!"})
      return
    };
    if(!editora){
      res.status(401).json({mensagem: "Editora do livro é obrigatório!"})
      return
    };
    if(!referencia){
      res.status(401).json({mensagem: "referencia do livro é obrigatório!"})
      return
    };
    if(!titulo){
      res.status(401).json({mensagem: "Titulo do livro é obrigatório!"})
      return
    };
    if(!formato){
      res.status(401).json({mensagem: "Formato do livro é obrigatório!"})
      return
    };
     if(!autor){
      res.status(401).json({mensagem: "Autor do livro é obrigatório!"})
      return
    };
     if(!edicao){
      res.status(401).json({mensagem: "Edicao do livro é obrigatório!"})
      return
    };
     if(!categoria){
      res.status(401).json({mensagem: "Categoria do livro é obrigatório!"})
      return
    };
     if(!idioma){
      res.status(401).json({mensagem: "Idioma do livro é obrigatório!"})
      return
    };
     if(!numero_paginas){
      res.status(401).json({mensagem: "Número de páginas do livro é obrigatório!"})
      return
    };
     if(!ISBN){
      res.status(401).json({mensagem: "ISBN do livro é obrigatório!"})
      return
    };
     if(!classificacao_indicativa){
      res.status(401).json({mensagem: "Classificação indicativa do livro é obrigatório!"})
      return
    };
     if(!quantidade_livros_biblioteca){
      res.status(401).json({mensagem: "Quantidade de livors na biblioteca é obrigatório!"})
      return
    };

    const NewBook ={
      id_livro: Date.now().toString(),
      marca,
      editora,
      referencia,
      titulo,
      autor,
      formato,
      edicao,
      categoria,
      idioma,
      numero_paginas,
      ISBN,
      classificacao_indicativa,
      quantidade_livros_biblioteca
    }

  try {
  
    const data = await fs.readFile(url_database, 'utf-8')
    const database = await JSON.parse(data)

    const FindBookReferencia = database.livros.find((livro) => livro.referencia === referencia)
    if(FindBookReferencia){
      res.status(401).json({mensagem: "Referência já está em uso"})
      return
    };

    const FindBookISBN = database.livros.find((livro) => livro.ISBN === ISBN)
    if(FindBookISBN){
      res.status(401).json({mensagem: "ISBN do livro já em uso!"})
      return
    };

    database.users.push(NewUser)

    await fs.readFile(url_database, JSON.stringify(database, null, 2))
    res.status(201).json({mensagem: "Usuário cadastrado", NewUser})

  } catch (error) {
    console.log(error)
    res.status(500).json({mensagem: "Internal server error"})
  }
});

app.post("/biblioteca/emprestimos", async(req, res) => {});

app.post("/biblioteca/reservas", async(req, res) => {});

app.post("/biblioteca/multas/registrar/:emprestimoId", async(req, res) => {});

//lista um em especifico

app.get("/biblioteca/usuarios/:id", async (req, res) => {
  const {id} = req.params

  try {
    const data = await fs.readFile(url_database, 'utf-8')
    const database = await JSON.parse(data)

    const encontrarUsuario = database.users.find((user) => user.id === id)
    if(!encontrarUsuario){
      res.status(404).json({mensagem: "Usuário não encontrado"})
      return
    }

    res.status(200).json({encontrarUsuario})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({mensagem: "Internal server error"})
  }
});

app.get("/biblioteca/livros/:id", async (req, res) => {
  const {id} = req.params

  try {
    const data = await fs.readFile(url_database, 'utf-8')
    const database = await JSON.parse(data)

    const encontrarLivro = database.livros.find((livro) => livro.id === id)
    if(!encontrarLivro){
      res.status(404).json({mensagem: "Livro não encontrado"})
      return
    }

    res.status(200).json({encontrarLivro})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({mensagem: "Internal server error"})
  }
});

app.get("/biblioteca/emprestimos/:id", async (req, res) => {
  const {id} = req.params

  try {
  const data = await fs.readFile(url_database, 'utf-8')
  const database = await JSON.parse(data)

  const encontrarEmprestimo = database.find((emprestimo) => emprestimo.id === id)
  if(!encontrarEmprestimo){
    res.status(404).json({mensagem: "Empréstimo não encontrado"})
    return
  }

  res.status(200).json({encontrarEmprestimo})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({mensagem: "Internal server error!"})
  }
});

app.get("/biblioteca/reservas/:id", (req, res) => {});

app.get("/biblioteca/multas/:emprestimoId", (req, res) => {});

//atualiza as informações de determinado item

app.put("/biblioteca/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, email, endereco, senha } = req.body;

  try {
    if (!nome || typeof nome !== 'string' || nome.trim() === "") {
      return res.status(400).json({ mensagem: "O campo 'nome' é obrigatório e deve ser um texto" });
    }

    if (!email || typeof email !== 'string' || email.trim() === '') {
      return res.status(400).json({ mensagem: "O campo 'email' é obrigatório e deve ser um texto" });
    }

    if (!endereco || typeof endereco !== 'string' || endereco.trim() === '') {
      return res.status(400).json({ mensagem: "O campo 'endereço' é obrigatório e deve ser um texto" });
    }

    if (!senha || typeof senha !== 'string' || senha.trim() === '') {
      return res.status(400).json({ mensagem: "O campo 'senha' é obrigatório e deve ser um texto" });
    }

    const data = await fs.readFile(url_database, 'utf-8');
    const database = JSON.parse(data);

    const indexUsers = database.users.findIndex((user) => user.id === id);
    if (indexUsers === -1) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    database.users[indexUsers] = { ...database.users[indexUsers], nome, email, endereco, senha };

    await fs.writeFile(url_database, JSON.stringify(database, null, 2));

    return res.status(200).json({
      mensagem: "Usuário atualizado",
      database: database.users[indexUsers]
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
});

app.put("/biblioteca/livros/:id", async (req, res) => {
  const {id} = req.params;
  const {marca, editora, formato, edicao, idioma,numero_paginas, quantidade_livros_biblioteca} = req.body;

  try {
   if (!marca || typeof marca !== 'string' || marca.trim() === "") {
      return res.status(400).json({ mensagem: "O campo 'marca' é obrigatório e deve ser um texto" });
    }

    if (!editora || typeof editora !== 'string' || editora.trim() === '') {
      return res.status(400).json({ mensagem: "O campo 'editora' é obrigatório e deve ser um texto" });
    }

    if (!formato || typeof formato !== 'string' || formato.trim() === '') {
      return res.status(400).json({ mensagem: "O campo 'formato' é obrigatório e deve ser um texto" });
    }

    if (!edicao || typeof edicao !== 'string' || edicao.trim() === '') {
      return res.status(400).json({ mensagem: "O campo 'edição' é obrigatório e deve ser um texto" });
    }

    if (!idioma || typeof idioma !== 'string' || idioma.trim() === '') {
      return res.status(400).json({ mensagem: "O campo 'idioma' é obrigatório e deve ser um texto" });
    }

    if (!numero_paginas || typeof numero_paginas !== 'string' || numero_paginas.trim() === '') {
      return res.status(400).json({ mensagem: "O campo 'numero de paginas' é obrigatório e deve ser um texto" });
    }

    if (!quantidade_livros_biblioteca || typeof quantidade_livros_biblioteca !== 'string' || quantidade_livros_biblioteca.trim() === '') {
      return res.status(400).json({ mensagem: "O campo 'edição' é obrigatório e deve ser um quantidade de livros na biblioteca" });
    }

    const data = await fs.readFile(url_database, 'utf-8');
    const database = JSON.parse(data);

    const indexBook = database.livros.findIndex((book) => book.id === id );
    if(indexBook === -1){
      return res.status(404).json({mensagem: "Livro não encontrado"})
    }

    database.livros[indexBook] = {...database.livros[indexBook], marca, editora, formato, edicao, idioma,numero_paginas, quantidade_livros_biblioteca}
    
    await fs.writeFile(url_database, JSON.stringify(database, null, 2));

    return res.status(200).json({
      mensagem: "Livro atualizado",
      database: database.livros[indexBook]
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({mensagem: "Internal server error"})
  }
});

app.put("/biblioteca/emprestimos/:id/devolucao", (req, res) => {});

app.put("/biblioteca/multas/:id/pagar", (req, res) => {});

app.put("/biblioteca/reservas/:id", (req, res) => {});

//deletar um item

app.delete("/biblioteca/usuarios/:id", async (req, res) => {
const {id} = req.params

try {

  const data = await fs.readFile(url_database, 'utf-8')
  const database = await JSON.parse(data)

  const indexUsuario = database.users.findIndex((usuario) => usuario.id === id)
  if(indexUsuario === -1){
    res.status(404).json({mensagem: "Usuário não encontrado"})
    return
  }

  const removerUsusario = database.users.splice(indexUsuario, 1)[0]
  console.log(removerUsusario)

  fs.writeFile(url_database, JSON.stringify(database, null, 2), (err) => {
    if(err){
      console.log(err)
      res.status(500).json({mensagem: "Erro ao ler arquivo"})
      return
    }

    res.status(200).json({mensagem:"Participante removido",  usuario: removerUsusario})
  })
  
} catch (error) {
  console.log(error)
  res.status(500).json({mensagem: "Internal server error"})
}
});

app.delete("/biblioteca/livros/:id", async (req, res) => {
  const {id} = req.params

  try {
    const data = await fs.readFile(url_database, 'utf-8')
    const database = await JSON.parse(data)

    const indexLivro = database.livros.findIndex((livro) => livro.id === id)
    if(indexLivro === -1){
      res.status(404).json({mensagem: "Livro não encontrado"})
      return
    }

    const removerLivro = database.users.splice(indexLivro, 1)[0]
    console.log(removerLivro)

    fs.writeFile(url_database, JSON.stringify(database, null, 2), (err) => {
      if(err){
        console.log(err)
        res.status(500).json({mensagem: "Erro ao ler arquivo"})
        return
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({mensagem: "Internal server error"})
  }
  
  res.status(200).json({mensagem: "Livro removido", usuario: removerLivro})
});

app.delete("/biblioteca/emprestimos/:id/devolucao", async (req, res) => {
  const {id} = req.params

  try {

    const data = await fs.readFile(url_database, 'utf-8')
    const database = await JSON.parse(data)


    
  } catch (error) {
    console.log(error)
    res.status(500).json({mensagem: "internal server error"})
  }
});

app.delete("/biblioteca/multas/:id/pagar", (req, res) => {});

app.delete("/biblioteca/reservas/:id", (req, res) => {});

//outras funções de listagem especifica ou não

app.get("/biblioteca/emprestimos/:id", (req, res) => {});

app.get("/biblioteca/emprestimos/usuario/:id", (req, res) => {});

app.get("/biblioteca/emprestimos/pendentes", (req, res) => {});

app.get("/biblioteca/reservas/usuario/:id", (req, res) => {});

app.get("/biblioteca/reservas/disponiveis/:idLivro", (req, res) => {});

app.get("/biblioteca/livros/busca", async (req, res) => {
  // Acesse os parâmetros de query string via req.query
  const { titulo, autor, categoria, ISBN } = req.query;

  try {
    const data = await fs.readFile(url_database, 'utf-8');
    const database = JSON.parse(data);
    let livrosFiltrados = database.livros;

    if (titulo) {
      livrosFiltrados = livrosFiltrados.filter(livro => livro.titulo.toLowerCase().includes(titulo.toLowerCase()));
    }
    if (autor) {
      livrosFiltrados = livrosFiltrados.filter(livro => livro.autor.toLowerCase().includes(autor.toLowerCase()));
    }
    if (categoria) {
      livrosFiltrados = livrosFiltrados.filter(livro => livro.categoria.toLowerCase().includes(categoria.toLowerCase()));
    }
    if (ISBN) {
      livrosFiltrados = livrosFiltrados.filter(livro => livro.ISBN.includes(ISBN));
    }

    if (livrosFiltrados.length === 0) {
      return res.status(200).json({ mensagem: "Nenhum livro encontrado com os critérios fornecidos." });
    }

    res.status(200).json({ mensagem: "Livros encontrados", data: livrosFiltrados });

  } catch (error) {
    console.error(error); 
    res.status(500).json({ mensagem: "Erro interno do servidor ao buscar livros." });
  }
});

app.get("/biblioteca/multas/usuario/:id", (req, res) => {});


app.listen(PORT, () => {
    console.log("Servidor iniciado na porta: " + PORT)
})