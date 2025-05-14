Modelo de dados
1. Usuário
  - idUsuario -> number
  - Nome -> String
  - email -> String 
  - CPF -> Number
  - endereço -> String
  - Senha -> String

2. Livros
 - idLivro -> number
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

 3. Empréstimo
  - idUsuario ou cpf -> number
  - idLivro -> number

 4. Reserva
  - idUsuario ou cpf -> number
  - idLivro -> number

 5. Multa
  - idUsuario ou cpf -> number
  - data -> number
  - valor -> number
  - motivo -> string

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

 10. POST biblioteca/emprestimos
 -- Realiza o empréstimo de um livro para um usuário. Espera no corpo da requisição o ID do usuário e a referência (ou ISBN) do livro.

 11. GET biblioteca/emprestimos/:id
 -- Retorna as informações de um empréstimo específico, buscando pelo ID do empréstimo.

 12. GET biblioteca/emprestimos/usuario/:usuarioId
 -- Lista todos os empréstimos ativos de um determinado usuário.

 13. PUT biblioteca/emprestimos/:id/devolucao
 -- Registra a devolução de um livro emprestado, atualizando o status do empréstimo e a disponibilidade do livro. Espera no corpo da requisição a data de devolução (opcional).

 14. GET biblioteca/emprestimos/pendentes
 -- Lista todos os empréstimos que estão com prazo de devolução vencido.

15. POST biblioteca/reservas
 -- Permite que um usuário reserve um livro que não está disponível. Espera no corpo da requisição o ID do usuário e a referência (ou ISBN) do livro.
    
17. GET biblioteca/reservas/:id
 -- Retorna as informações de uma reserva específica, buscando pelo ID da reserva.

18. GET biblioteca/reservas/usuario/:usuarioId
 -- Lista todas as reservas ativas de um determinado usuário.
    
19. DELETE biblioteca/reservas/:id
-- Cancela uma reserva existente.

20. GET biblioteca/reservas/disponiveis/:livroReferencia
 -- Lista as reservas para um livro específico que agora está disponível.

21. GET biblioteca/livros/busca?titulo={valor}&autor={valor}&categoria={valor}&...
-- Permite buscar livros utilizando diferentes filtros (título, autor, categoria, etc.) através de query parameters.

22. GET biblioteca/livros/:referencia
 -- Retorna os detalhes de um livro específico, buscando pela sua referência.

23. POST biblioteca/multas/registrar/:emprestimoId
 -- Registra uma multa para um empréstimo com devolução atrasada.
    
24. GET biblioteca/multas/:id
 -- Retorna os detalhes de uma multa específica.
    
25. GET biblioteca/multas/usuario/:usuarioId
-- Lista todas as multas de um determinado usuário.

26. PUT biblioteca/multas/:id/pagar
-- Marca uma multa como paga.

