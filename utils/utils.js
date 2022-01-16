const fs = require("fs");

const parserClients = (path) => JSON.parse(fs.readFileSync(path, "utf-8"));
// should be called parserUsers
// use in one line to return this value


const updateDataBase = (usersData, path) => {
  fs.writeFileSync(path, JSON.stringify(usersData));
}
// this function isnt return anything that why i dont tell you to make is one line that is clearer


module.exports = {parserClients, updateDataBase}

//module.exports = {parserClients, addClient, deleteClient};


// use need to add here alot more function because most of the easy functionaly is inside the controllers you can do it better


