import loginRepo from './login.rep';


  const login = (loginStr:string, password:string) => loginRepo.login(loginStr,password);

  export default {login}

