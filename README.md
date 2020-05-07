# crud-desafio

## Desafio criado utilizando node.js com typescript e banco de dados postgres

### A aplicação é um CRUD de postagens onde cada uma destas terá o nome do usuário,a imagem do seu avatar, imagem da publicação,data da sua publicação
e data que foi alterada

> Como utilizar a aplicação:

1. baixe o repositório, abra e no console aplique um `yarn` para baixar as dependencias em sua máquina,

2. Em seguida, abra o arquivo ormconfig.json e substitua as credenciais por as credenciais do seu banco de dados postgres,
embora o banco esteja com o nome crud-desafio, voce pode substituir e criar com o nome que desejar

3. após criar o banco em sua máquina e deixar as credenciais prontas, utilize o comando `yarn typeorm migration:run` em seu terminal
para criar as tabelas no banco de dados.

4. agora para iniciar a aplicação é só utilizar o comando `yarn dev:server` para a aplicação rodar na porta 3333 

# A aplicação possui 5 rotas: 

- *POST:* `/posts` passando o nome, foto de avatar(com field avatar) e foto da publicação(field publication) para criar post
- *GET:* `/posts/files` para mostrar todos os posts cadastrados no banco 
- *GET:* `/post/:id` para mostrar uma única publicação passando o id desta por routes params
- *DELETE:* `/posts/:id` para deletar uma publicação passando id desta por routes params
- *PUT:*`/posts/:id` para atualizar dados de uma publicação específica
