import fs from "fs"; // ES6
import { v4 as uuid } from "uuid";

//const fs = require ('fs')       // lidar com operações de sistemas de arquivo
const DB_FILE_PATH = "./core/db";
console.log("[CRUD]");

interface Todo {
  id: string;
  date: string;
  content: string;
  done: boolean;
}

function create(content: string): Todo {
  
  //const fullUUID = uuid();
  // Pega apenas os primeiros 8 caracteres do UUID
  //const shortUUID = fullUUID.substring(0, 8);


  const todo: Todo = {
   // id: shortUUID, // Usa apenas os primeiros 8 caracteres do UUID

    id: uuid (), // a lib UUID cria um identificador unico universal
    date: new Date().toLocaleString(),
    content: content,
    done: false,
  };

  //array
  const todos: Array<Todo> = [
    // Todo[] ou Array<Todo> são a mesma coisa, o segundo se chama diamond operator
    ...read(), // vai ler tudo que já fez e colocar nesse array, caso não faça isso, o ultimo create vai sobrescrever os anteriores
    todo,
  ];

  // salvar o content(conteudo, nesse caso o array) no sistema | o stringify converte um objeto em string
  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify(
      {
        todos,
      },
      null,
      2
    )
  ); /*além de transformar obj em string, o stringify dá pra configurar o espaçamento
                                                          em que quer ver o array passado.*/

  return todo;
}

function read(): Array<Todo> {
  const dbstring = fs.readFileSync(DB_FILE_PATH, "utf-8");
  const db = JSON.parse( dbstring || "{}" ); /*JSON.parse(dbstring)carrega o arquivo coo string e converte para um banco de dados 
                                                                    que pode ter qualquer tipo de dado. OUTRA COISA, esse || "{}" vai                                                                   servir para que, caso o banco esteja vazio, não retorne erro,                                                                   e sim algo vazio de fato */
  if (!db.todos) {   //Fail fast validations ou early return
    return [];
  }

  return db.todos;
}

function update(id: string, partialTodo: Partial<Todo>): Todo {
  let updatedTodo;
  const todos = read();
  todos.forEach((currentTodo) => {
    const isToUpdate = currentTodo.id === id;
    if (isToUpdate) {
      updatedTodo = Object.assign(currentTodo, partialTodo);
    }
  });

  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify(
      {
        todos,
      },
      null,
      2
    )
  );

  if (!updatedTodo) {
    throw new Error("Please, provide another ID!");
  }
  return updatedTodo;
  console.log("TODOS ATUALIZADAS", todos);
}

function updateContentByID(id: string, content: string): Todo {
  return update(id, {
    content,
  });
}
function CLEAR_DB() {
  fs.writeFileSync(DB_FILE_PATH, ""); //antes de começar a simulação ele vai limpar o banco de dados
}

//simulação
CLEAR_DB();
create("first ToDo ");
create("segunda ToDo ");

const terceiraTodo = create("Second ToDo");
//update(terceiraTodo.id, {
// content: "Atualizada!",
//  done: true,
//});
updateContentByID(terceiraTodo.id, "Atualizada")
console.log(read());
