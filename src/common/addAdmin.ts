import { getRepository } from 'typeorm';
import UserEntity from '../entities/user-entity';
import DB from './inMemoryDb';
import User from '../resources/users/user.model';


interface Params {
    id?: string;
    name: string;
    login: string;
    password: string;
  }
const admin ={
    "name" : "admin",
    "login": "admin",
    "password": "admin"
}

const getAdmin =async (loginNane:string) => {
    const repo = getRepository(UserEntity);
    const resultUser: Params | undefined = await repo.findOne({login:loginNane});
    return resultUser
}

const addAdmin = async () =>{
   
const isAdmin = await getAdmin(admin.login)
console.log(isAdmin);

if(!isAdmin) DB.createUser(new User(admin));
return true
} 

export = { addAdmin };