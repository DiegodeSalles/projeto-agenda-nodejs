# projeto-agenda-nodejs
Agenda simples utilizando Node.js/Express/EJS e MongoDB

## Preparando o projeto
Primeiro instale os arquivos de dependência do projeto:
```bash
npm i
# ou
npm install
```

Depois de instalar as dependências, é necessário configurar o arquivo .env:

```bash
# Adicione a seguinte linha ao arquivo .env:

CONNECTIONSTRING=mongodb+srv://endereço-do-seu-mongodb/agenda

```

## Rodando o projeto

Agora com tudo configurado, execute:

```bash
npm run start
```

Importante ressaltar que o servidor foi configurado para a porta 3000, caso haja necessidade de utilizar outra porta, é preciso alterar a porta de configuração no arquivo 'server.js' na raíz do projeto:

```js
app.on('pronto', () => {
  // Mude o parâmetro de 3000 para a porta que desejar e claro, mude as do console também.
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  });
});
```