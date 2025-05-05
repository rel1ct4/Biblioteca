Modelo de dados
1. Usuário
  - Nome -> String
  - email -> String ou symbol
  - CPF -> Number
  - endereço -> String
  - Senha -> String

2. Livros
 - Marca -> String
 - Editora -> String
 - Referência -> number
 - Título -> String
 - Autor -> String
 - Formato -> String
 - Edição -> String
 - Categoria -> String
 - Idioma -> String
 - Número de páginas -> number
 - ISBN -> number
 - Classificação indicativa -> number
 - Quantidade de livros na biblioteca -> number
 - emprestimos totais do livro -> number
 - emprestimos mensais -> number

 ROTAS PARA A APLICAÇÃO

 1. POST biblioteca/usuarios/cadastro
 -- cadastro dos usuários da biblioteca

 2. POST biblioteca/livros/cadastro
 --cadastro dos livros da biblioteca

 3. GET biblioteca/livros/listados
 --lista de todos os livros cadastrados

 4. GET biblioteca/usuarios/listados
 --lista de todos os usuarios cadastrados

 5. DELETE biblioteca/usuarios/:id
 --deletar usuários

 6. DELETE biblioteca/livros/:id
 --deletar livros

 7. PUT biblioteca/usuarios/:id
 --atualização de usuario


 8. PUT biblioteca/livros/:id
 --atualização de livros


