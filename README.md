# SKY - API

O objetivo da criação desta API é possibilitar o cadastro, login e pesquisa de um usuário.<br>

A linguagem de desenvolvimento utilizada é o Node.js com Express e o banco de dados MongoDB.<br>

É possível utilizar a API pelo Postman: https://www.postman.com/downloads/<br>
Inserindo o link do Heroku: https://sky-api-avanade.herokuapp.com/ <br>

## ROTAS

### Sign up - cria um cadastro de usuário <br>
https://sky-api-avanade.herokuapp.com/user/signin<br>

Para criar um usuário, devemos enviar um JSON com a seguinte estutura:<br>

```
{
	"nome": "Amanda",
	"email": "amanda@sky.com",
	"senha": "*****",
	"telefone": "55555555"
}
```

### Sign in - loga um usuário no sistema<br>
https://sky-api-avanade.herokuapp.com/user/signup<br>

Para logar, a estrutura do JSON é:


```
{
	"email": "amanda@sky.com",
	"senha": "******"
}
```


### Buscar usuário:<br>
https://sky-api-avanade.herokuapp.com/user/:id<br>

Na etapa de Sign up, será gerado um id único de usuário que deverá ser passado nessa rota.<br>
Na etapa de Sign in, será gerado um TOKEN, requerido em Authentication - Bearer Token para autorizar o acesso aos dados do usuário.

