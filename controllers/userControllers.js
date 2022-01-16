const express = require("express");
const { parserClients, updateDataBase  } = require("../utils/utils");
const app = express();
// you dont need here const app = express()

const path = "./json/data.json";
// this is ok but find me later and I will show you a better way to do this

const usersData = parserClients(path);

// parserUsers

const getAllUsers = (req, res) => {
  try {
  res.send(parserClients(path));
  }catch(error){
    res.status(500).send("Error:", error.message)
  }
};

const getUser = (req, res) => {
  if (ifExistUser(req.body.id)) {
  //"function name": ifExistUser sould be "function name": isUserExist
    // this function sould return true or false
    // dont return a function inside a res.send()
    // use res.status(statusNumber).send(something that you want to send)
    // use try and catch(error) and send it or not this is a good because in the end you will send errors to your server
    
    res.send(ifExistUser(req.body.id));
  } else {
    res.send('It is no user with id: ' + req.body.id);
  }
};

const addUser = (req, res) => {
  const data = { "id":req.body.id, "cash":0, "credit":0 };
  // you dont need to use JSON as the data this is not good practis some extantions maybe will remove this quotes
  
  if (ifExistUser(req.body.id)) {
      
    //"function name": ifExistUser sould be "function name": isUserExist
    
    res.send("The user id: " + req.body.id + " don't exist in database.")
     //you can make is look better and you know that (:
    
  } else {
    usersData.users.push(data);
    // usersData can be called users you dont need the data everything is a data in the end
    
    updateDataBase(usersData, path); 
    // not a good name becuase you update usersCollection not all the DB
    
    res.send(usersData);
  }
};

const deleteUser = (req, res) => {
  if (!ifExistUser(req.body.id)) {
    //"function name": ifExistUser sould be "function name": isUserExist
    
    res.send("User " + req.body.id + " is not exist");
     //you can make is look better and you know that (:
    
  } else {
    use {id} = req.body
    // use id in this way 
    // make code cleaner
    //console.log(el.id);
    const result = usersData.users.filter((el) => el.id !== req.body.id);
    // use can do it in one line
    const resObj = {"users": result}
    
    // you dont need to use JSON as the data this is not good practis some extantions maybe will remove this quotes this is a .js file
    
    updateDataBase(resObj, path);
    res.send(result);
  }
};

const editing = (req, res) => {
  const { id, cash, credit } = req.body;
  if (ifExistUser(id)) {
    // const data = updateDataUser(id, cash, credit);
    // updateClient(data, path);
    const result = usersData.users.filter((el) => { 
      if(el.id === id) {
        el.cash = cash;
        el.credit = credit;
        return el;
      }
      return el;
    });
    updateDataBase({"users": result}, path)
    res.send(result);
  } else {
    res.send("The user don't exist!");
  }
};

const depositing = (req, res) => {
  const {id, sum} = req.body;
  if(ifExistUser(id)) {
    const userUpdated = usersData.users.filter((el) => { 
      if(el.id === id) {
        el.cash = el.cash + sum;
        return el;
      }
      return el;
    });
    updateDataBase({"users": userUpdated}, path)
    res.send(userUpdated);
  } else {
    res.send("Can not find user id: " + id);
  }
}

const updateCredit = (req, res) => {
  const {id, cred} = req.body;
  if(ifExistUser(id)) {
    const userUpd = usersData.users.filter((el) => { 
      // userUpd is not a good name
      
      if ((el.cash <= 0) && (el.id === id)) res.send("Can not update negative balanse.");
      
      if(el.id === id)  el.credit=cred;
      
      return el;
    });
    updateDataBase({"users": userUpd}, path)
    // not a good name becuase you update usersCollection not all the DB
    
    res.send(userUpd);
  } else {
    res.send("Can not find user id: " + id);
  }
}

const withdraw = (req, res) => {
  const {id, summ} = req.body;
  // good do it always like that we know that you know what you need to get back from the call in the body
  
  if(ifExistUser(id)) {
    const userUpdated = usersData.users.filter((el) => { 
      // this is a good name not like the one in the previos function (withdraw)
      
      if ((el.cash + el.credit <= summ) && (el.id === id)) res.send("Not enouth cash+credit")
      
      if(el.id === id) el.cash = el.cash - summ;
      
      return el;
    });
    updateDataBase({"users": userUpdated}, path)
    // not a good name becuase you update usersCollection not all the DB
    
    res.send(userUpdated);
  } else {
    res.send("Can not find user id: " + id);
    // use status too (:
  }
}

const transferring = (req, res) => {
  const {idFrom, idTo, sum} = req.body;
  // not a good nameing please try to make it more clear someone new to this code will not understand  
 
  if(ifExistUser(idFrom) && (ifExistUser(idTo))) {
    const afterTransfer = usersData.users.filter((el) => { 
      // if you are inside the transferFunction this function cant be called afterTransfer
      
      if ((el.cash + el.credit <= sum) && (el.id === idFrom)) res.send("Not enouth money to send");
      
      if ((el.cash + el.credit > sum) && (el.id === idFrom)) el.cash = el.cash - sum;
      
      if (el.id === idTo) el.cash = el.cash + sum;
      
      return el;
      })
    updateDataBase({"users": afterTransfer}, path)
    //see above this isnt a good name
    
    res.send(afterTransfer);
  } else {
    res.send("Can not find one of users.");
  }
}

const sortByCash = (req, res) => {
  const resultArray = Array.from(usersData.users);
  resultArray.sort((a, b) => (a.cash > b.cash) ? -1 : 1);
  // dont search of a sort function i like the way you think good function 
  // but this result is sorted by ? call it with the right name
  res.send(resultArray);
}
const sortDebtors = (req, res) => {
  const resArray = Array.from(usersData.users)
    .filter((el) => {if(el.cash < 0) return el})
    .sort((a, b) => (a.cash > b.cash) ? 1 : -1);
  // nice chaining
  
  res.send(resArray);
}
//list.sort((a, b) => (a.color > b.color) ? 1 : -1)

const ifExistUser = (id) => {
  const currentUser = usersData.users.find((client) => { return client.id === id});
  return currentUser // return object 
  
  // move this function to utils
}

module.exports = { getAllUsers, getUser, addUser, deleteUser, editing, depositing, updateCredit, withdraw, transferring, sortByCash, sortDebtors};

  //"function name": ifExistUser sould be "function name": isUserExist

    // this function sould return true or false

    // dont return a function inside a res.send()

    // use res.status(statusNumber).send(something that you    

// res.status(500).send("Error:", error.message)want to send)

// this is ok but find me later and I will show you a better way to do this

// you dont need here const app = express()

// use try and catch(error) and send it or not this is a good because in the end you will send errors to your server

// you dont need to use JSON as the data this is not good practis some extantions maybe will remove this quotes

    // usersData can be called users you dont need the data everything is a data in the end

 //you can make is look better and you know that (:

    // you dont need to use JSON as the data this is not good practis some extantions maybe will remove this quotes this is a .js file
