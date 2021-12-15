const DB = require("../../common/inMemoryDb");

const getAll = async () => DB.getAllUsers();

const get = async id => {
 const user = DB.getUser(id);

 if(!user){
   throw new Error(`the user with ${id} was not found`)
 }
 return user;
}

const create = async user => DB.createUser(user);

const update = async (id, user) => DB.updateUser(id, user)

const remove = id => DB.deleteUser(id);

module.exports = { getAll, get, create, update, remove};
