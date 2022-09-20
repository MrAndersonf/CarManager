# CarManager

# Rodar o Projeto

=> yarn install
=> yarn dev

ou

=> npm install
=> npm dev

# Funcionalidades

=> Consultar a API http://api-test.bhut.com.br:3000/api/cars
=> Popular tabela com o resultado da consulta
=> A tabela implementa mecanismos de ordenação, de acordo com a coluna.
=> Inserção de novo registro
=> Edição de registro
=> Apagar registro

# Filtro de Pesquisa

Implementei um filtro para refinar as pesquisar de veículos, sendo possível a
consulta por modelo (title), marca (brand), o intervalor Ano - Início/ Ano - Fim (age)
e o intervalor preço - Início/ preço - Fim (price);

# Autenticação

Implementei um sistema de autênticação usando Firebase, onde é possível criar um usuário
(email e senha), bem como resetar senha e login seguro.

# tecnologias

Tyscript, Nextjs, Firebase

# React Native

Iniciei o teste com um projeto React Native, más devido a atualização do lib para a versão 0.70, o
que fez com que o a biblioteca React-Native-Reanimated quebrasse. Eu estava usando a mesma para
as animações que do app. O projeto pode ser encontrado aqui https://github.com/MrAndersonf/CarManager-RN
. Está funcional, porém não está finalizado.

# PS

Vi que alguns dados da API não estavam normalizados, o que pode causar comportamento inesperado,
especificamente na manipulação dos preços.
