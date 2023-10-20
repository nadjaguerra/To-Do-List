import fs from "fs"; // ES6

//const fs = require ('fs')       // lidar com operações de sistemas de arquivo
const DB_FILE_PATH = "./core/db"
console.log("[CRUD]")

function create(content: string){
    // salvar o content no sistema
    fs.writeFileSync(DB_FILE_PATH, content)                        //escrever dados em um arquivo de forma síncrona
    return content
}

//simulação
console.log(create("Hello, Hello!!! "))