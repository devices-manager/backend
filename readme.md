![CircleCI](https://circleci.com/gh/costasandre/desafio-dev-api-rest-andre.svg?style=shield&circle-token=651ab2a80d7356dcbf8ea1a1916e88a84e639d65)
[![codecov](https://codecov.io/gh/costasandre/desafio-dev-api-rest-andre/branch/master/graph/badge.svg?token=1F280U9QY2)](https://codecov.io/gh/costasandre/desafio-dev-api-rest-andre)

As instruções a seguir são recomendadas para serem executadas em um ambiente basedo em linux, além disso, deve-se ter o docker instalado. Mais detalhes de como instalar o docker acesse o link: https://docs.docker.com/engine/install/ubuntu/.

## Executar o aplicativo via docker

Abra o terminal e execute:

`$ docker build -t bank .`

Após a execução do comando você deve ser capaz de executar a aplicação, ainda no terminal execute o seguinte comando.

`$ docker run -d --name bank-api -p 3000:3000 bank`

P.S.: Após a execução do comando anterior, a aplicação está pronta para uso.

Caso queira parar a execução a imagem docker, execute o comando a seguir.

`$ docker stop bank-api`

### Executar os testes unitários

Os testes também podem ser executados em um ambiente docker, em um terminal execute o comando a seguir:

`$ docker run -it bank bash`

Após a execução do comando anterior, você estará no ambiente da imagem gerada através do docker. Execute o seguinte comando:

`$ npm run test`

### Executar o linter

O linter também pode ser executado em um ambiente docker. Se você ainda está no ambiete da imagem gerada através do docker, ignore o comando a seguir. Em um terminal execute o comando a seguir:

`$ docker run -it bank bash`

Após a execução do comando anterior, você estará no ambiente da imagem gerada através do docker. Execute o seguinte comando:

`$ npm run lint`

### Acessando a documentação

Para ter acesso a documentação da API você deve primeiramente executar o aplicativo via docker, as instruções encontram-se no começo deste documento. Após executar o aplicativo acesse o link a seguir no seu navegador:

`$ http://localhost:3000/api/docs`

Após esses procedimentos a documentação estará disponível para ter instruções de como usar a API.

### Usuário padrão

Apesar de a API fornecer um path para criação de um cliente, já existe um cliente cadastrado com os seguintes dados  

`$ {
  name: "Andre de Souza Costa",
  cpf: "012.600.762-45",
  dateOfBirth: 1993-06-20T00:00:00.000+00:00 
}`
