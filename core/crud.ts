import fs from "fs"; // ES6

//const fs = require ('fs')       // lidar com operações de sistemas de arquivo
const DB_FILE_PATH = "./core/db"
console.log("[CRUD]");

function create(content: string){
    //objeto
    const todo = {
        
        content: content,
        };
        console.log(todo);
    
    // salvar o content no sistema | o stringify converte um objeto em string
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(todo));                       //escrever dados em um arquivo de forma síncrona
    return content;
}
function read(){
    const db = fs.readFileSync(DB_FILE_PATH, "utf-8");
    return db;
}
//simulação
create("first ToDo ");
console.log(read());