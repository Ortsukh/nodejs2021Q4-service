import DB from '../../common/inMemoryDb';

const login = (loginStr:string, password:string) => DB.login(loginStr,password);
export default {login}