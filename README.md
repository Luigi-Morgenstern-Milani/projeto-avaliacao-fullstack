📦 Projeto Avaliação Backend + Frontend

Este projeto consiste em uma aplicação Fullstack, desenvolvida para avaliação técnica, composta por backend, frontend e banco de dados, todos executados via Docker.

🚀 Tecnologias Utilizadas

Java 17

Spring Boot

Spring Security (JWT)

Spring Data JPA

MySQL (via Docker)

Docker

Docker Compose

HTML / CSS / JavaScript

🐳 Como executar o projeto com Docker
✅ Pré-requisitos

Docker

Docker Compose

Verificação:

docker --version
docker-compose --version

▶️ Executando a aplicação

Clone o repositório:

git clone https://github.com/seu-usuario/seu-repositorio.git


Acesse a pasta do projeto:

cd projeto-avaliacao-backend-frontend


Suba os containers:

docker-compose up --build


Aguarde até que todos os serviços estejam em execução.

🌐 Como acessar o Frontend

Após a inicialização dos containers, acesse no navegador:

Abra o projeto no Visual Studio Code

Acesse a pasta do frontend

Clique com o botão direito no arquivo cadastro_usuario.html

Selecione a opção “Open with Live Server”

O frontend é servido como páginas HTML e se comunica com o backend via API REST.

👤 Fluxo de acesso do sistema

O acesso inicial do sistema ocorre pela página de Cadastro de Usuário

O usuário deve realizar o cadastro informando nome, email e senha

Após o cadastro, o usuário pode realizar o login com as credenciais criadas

Com o login realizado, o sistema libera o acesso às funcionalidades protegidas

Depois você cadastra os clientes e ele salva na lista de clientes

Na lista de clientes você pode tanto deletar ele quanto editar


🔐 Credenciais de Login (Exemplo)

Caso já exista um usuário previamente cadastrado:

Email: admin@email.com
Senha: 123456


⚠️ Credenciais apenas para ambiente de teste.

🛠️ Backend

Porta padrão: 8081

API REST stateless

Autenticação baseada em JWT

Banco de dados inicializado automaticamente via Docker

🗄️ Banco de Dados

Banco criado automaticamente pelo container MySQL

Não é necessário criar tabelas manualmente

As entidades são geradas via JPA/Hibernate

🛑 Encerrando a aplicação

Para parar e remover os containers:

docker-compose down

✅ Considerações Finais

O projeto foi desenvolvido com foco em organização, clareza e boas práticas, utilizando Docker para padronizar o ambiente de execução e facilitar a avaliação técnica.

📌 Observações

O frontend deve estar aberto para permitir cadastro e login

Todas as requisições autenticadas exigem token JWT

Projeto preparado para execução local ou em ambiente Dockerizado
