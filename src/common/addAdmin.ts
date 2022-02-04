import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import UserEntity from '../entities/user-entity';
import DB from './inMemoryDb';
import User from '../resources/users/user.model';


interface Params {
    id?: string;
    name: string;
    login: string;
    password: string;
  }
const passwordProps = 'admin'
const getHashPass =async (password:string) => {
    const pass = await bcrypt.hash(password, 3);
    return pass
}
 
const admin ={
    "name" : "admin",
    "login": "admin",
    "password": ''
}

const getAdmin =async (loginNane:string) => {
    const repo = getRepository(UserEntity);
    const resultUser: Params | undefined = await repo.findOne({login:loginNane});
  
    
    return resultUser
}

const addAdmin = async () =>{
   
const isAdmin = await getAdmin(admin.login)
admin.password =await getHashPass(passwordProps)
if(!isAdmin) DB.createUser(new User(admin));
return true
} 

export = { addAdmin };