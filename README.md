<h1>TP01 - Engenharia de Software <br>
Sistema de Recomendação de filme </h1>

## 📋Objetivos

O objetivo do trabalho é o desenvolvimento de um software simples que possua 4 funcionalidades implementadas.
O processo de desenvolvimento do sistema deve ser feito simulando um sprint do método ágil **Scrum**.

## 🛠️Features Principais

1. **Login** <br>
A feature consiste no processo de autenticação do usuário para acesso do sistema. Irá possuir duas caixas de entrada, email e senha.

2. **Cadastro** <br>
Essa função fará com que o usuário possa criar uma conta de acesso ao sistema, suas informações serão salvas no banco de dados para que assim ele possa realizar o login.

3. **Recomendação de filmes** <br>
Utilizando uma caixa de input, o usuário irá escrever o nome do filme no qual ele quer receber recomendações e o sistema retornará diversos filmes com enredo semelhante àquele escrito.

4. **Histórico de Filmes Recomendados** <br>
Página que mostra um histórico de filmes pesquisados e recomendados ao usuário.

## ✒️ Membros da Equipe

- Arthur Ryan Carvalho Figueiredo - 2020027326 - Full Stack Dev
- Caio Teraoka de Menezes Câmara - 2020027407 - Full Stack Dev
- Cássio Henrique Izidorio Rosa - 2020070361- Full Stack Dev
- Gabriel Junqueira de Souza - 2020027571 - Full Stack Dev

  
## 🚀Tecnologias utilizadas

- Node-JS - Software para desenvolvimento do BackEnd
- React - Biblioteca para desenvolvimento do FrontEnd
- API da OpenAI - Interface de programação para sistema de recomendação
- Github - Hospedagem de código e Sistema de versionamento

## Backlog do Produto

1. Como usuário eu gostaria de me registrar no sistema
2. Como usuário eu gostaria de logar no sistema
3. Como usuário eu gostaria de saber onde assistir aos filmes
4. Como usuário eu gostaria de visualizar os filmes mais assistidos do momento
5. Como usuário eu gostaria de receber recomendações de filmes
6. Como usuário eu gostaria de alterar meus dados cadastrais
7. Como usuário eu gostaria de pesquisar por um filme específico
8. Como usuário eu gostaria de adicionar filmes como favoritos
9. Como usuário eu gostaria de ter uma lista de filmes que desejo assistir
10. Como usuário eu gostaria de ter uma lista de filmes recomendados

## Backlog do Sprint

**História #1 - Como usuário eu gostaria de me registrar no sistema**

Tarefas e responsáveis
- Instalar node.js [Caio]
- Instalar o React.js [Caio]
- Criar o front end da página de registre-se [Caio]
- Criar o back end da paǵina de registre-se [Cássio]
- Criar o banco de dados para armazenar as informações dos usuários [Cássio]
- Integrar o front com o back e o banco de dados [Cássio]

**História #2 - Como usuário eu gostaria de logar no sistema**

Tarefas e responsáveis
- Criar o front end da página de login [Caio]
- Criar o back end da paǵina de login [Cássio]
- Integrar o front com o back e o banco de dados [Cássio]

**História #3 - Como usuário eu gostaria de receber recomendações de filmes**

*Tarefas e responsáveis*
- Implementação da API do OpenAI [Gabriel]
- Integração da API com o front end da página [Gabriel]
- Criar a seção da página para exibir os filmes indicados [Arthur e Caio]

**História #4 - Como usuário eu gostaria de ter uma lista dos filmes que me foram recomendados**

*Tarefas e responsáveis*
- Criar o front end da página da lista [Arthur e Gabriel]
- Integração da resposta obtida a partir da API com o front end da página [Gabriel]
- Armazenamento do histórico de recomendações realizadas por meio do Browser [Cássio]
